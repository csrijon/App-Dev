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


// Visitor / Page-view tracking (new)
const logVisitor = async (req, res) => {
  try {
    const { sessionId, pageUrl, ipAddress, userAgent } = req.body || {};
    await prisma.visitorLog.create({ data: { sessionId, pageUrl, ipAddress: ipAddress || req.ip, userAgent } });
    res.status(200).json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const logPageView = async (req, res) => {
  try {
    const { pagePath, pageTitle, source } = req.body || {};
    await prisma.pageView.create({ data: { pagePath, pageTitle, source: source || 'customer-web' } });
    res.status(200).json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const getVisitorStats = async (req, res) => {
  try {
    const today = new Date(); today.setHours(0,0,0,0);
    const week = new Date(today); week.setDate(today.getDate()-7);
    const countToday = await prisma.visitorLog.count({ where: { visitedAt: { gte: today } } });
    const countWeek = await prisma.visitorLog.count({ where: { visitedAt: { gte: week } } });
    const countTotal = await prisma.visitorLog.count();
    res.json({ success: true, data: { today: countToday, week: countWeek, total: countTotal } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

export { getDashboardAnalytics, logVisitor, logPageView, getVisitorStats };
