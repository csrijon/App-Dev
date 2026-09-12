import prisma from "../config/prisma.js";

// Save/update address for user
const saveAddress = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const { fullName, phone, address, city, state, pincode, isDefault } = req.body;
        const saved = await prisma.address.create({
            data: {
                userId: parseInt(userId),
                fullName,
                phone,
                address,
                city,
                state,
                pincode,
                isDefault: isDefault === true || isDefault === "true",
            },
        });
        res.status(201).json({ success: true, message: "Address saved", data: saved });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to save address" });
    }
};

// Get addresses for user
const getAddresses = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const addresses = await prisma.address.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { isDefault: "desc" },
        });
        res.status(200).json({ success: true, data: addresses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch addresses" });
    }
};

// Update address (only if owned by user)
const updateAddress = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const { id } = req.params;
        const item = await prisma.address.findUnique({ where: { id: parseInt(id) } });
        if (!item) return res.status(404).json({ success: false, message: "Address not found" });
        if (item.userId !== parseInt(userId)) return res.status(403).json({ success: false, message: "Forbidden" });
        const updates = req.body;
        const updated = await prisma.address.update({
            where: { id: parseInt(id) },
            data: updates,
        });
        res.status(200).json({ success: true, message: "Address updated", data: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update address" });
    }
};

// Delete address (only if owned by user)
const deleteAddress = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        const { id } = req.params;
        const item = await prisma.address.findUnique({ where: { id: parseInt(id) } });
        if (!item) return res.status(404).json({ success: false, message: "Address not found" });
        if (item.userId !== parseInt(userId)) return res.status(403).json({ success: false, message: "Forbidden" });
        await prisma.address.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ success: true, message: "Address deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to delete address" });
    }
};

export { saveAddress, getAddresses, updateAddress, deleteAddress };
