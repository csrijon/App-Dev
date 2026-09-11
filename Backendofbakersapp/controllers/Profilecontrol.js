import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

// Get user profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await prisma.user.findUnique({ where: { id: parseInt(userId) }, include: { addresses: true } });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        const { Password, ...safeUser } = user;
        res.status(200).json({ success: true, data: safeUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch profile" });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Email, Mobile } = req.body;
        const updated = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { Name, Email, Mobile },
        });
        const { Password, ...safeUpdated } = updated;
        res.status(200).json({ success: true, message: "Profile updated", data: safeUpdated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update profile" });
    }
};

// Change password
const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        const isMatch = await bcrypt.compare(currentPassword, user.Password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password incorrect" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updated = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { Password: hashedNewPassword },
        });
        res.status(200).json({ success: true, message: "Password changed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to change password" });
    }
};

export { getProfile, updateProfile, changePassword };
