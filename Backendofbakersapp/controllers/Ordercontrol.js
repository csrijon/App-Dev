import prisma from "../config/prisma.js";

// Create order (checkout from customer app)
const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            customerPhone,
            customerAddress,
            totalAmount,
            paymentMethod,
            paymentStatus,
            orderStatus,
            items,
        } = req.body;

        const newOrder = await prisma.order.create({
            data: {
                customerName,
                customerPhone,
                customerAddress,
                totalAmount: totalAmount ? parseFloat(totalAmount) : 0,
                paymentMethod,
                paymentStatus: paymentStatus || "pending",
                orderStatus: orderStatus || "pending",
                orderNumber: `BK-${Math.floor(Math.random() * 9000) + 1000}`,
                orderDate: new Date(),
                orderItems: {
                    create: Array.isArray(items) ? items.map((item) => ({
                        productId: parseInt(item.productId || item.id),
                        quantity: item.quantity || 1,
                        price: item.price ? parseFloat(item.price) : 0,
                    })) : [],
                },
                payments: {
                    create: {
                        amount: totalAmount ? parseFloat(totalAmount) : 0,
                        paymentMethod: paymentMethod || "cash",
                        paymentStatus: paymentStatus || "pending",
                        paidAt: new Date(),
                    },
                },
            },
            include: { orderItems: true, payments: true },
        });
        res.status(201).json({ success: true, message: "Order created", data: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

// Get all orders (admin order management)
const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: { orderItems: true, payments: true, deliveryTracking: true },
            orderBy: { orderDate: "desc" },
        });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

// Get orders by user/customer (customer my orders)
const getOrdersByCustomer = async (req, res) => {
    try {
        const { phone } = req.query;
        const whereClause = phone ? { customerPhone: phone } : {};
        const orders = await prisma.order.findMany({
            where: whereClause,
            include: { orderItems: true },
            orderBy: { orderDate: "desc" },
        });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

// Get single order by id
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { orderId: parseInt(id) },
            include: { orderItems: true, payments: true, deliveryTracking: true },
        });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch order" });
    }
};

// Update order status (admin management)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus, tag } = req.body;
        const updated = await prisma.order.update({
            where: { orderId: parseInt(id) },
            data: { orderStatus, updatedAt: new Date() },
        });
        res.status(200).json({ success: true, message: "Order status updated", data: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update order" });
    }
};

// Update order delivery tracking
const updateDeliveryTracking = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, latitude, longitude, deliveryBoyId } = req.body;
        await prisma.deliveryTracking.upsert({
            where: { orderId: parseInt(orderId) },
            update: { status, latitude: latitude ? parseFloat(latitude) : null, longitude: longitude ? parseFloat(longitude) : null, deliveryBoyId: deliveryBoyId ? parseInt(deliveryBoyId) : null, updatedAt: new Date() },
            create: { orderId: parseInt(orderId), deliveryBoyId: deliveryBoyId ? parseInt(deliveryBoyId) : 1, status, latitude: latitude ? parseFloat(latitude) : null, longitude: longitude ? parseFloat(longitude) : null },
        });
        res.status(200).json({ success: true, message: "Tracking updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update tracking" });
    }
};

// Get delivery tracking for order (customer tracking)
const getDeliveryTracking = async (req, res) => {
    try {
        const { orderId } = req.params;
        const tracking = await prisma.deliveryTracking.findFirst({
            where: { orderId: parseInt(orderId) },
        });
        res.status(200).json({ success: true, data: tracking });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to get tracking" });
    }
};

export {
    createOrder,
    getAllOrders,
    getOrdersByCustomer,
    getOrderById,
    updateOrderStatus,
    updateDeliveryTracking,
    getDeliveryTracking,
};
