
import express from "express"
import { UserappSignup, Adminappsignup } from "../controllers/Signupcontrol.js"
import { Loginmainapp, LoginAdminapp } from "../controllers/Logincontrol.js"
import { Addresssaveclick } from "../controllers/Addresscontrol.js"

const router = express.Router()

router.post("/api/auth/signupmain", UserappSignup)
router.post("/api/auth/adminsignup", Adminappsignup)
router.post("/api/auth/loginmain", Loginmainapp)
router.post("/api/auth/loginadmin", LoginAdminapp)
router.post("/api/address/save",Addresssaveclick)

export default router