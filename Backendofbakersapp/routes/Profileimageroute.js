import express from "express";
import multer from "multer";
import path from "path";
import prisma from "../config/prisma.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const maxSize = 2 * 1024 * 1024; // 2MB

const upload = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if (allowedMime.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, WEBP images allowed"), false);
        }
    },
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });
        if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
        const fileUrl = "/" + req.file.filename;
        const updated = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { profileImageUrl: fileUrl },
        });
        const { Password, ...safeUpdated } = updated;
        res.json({ success: true, message: "Profile image updated", data: safeUpdated, fileUrl });
    } catch (error) {
        console.error("Profile image upload error:", error);
        res.status(500).json({ success: false, message: "Failed to upload profile image", error: error.message });
    }
});

export default router;
