import prisma from "../config/prisma.js";

// Create review
const createReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;
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
            include: { user: true },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
};

export { createReview, getReviewsByProduct };
