import prisma from "../config/prisma.js";

export const saveOnboarding = async (req, res) => {
    try {
        const data = req.body;
        const saved = await prisma.storeProfile.create({
            data: {
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
            }
        });
        res.status(201).json({ success: true, message: "Onboarding saved", profile: saved });
    } catch (e) {
        console.error("Onboarding save error:", e);
        res.status(500).json({ success: false, message: "Failed to save onboarding", error: e.message });
    }
};
