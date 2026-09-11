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

        // 7-day check
        const orderDate = new Date(order.orderDate || order.updatedAt || new Date());
        const now = new Date();
        const diffMs = now - orderDate;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        if (diffDays > 7) return res.status(400).json({ success: false, message: "Refund window expired (7 days)" });

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
        res.status(201).json({ success: true, message: "Refund requested", data: refund });
    } catch (e) {
        console.log("Refund error:", e);
        res.status(500).json({ success: false, message: "Failed to create refund" });
    }
};

// Admin approves or rejects refund
const updateRefundStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminReason } = req.body; // status: approved / rejected
        if (!status || (status !== "approved" && status !== "rejected")) {
            return res.status(400).json({ success: false, message: "Status must be approved or rejected" });
        }
        const refund = await prisma.refund.update({
            where: { id: parseInt(id) },
            data: {
                status,
                adminReason: adminReason || (status === "rejected" ? "No reason provided" : null),
            },
        });
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
        let whereClause = {};
        if (userRole !== "admin" && userId) {
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
