import prisma from "../config/prisma.js";

export const getStoreProfile = async (req, res) => {
    try {
        const profile = await prisma.storeProfile.findFirst({
            orderBy: { id: "desc" },
        });
        res.json({ success: true, store: profile || null });
    } catch (e) {
        res.status(500).json({ success: false, message: "Failed to fetch store profile" });
    }
};

export const saveOnboarding = async (req, res) => {
    try {
        const data = req.body;
        const profileData = {
            bakersName: data.bakersname || data.bakersName || null,
            ownerName: data.ownername || data.ownerName || null,
            email: data.Bemail || data.email || null,
            phone: data.phonenumber || data.phone || null,
            businessType: data.businesstype || data.businessType || null,
            logoUrl: data.logo || data.logoUrl || null,
            shopAddress: data.shopaddress || data.shopAddress || null,
            landmark: data.landmark || null,
            city: data.city || null,
            pincode: data.pincode || null,
            state: data.state || null,
            fssaiNumber: data.fssainumber || data.fssaiNumber || null,
            fssaiImage: data.fssaiimage || data.fssaiImage || null,
            openingTime: data.openingtime || data.openingTime || null,
            closingTime: data.closingtime || data.closingTime || null,
            weeklyOffDay: data.weeklyoffday || data.weeklyOffDay || null,
            acceptOrder247: data.acceptorder === true || data.acceptOrder247 === true,
            deliveryAvailable: data.deliveryavailable === true || data.deliveryAvailable === true,
            deliveryRadius: data.deliveryradius || data.deliveryRadius || null,
            deliveryCharge: data.deliverycharge || data.deliveryCharge || null,
            freeDeliveryAbove: data.freedeliveryabove || data.freeDeliveryAbove || null,
            minimumOrderValue: data.minimumordervalue || data.minimumOrderValue || null,
            productNames: typeof data.productnames === "string" ? data.productnames : (Array.isArray(data.productnames) ? JSON.stringify(data.productnames) : null),
        };
        // Reconcile Onboarding vs StoreProfile: use canonical StoreProfile as the persisted model
        let savedProfile = await prisma.storeProfile.findFirst({ orderBy: { id: "desc" } });
        if (savedProfile) {
            savedProfile = await prisma.storeProfile.update({
                where: { id: savedProfile.id },
                data: profileData,
            });
        } else {
            savedProfile = await prisma.storeProfile.create({ data: profileData });
        }
        // Also save Onboarding for wizard flow tracking (optional, but keeps both connected)
        const savedOnboarding = await prisma.onboarding.create({ data: profileData });
        res.status(201).json({ success: true, message: "Onboarding saved and store profile reconciled", profile: savedProfile });
    } catch (e) {
        console.error("Onboarding save error:", e);
        res.status(500).json({ success: false, message: "Failed to save onboarding", error: e.message });
    }
};
