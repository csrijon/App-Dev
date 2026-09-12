import prisma from "../config/prisma.js";

// Create review
const createReview = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        const { productId, rating, comment } = req.body;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        if (!rating || rating < 1 || rating > 5) return res.status(400).json({ success: false, message: "Invalid rating" });
        // Verify user has an order containing this product
        const userOrderItems = await prisma.orderItem.findMany({
            where: {
                productId: parseInt(productId),
                order: { userId: parseInt(userId) },
            },
            include: { order: true },
        });
        if (!userOrderItems || userOrderItems.length === 0) {
            return res.status(403).json({ success: false, message: "You can only review products you have purchased" });
        }
        // Prevent duplicate reviews for same user + product
        const existingReview = await prisma.review.findFirst({
            where: { userId: parseInt(userId), productId: parseInt(productId) },
        });
        if (existingReview) {
            return res.status(400).json({ success: false, message: "You have already reviewed this product" });
        }
        const review = await prisma.review.create({
            data: {
                userId: parseInt(userId),
                productId: parseInt(productId),
                rating: parseInt(rating),
                comment,
            },
        });
        res.status(201).json({ success: true, message: "Review submitted", data: review });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to submit review" });
    }
};

// Get reviews for product
const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.query;
        const reviews = await prisma.review.findMany({
            where: { productId: parseInt(productId) },
            include: { user: { select: { id: true, Name: true, Email: true, Mobile: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
};

export { createReview, getReviewsByProduct };
