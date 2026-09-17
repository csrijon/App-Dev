import prisma from "../config/prisma.js";

const createCustomOrder = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const { cakeType, flavor, size, message, preferredDeliveryDate, description, referenceImageUrl } = req.body;
        if (!cakeType && !flavor && !size) {
            return res.status(400).json({ success: false, message: "At least one of cakeType, flavor, or size is required" });
        }
        const customOrder = await prisma.customOrder.create({
            data: {
                userId: parseInt(userId),
                cakeType: cakeType || null,
                flavor: flavor || null,
                size: size || null,
                message: message || null,
                preferredDeliveryDate: preferredDeliveryDate ? new Date(preferredDeliveryDate) : null,
                description: description || null,
                referenceImageUrl: referenceImageUrl || null,
                status: "pending",
            },
        });
        res.status(201).json({ success: true, message: "Custom order created", data: customOrder });
    } catch (error) {
        console.log("Custom order creation error:", error);
        res.status(500).json({ success: false, message: "Failed to create custom order", error: error.message });
    }
};

const getCustomOrdersByCustomer = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const orders = await prisma.customOrder.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log("Fetch custom orders error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch custom orders" });
    }
};

const getAllCustomOrders = async (req, res) => {
    try {
        const orders = await prisma.customOrder.findMany({
            include: { user: { select: { id: true, Name: true, Email: true, Mobile: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log("Fetch all custom orders error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch custom orders" });
    }
};

const updateCustomOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowed = ["pending", "accepted", "preparing", "ready", "delivered", "cancelled", "rejected"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }
        const updated = await prisma.customOrder.update({
            where: { id: parseInt(id) },
            data: { status },
        });
        res.status(200).json({ success: true, message: "Custom order status updated", data: updated });
    } catch (error) {
        console.log("Update custom order error:", error);
        res.status(500).json({ success: false, message: "Failed to update custom order" });
    }
};

export { createCustomOrder, getCustomOrdersByCustomer, getAllCustomOrders, updateCustomOrderStatus };
