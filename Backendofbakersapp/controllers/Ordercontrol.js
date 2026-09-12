import prisma from "../config/prisma.js";

// Create order (checkout from customer app)
const createOrder = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });

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

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "No items in order" });
        }

        // Load user's cart to ensure items exist and validate stock
        const cartItems = await prisma.cart.findMany({
            where: { userId: parseInt(userId) },
            include: { product: true },
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // Verify submitted items correspond to the user's current cart
        const submittedIds = new Set(items.map(i => parseInt(i.productId || i.id)).filter(id => !isNaN(id)));
        const cartProductIds = new Set(cartItems.map(c => c.productId));
        for (const sid of submittedIds) {
            if (!cartProductIds.has(sid)) {
                return res.status(400).json({ success: false, message: `Item ${sid} does not match your current cart` });
            }
        }

        // Map order items and validate products/stock
        const orderItemsData = [];
        const productIds = [];
        for (const item of items) {
            const pid = parseInt(item.productId || item.id);
            if (isNaN(pid)) continue;
            productIds.push(pid);
            const qty = parseInt(item.quantity) || 1;
            if (qty <= 0) return res.status(400).json({ success: false, message: "Invalid quantity" });
            orderItemsData.push({ pid, qty, price: item.price ? parseFloat(item.price) : 0 });
        }

        const products = await prisma.product.findMany({
            where: { productId: { in: productIds } },
        });
        const productMap = {};
        products.forEach(p => { productMap[p.productId] = p; });

        let serverTotal = 0;
        for (const di of orderItemsData) {
            const prod = productMap[di.pid];
            if (!prod) return res.status(400).json({ success: false, message: `Product ${di.pid} not found` });
            if (prod.stockQty !== null && prod.stockQty < di.qty) {
                return res.status(400).json({ success: false, message: `Insufficient stock for product ${prod.productName || di.pid}` });
            }
            const price = prod.price ? parseFloat(prod.price.toString()) : di.price;
            serverTotal += price * di.qty;
        }

        // Multi-store isolation: all items must belong to the same store
        let firstStoreId = null;
        for (const di of orderItemsData) {
            const prod = productMap[di.pid];
            if (!prod) return res.status(400).json({ success: false, message: `Product ${di.pid} not found` });
            if (firstStoreId === null) {
                firstStoreId = prod.storeProfileId ? parseInt(prod.storeProfileId) : null;
            } else if (firstStoreId !== (prod.storeProfileId ? parseInt(prod.storeProfileId) : null)) {
                return res.status(400).json({ success: false, message: "Items from different stores are not allowed in one order" });
            }
        }
        const storeProfileId = firstStoreId;

        const idempotencyKey = req.body.idempotencyKey || null;
        // Duplicate protection via idempotency key only (no false positive on null)
        if (idempotencyKey) {
            const recentDup = await prisma.order.findFirst({
                where: {
                    userId: userId ? parseInt(userId) : null,
                    idempotencyKey: idempotencyKey,
                    orderDate: { gte: new Date(Date.now() - 300 * 1000) },
                },
                include: { orderItems: true },
                orderBy: { orderDate: "desc" },
            });
            if (recentDup) {
                return res.status(409).json({ success: false, message: "Duplicate order detected (idempotency key)", data: recentDup });
            }
        }

        const result = await prisma.$transaction(async (tx) => {
            // Create order with items
            const newOrder = await tx.order.create({
                data: {
                    userId: userId ? parseInt(userId) : null,
                    storeProfileId: storeProfileId,
                    customerName: customerName || req.user ? (req.user.name || "Customer") : "Customer",
                    customerPhone: customerPhone || (req.user ? req.user.mobile : ""),
                    customerAddress: customerAddress || "",
                    totalAmount: serverTotal,
                    paymentMethod: paymentMethod || "cash",
                    paymentStatus: paymentStatus || "pending",
                    orderStatus: orderStatus || "pending",
                    idempotencyKey: idempotencyKey || undefined,
                    orderNumber: `BK-${Math.floor(Math.random() * 9000) + 1000}`,
                    orderDate: new Date(),
                    orderItems: {
                        create: orderItemsData.map(di => {
                            const prod = productMap[di.pid];
                            const price = prod && prod.price ? parseFloat(prod.price.toString()) : di.price;
                            return {
                                productId: di.pid,
                                quantity: di.qty,
                                price: price || 0,
                            };
                        }),
                    },
                    payments: {
                        create: {
                            amount: serverTotal,
                            paymentMethod: paymentMethod || "cash",
                            paymentStatus: paymentStatus || "pending",
                            paidAt: (paymentStatus === "paid" || paymentStatus === "completed") ? new Date() : null,
                        },
                    },
                },
                include: { orderItems: true, payments: true },
            });

            // Decrease stock for each product
            for (const di of orderItemsData) {
                await tx.product.update({
                    where: { productId: di.pid },
                    data: { stockQty: { decrement: di.qty } },
                });
            }

            // Clear user's cart after successful order
            await tx.cart.deleteMany({ where: { userId: parseInt(userId) } });

            return newOrder;
        });

        res.status(201).json({ success: true, message: "Order created", data: result });
        // Notify customer that order was placed
        if (result && result.userId) {
            try {
                await prisma.notifications.create({
                    data: {
                        userId: parseInt(result.userId),
                        title: "Order Placed",
                        message: `Your order #${result.orderNumber || result.orderId} has been placed successfully.`,
                    },
                });
            } catch (e) {
                console.log("Notification creation error for order:", e);
            }
        }
    } catch (error) {
        console.log("Order creation error:", error);
        res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
    }
};

