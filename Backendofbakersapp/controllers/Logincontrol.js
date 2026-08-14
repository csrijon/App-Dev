import pool from "../config/db.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { PrismaClient } from "../config/prisma.js"
// import 

dotenv.config()

const Loginmainapp = async (req, res) => {

    try {
        const { mobile, password } = req.body
        console.log(mobile, password)

        let logincheck = await pool.query("SELECT * FROM MAINAPPLOGIN WHERE MOBILENUMBER=$1 AND PASSWORD=$2", [
            mobile, password
        ])
        console.log(logincheck.rows[0].personid)
        const user = logincheck.rows[0]
        if (logincheck.rowCount > 0) {
            let jwttoken = jwt.sign(
                {
                    id: user.personid,
                    name: user.name,
                    Number: user.mobilenumber
                },
                process.env.jwt_secret,
                {
                    expiresIn: "1h"
                }

            )
            return res.status(200).json({
                meessage: "Login Successfully",
                details: mobile,
                ids: jwttoken
            })
        }
        if (logincheck.rowCount === 0) {
            return res.status(401).json({
                message: "Invalid Mobile Number or Password"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: error,
            meessage: "internal server error"
        })
    }
}

const LoginAdminapp = async (req, res) => {

    try {
        const { email, password } = req.body
        console.log(email, password)
        const finduser = await pool.query("SELECT * FROM USER_TABLE WHERE email=$1 AND password =$2", [email, password])
        console.log(finduser)
        if (finduser.rowCount > 0) {
            return res.status(200).json({
                mess: "LoginAdmin app is working"
            })
        }
        return res.status(401).json({
            mess: "Invalid email and password"
        })
    } catch (error) {
        res.status(500).json({
            mess: "Login Faild "
        })
    }

}

export { Loginmainapp, LoginAdminapp }