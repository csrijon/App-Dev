import prisma from "../config/prisma.js";

// Customer creates refund request (only if delivered and within 7 days)
const createRefundRequest = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        const { orderId, reason } = req.body;
        if (!userId || !orderId) return res.status(400).json({ success: false, message: "Missing required fields" });

        const order = await prisma.order.findUnique({ where: { orderId: parseInt(orderId) } });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (order.userId !== parseInt(userId)) return res.status(403).json({ success: false, message: "Not authorized" });
        if (order.orderStatus !== "delivered") return res.status(400).json({ success: false, message: "Refund only allowed for delivered orders" });

        // 7-day check based on completedAt (delivery/completion timestamp)
        const completedTime = order.completedAt ? new Date(order.completedAt) : (order.updatedAt ? new Date(order.updatedAt) : (order.orderDate ? new Date(order.orderDate) : new Date()));
        const now = new Date();
        const diffMs = now - completedTime;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        if (diffDays > 7) return res.status(400).json({ success: false, message: "Refund window expired (7 days from delivery)" });

        // Check if refund already exists
        const existing = await prisma.refund.findFirst({ where: { orderId: parseInt(orderId) } });
        if (existing && existing.status === "pending") return res.status(400).json({ success: false, message: "Refund request already pending" });
        if (existing && existing.status === "approved") return res.status(400).json({ success: false, message: "Refund already approved" });

        const refund = await prisma.refund.create({
            data: {
                orderId: parseInt(orderId),
                userId: parseInt(userId),
                reason: reason || "Customer request",
                status: "pending",
            },
        });
        // Notify customer that refund request was submitted
        if (order && order.userId) {
            await prisma.notifications.create({
                data: {
                    userId: parseInt(order.userId),
                    title: "Refund Requested",
                    message: `Your refund request for order #${order.orderNumber || orderId} has been submitted.`,
                },
            });
        }
        res.status(201).json({ success: true, message: "Refund requested", data: refund });
    } catch (e) {
        console.log("Refund error:", e);
        res.status(500).json({ success: false, message: "Failed to create refund" });
    }
};

// Admin approves or rejects refund (only for their bakery/store orders)
const updateRefundStatus = async (req, res) => {
    try {
        const adminEmail = req.user ? req.user.email : null;
        const { id } = req.params;
        const { status, adminReason } = req.body;
        if (!status || (status !== "approved" && status !== "rejected")) {
            return res.status(400).json({ success: false, message: "Status must be approved or rejected" });
        }
        // Verify refund belongs to an order in admin's store
        const refundRecord = await prisma.refund.findUnique({ where: { id: parseInt(id) }, include: { order: true } });
        if (!refundRecord) return res.status(404).json({ success: false, message: "Refund not found" });
        if (adminEmail) {
            const storeProfile = await prisma.storeProfile.findFirst({ where: { email: adminEmail } });
            if (storeProfile && refundRecord.order && refundRecord.order.storeProfileId !== storeProfile.id) {
                return res.status(403).json({ success: false, message: "Not authorized: refund belongs to another bakery" });
            }
        }
        if (status === "rejected" && (!adminReason || String(adminReason || "").trim().length === 0)) {
            return res.status(400).json({ success: false, message: "Rejection reason is required" });
        }
        const refund = await prisma.refund.update({
            where: { id: parseInt(id) },
            data: {
                status,
                adminReason: adminReason || (status === "rejected" ? "No reason provided" : null),
            },
        });
        // Notify customer of refund result
        if (refundRecord && refundRecord.order && refundRecord.order.userId) {
            await prisma.notifications.create({
                data: {
                    userId: parseInt(refundRecord.order.userId),
                    title: status === "approved" ? "Refund Approved" : "Refund Rejected",
                    message: status === "approved"
                        ? `Your refund for order #${refundRecord.order.orderNumber || id} has been approved.`
                        : `Your refund for order #${refundRecord.order.orderNumber || id} was rejected. Reason: ${adminReason || "No reason provided"}`,
                },
            });
        }
        res.status(200).json({ success: true, message: `Refund ${status}`, data: refund });
    } catch (e) {
        console.log("Update refund error:", e);
        res.status(500).json({ success: false, message: "Failed to update refund" });
    }
};

// Get refunds (admin can list; customer can list their own)
const getRefunds = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        const userRole = req.user ? req.user.role : null;
        const adminEmail = req.user ? req.user.email : null;
        let whereClause = {};
        if (userRole === "admin" && adminEmail) {
            // Filter refunds for orders linked to this admin's store
            const storeProfile = await prisma.storeProfile.findFirst({ where: { email: adminEmail } });
            if (storeProfile) {
                // Get orders for this store
                const storeOrders = await prisma.order.findMany({
                    where: { storeProfileId: storeProfile.id },
                    select: { orderId: true },
                });
                const orderIds = storeOrders.map(o => o.orderId);
                whereClause = { orderId: { in: orderIds } };
            } else {
                whereClause = { id: -1 };
            }
        } else if (userRole !== "admin" && userId) {
            whereClause = { userId: parseInt(userId) };
        }
        const refunds = await prisma.refund.findMany({
            where: whereClause,
            include: { order: true, user: { select: { id: true, Name: true, Email: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: refunds });
    } catch (e) {
        console.log("Get refunds error:", e);
        res.status(500).json({ success: false, message: "Failed to fetch refunds" });
    }
};

export { createRefundRequest, updateRefundStatus, getRefunds };
