import express from "express"
import multer from "multer"
import path from "path"
import prisma from "../config/prisma.js"

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname
        cb(null, uniqueName)
    }
})
const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
const maxSize = 5 * 1024 * 1024 // 5MB

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    if (allowedMime.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only JPEG, PNG, WEBP images allowed"), false)
    }
  }
})

router.post("/", upload.single("image"), async (req, res) => {
    // Derive store from admin identity; do not trust client-provided storeProfileId
    let storeProfileId = null;
    if (req.user && req.user.email) {
        const storeProfile = await prisma.storeProfile.findFirst({ where: { email: req.user.email } });
        if (storeProfile) storeProfileId = storeProfile.id;
    }
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" })
    }
    try {
        const fileUrl = "/" + req.file.filename

        // Save product data to database using the form fields from admin
        const product = await prisma.product.create({
            data: {
                productName: req.body.Itemname || req.body.itemName || "New Item",
                description: req.body.detalis || req.body.description || "",
                price: req.body.price ? parseFloat(req.body.price) : 0,
                imageUrl: fileUrl,
                weight: req.body.weight ? parseFloat(req.body.weight) : null,
                weightUnit: req.body.weightUnit || "kg",
                stockQty: req.body.stockQuantity ? parseInt(req.body.stockQuantity) : 0,
                prepTimeMinutes: req.body.preprationtime || req.body.prepTime ? parseInt(req.body.preprationtime || req.body.prepTime) : null,
                availableSizes: req.body.availablesizes || req.body.availableSizes || "",
                isEggless: req.body.iseggless === "true" || req.body.iseggless === true || req.body.isEggless === "true" || req.body.isEggless === true,
                flavorProfile: req.body.flavorProfile || "",
                category: req.body.category || "",
                publicCatalog: req.body.isAvailable === "true" || req.body.isAvailable === true || req.body.publicCatalog === "true" || req.body.publicCatalog === true,
                bestseller: req.body.isBestseller === "true" || req.body.isBestseller === true || req.body.bestseller === "true" || req.body.bestseller === true,
                featured: req.body.isFeatured === "true" || req.body.isFeatured === true || req.body.featured === "true" || req.body.featured === true,
                allowCustomMessage: req.body.allowCustomMessage === "true" || req.body.allowCustomMessage === true || req.body.allowCustomMessage === "on",
                storeProfileId: storeProfileId ? parseInt(storeProfileId) : null,
            }
        })

        res.json({
            success: true,
            message: "Upload successful and item saved to database",
            fileUrl,
            productId: product.productId,
            originalName: req.file.originalname,
            filename: req.file.filename
        })
    } catch (error) {
        console.error("Save error:", error)
        res.status(500).json({ success: false, message: "File uploaded but database save failed", error: error.message, fileUrl: "/" + req.file.filename })
    }
})

export default router