// Get all orders (admin order management) - filtered by admin's bakery/store
const getAllOrders = async (req, res) => {
    try {
        const userRole = req.user ? req.user.role : null;
        const adminEmail = req.user ? req.user.email : null;
        let whereClause = {};
        if (userRole === "admin" && adminEmail) {
            // Find store profile linked to this admin by email
            const storeProfile = await prisma.storeProfile.findFirst({ where: { email: adminEmail } });
            if (storeProfile) {
                whereClause = { storeProfileId: storeProfile.id };
            } else {
                // If admin has no store profile, return empty (they shouldn't see others' orders)
                whereClause = { storeProfileId: -1 };
            }
        }
        const orders = await prisma.order.findMany({
            where: whereClause,
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
        const userId = req.user ? req.user.userId : null;
        const phone = req.query.phone;
        let whereClause = {};
        if (userId) whereClause = { userId: parseInt(userId) };
        else if (phone) whereClause = { customerPhone: phone };
        else return res.status(401).json({ success: false, message: "Authentication required" });
        const orders = await prisma.order.findMany({
            where: whereClause,
            include: { orderItems: true, payments: true },
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
        // Enforce ownership: admin can see any; non-admin must have userId match or customerPhone match user's mobile
        const userId = req.user ? req.user.userId : null;
        const userRole = req.user ? req.user.role : null;
        const userMobile = req.user ? req.user.mobile : null;
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (userRole !== "admin" && userId) {
            const matches = (order.userId !== null && order.userId === parseInt(userId)) ||
                             (order.customerPhone && userMobile && order.customerPhone === userMobile);
            if (!matches) return res.status(403).json({ success: false, message: "Not authorized to view this order" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch order" });
    }
};

// Update order status (admin management with store isolation)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        const allowedStatuses = ["pending", "accepted", "preparing", "ready", "out_for_delivery", "delivered", "cancelled", "rejected"];
        if (!allowedStatuses.includes(orderStatus)) {
            return res.status(400).json({ success: false, message: "Invalid order status" });
        }

        // Verify order belongs to admin's store
        const order = await prisma.order.findUnique({ where: { orderId: parseInt(id) } });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (req.user && req.user.email) {
            const profile = await prisma.storeProfile.findFirst({ where: { email: req.user.email } });
            if (profile && order.storeProfileId !== profile.id) {
                return res.status(403).json({ success: false, message: "Not authorized to update this order" });
            }
        }

        const updateData = { orderStatus, updatedAt: new Date() };
        if (orderStatus === "delivered") {
            updateData.completedAt = new Date();
        }
        const updated = await prisma.order.update({
            where: { orderId: parseInt(id) },
            data: updateData,
        });
        // Create customer notification for status change (avoid duplicate for same transition)
        if (updated.userId && updated.orderStatus !== order.orderStatus) {
            const statusLabels = {
                pending: "Order Received",
                accepted: "Order Accepted",
                preparing: "Preparing Your Order",
                ready: "Ready for Pickup",
                out_for_delivery: "Out for Delivery",
                delivered: "Delivered",
                cancelled: "Order Cancelled",
                rejected: "Order Rejected",
            };
            await prisma.notifications.create({
                data: {
                    userId: parseInt(updated.userId),
                    title: statusLabels[updated.orderStatus] || "Order Update",
                    message: `Your order #${updated.orderNumber || id} is now ${updated.orderStatus}.`,
                },
            });
        }
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
            create: { orderId: parseInt(orderId), deliveryBoyId: deliveryBoyId ? parseInt(deliveryBoyId) : null, status, latitude: latitude ? parseFloat(latitude) : null, longitude: longitude ? parseFloat(longitude) : null },
        });
        res.status(200).json({ success: true, message: "Tracking updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update tracking" });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await prisma.order.update({
            where: { orderId: parseInt(id) },
            data: { orderStatus: "cancelled", updatedAt: new Date() },
        });
        res.status(200).json({ success: true, message: "Order cancelled", data: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to cancel order" });
    }
};

// Get delivery tracking for order (customer tracking)
const getDeliveryTracking = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user ? req.user.userId : null;
        const userRole = req.user ? req.user.role : null;
        const tracking = await prisma.deliveryTracking.findFirst({
            where: { orderId: parseInt(orderId) },
            include: { order: true },
        });
        if (!tracking) return res.status(404).json({ success: false, message: "Tracking not found" });
        // Authorization: admin can view any; customer must own the order
        if (userRole !== "admin" && userId) {
            const order = tracking.order;
            if (!order || (order.userId !== parseInt(userId) && !(req.user && req.user.mobile && order.customerPhone === req.user.mobile))) {
                return res.status(403).json({ success: false, message: "Not authorized" });
            }
        } else if (!userRole && userId) {
            // Non-admin, must match
            const order = tracking.order;
            if (!order || (order.userId !== parseInt(userId) && !(req.user && req.user.mobile && order.customerPhone === req.user.mobile))) {
                return res.status(403).json({ success: false, message: "Not authorized" });
            }
        }
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
    cancelOrder,
    updateDeliveryTracking,
    getDeliveryTracking,
};
