import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email required" });

        const user = await prisma.user.findUnique({ where: { Email: email } });
        // Always return generic success to prevent account enumeration
        if (!user) {
            return res.status(200).json({ success: true, message: "If an account exists, a reset link will be sent." });
        }

        // Create secure reset token (random UUID + entropy) with 1-hour expiration
        const tokenValue = crypto.randomUUID() + "-" + crypto.randomBytes(16).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.resetToken.create({
            data: {
                email: user.Email,
                token: tokenValue,
                expiresAt,
                used: false,
            },
        });

        // EXTERNAL DELIVERY NOT CONFIGURED: no SMTP/Nodemailer setup in server.js
        // The secure token boundary is persisted; email delivery requires external SMTP service.
        console.log("[RESET BOUNDARY] Secure reset token created for email:", user.Email, "Token expires:", expiresAt.toISOString());

        res.status(200).json({
            success: true,
            message: "Reset instructions have been processed.",
            // No token returned to client; token should be delivered via configured email service
        });
    } catch (error) {
        console.log("Forgot password error:", error);
        res.status(500).json({ success: false, message: "Failed to process request" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) return res.status(400).json({ success: false, message: "Token and new password required" });
        if (String(newPassword).length < 6) return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

        const resetRecord = await prisma.resetToken.findFirst({
            where: {
                token,
                used: false,
                expiresAt: { gt: new Date() },
            },
        });
        if (!resetRecord) return res.status(400).json({ success: false, message: "Invalid or expired reset token" });

        const user = await prisma.user.findUnique({ where: { Email: resetRecord.email } });
        if (!user) return res.status(404).json({ success: false, message: "Account not found" });

        const hashed = await bcrypt.hash(String(newPassword), 10);
        await prisma.user.update({
            where: { Email: resetRecord.email },
            data: { Password: hashed },
        });
        // Mark token as used (single-use)
        await prisma.resetToken.update({
            where: { id: resetRecord.id },
            data: { used: true },
        });

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log("Reset password error:", error);
        res.status(500).json({ success: false, message: "Failed to reset password" });
    }
};

export { forgotPassword, resetPassword };
