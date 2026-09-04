import prisma from "../config/prisma.js";

// Add item to cart (customer app)
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
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
        const { userId } = req.query;
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
        const { id } = req.params;
        const { quantity } = req.body;
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
        const { id } = req.params;
        await prisma.cart.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to remove item" });
    }
};

export { addToCart, getCart, updateCartItem, removeCartItem };
