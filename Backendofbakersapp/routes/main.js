
import express from "express"
import { UserappSignup, Adminappsignup } from "../controllers/Signupcontrol.js"
import { Loginmainapp, LoginAdminapp } from "../controllers/Logincontrol.js"
import { Addresssaveclick } from "../controllers/Addresscontrol.js"
import {upiidhandeler} from "../controllers/Upiidcontroler.js"
import Addcakedetalisroute from "./Addcakedetalisroute.js"

const router = express.Router()

router.post("/api/auth/signupmain", UserappSignup)
router.post("/api/auth/adminsignup", Adminappsignup)
router.post("/api/auth/loginmain", Loginmainapp)
router.post("/api/auth/loginadmin", LoginAdminapp)
router.post("/api/address/save",Addresssaveclick)
router.post("/api/upi/save",upiidhandeler)

router.use("/api/add/itemdata",Addcakedetalisroute)

export default router