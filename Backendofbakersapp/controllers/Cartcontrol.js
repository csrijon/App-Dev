import prisma from "../config/prisma.js";

// Add item to cart (customer app)
const addToCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : (req.body.userId ? parseInt(req.body.userId) : null);
        const { productId, quantity } = req.body;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const existing = await prisma.cart.findFirst({
            where: { userId: parseInt(userId), productId: parseInt(productId) },
        });
        if (existing) {
            const updated = await prisma.cart.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + (quantity ? parseInt(quantity) : 1) },
            });
            return res.status(200).json({ success: true, message: "Cart updated", data: updated });
        }
        const newCart = await prisma.cart.create({
            data: {
                userId: parseInt(userId),
                productId: parseInt(productId),
                quantity: quantity ? parseInt(quantity) : 1,
            },
        });
        res.status(201).json({ success: true, message: "Added to cart", data: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add to cart" });
    }
};

// Get cart for user
const getCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : (req.query.userId ? parseInt(req.query.userId) : null);
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const cartItems = await prisma.cart.findMany({
            where: { userId: parseInt(userId) },
            include: { product: true },
        });
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch cart" });
    }
};

// Update cart quantity
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        const { id } = req.params;
        const { quantity } = req.body;
        const item = await prisma.cart.findUnique({ where: { id: parseInt(id) }, include: { product: true } });
        if (!item) return res.status(404).json({ success: false, message: "Cart item not found" });
        if (userId && item.userId !== parseInt(userId)) return res.status(403).json({ success: false, message: "Forbidden" });
        const updated = await prisma.cart.update({
            where: { id: parseInt(id) },
            data: { quantity: parseInt(quantity) },
        });
        res.status(200).json({ success: true, message: "Cart updated", data: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update cart" });
    }
};

// Remove from cart
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        const { id } = req.params;
        const item = await prisma.cart.findUnique({ where: { id: parseInt(id) } });
        if (!item) return res.status(404).json({ success: false, message: "Cart item not found" });
        if (userId && item.userId !== parseInt(userId)) return res.status(403).json({ success: false, message: "Forbidden" });
        await prisma.cart.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to remove item" });
    }
};

export { addToCart, getCart, updateCartItem, removeCartItem };
