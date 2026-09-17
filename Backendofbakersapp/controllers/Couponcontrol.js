import prisma from "../config/prisma.js";

const createCoupon = async (req, res) => {
  try {
    const { discountCode, discountName, discountPercent, startDate, endDate, isActive } = req.body;
    if (!discountCode || !discountPercent) return res.status(400).json({ success: false, message: "Code and percent required" });
    const coupon = await prisma.discount.create({
      data: { discountCode, discountName: discountName || discountCode, discountPercent: parseFloat(discountPercent), startDate: startDate ? new Date(startDate) : null, endDate: endDate ? new Date(endDate) : null, isActive: isActive !== false },
    });
    res.status(201).json({ success: true, data: coupon });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const getCoupons = async (req, res) => {
  try { const coupons = await prisma.discount.findMany({ orderBy: { createdAt: "desc" } }); res.json({ success: true, data: coupons }); } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const validateCoupon = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ success: false, message: "Code required" });
    const coupon = await prisma.discount.findFirst({ where: { discountCode: code.toUpperCase(), isActive: true } });
    if (!coupon) return res.status(404).json({ success: false, message: "Invalid or expired coupon" });
    const now = new Date();
    if (coupon.startDate && now < coupon.startDate) return res.status(400).json({ success: false, message: "Not yet active" });
    if (coupon.endDate && now > coupon.endDate) return res.status(400).json({ success: false, message: "Expired" });
    res.json({ success: true, data: coupon, discountPercent: parseFloat(coupon.discountPercent || 0) });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body }; if (data.discountPercent) data.discountPercent = parseFloat(data.discountPercent); if (data.startDate) data.startDate = new Date(data.startDate); if (data.endDate) data.endDate = new Date(data.endDate);
    const updated = await prisma.discount.update({ where: { discountId: parseInt(id) }, data });
    res.json({ success: true, data: updated });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const deleteCoupon = async (req, res) => {
  try { await prisma.discount.delete({ where: { discountId: parseInt(req.params.id) } }); res.json({ success: true }); } catch (e) { res.status(500).json({ success: false }); }
};

export { createCoupon, getCoupons, validateCoupon, updateCoupon, deleteCoupon };
