import prisma from "../config/prisma.js";

// Get analytics/dashboard data for admin
const getDashboardAnalytics = async (req, res) => {
    try {
        const totalRevenueResult = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { orderStatus: { not: "cancelled" } },
        });
        const totalOrders = await prisma.order.count();
        const activeOrders = await prisma.order.count({ where: { orderStatus: "pending" } });
        const pendingOrders = await prisma.order.count({ where: { orderStatus: "preparing" } });
        const deliveredOrders = await prisma.order.count({ where: { orderStatus: "delivered" } });
        const products = await prisma.product.count();
        const reviews = await prisma.review.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { user: true } });
        const lowStock = await prisma.product.findMany({ where: { stockQty: { lte: 5 }, publicCatalog: true } });

        res.status(200).json({
            success: true,
            data: {
                totalRevenue: totalRevenueResult._sum.totalAmount || 0,
                totalOrders,
                activeOrders,
                pendingOrders,
                deliveredOrders,
                totalProducts: products,
                recentReviews: reviews,
                lowStock,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to load analytics" });
    }
};

export { getDashboardAnalytics };
