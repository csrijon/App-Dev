import express from "express"
import multer from "multer"
const router = express.Router()

const upload = multer({ dest: "uploads/" })

router.post("/", upload.single("image"), (req, res, cb) => {
    console.log(req.body)
    // console.log(req.file)
    const imagename = req.file.originalname
    const filenames = Date.now() + imagename
    console.log(filenames)
    res.json({
        mess: "route is working"
    })
}
)
export default router