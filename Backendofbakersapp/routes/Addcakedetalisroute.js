import express from "express"
import multer from "multer"
import path from "path"

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
const upload = multer({ storage })

router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" })
    }
    const fileUrl = "/" + req.file.filename
    res.json({
        success: true,
        message: "Upload successful",
        fileUrl,
        originalName: req.file.originalname,
        filename: req.file.filename
    })
})

export default router
