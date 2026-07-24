import pool from "../config/db.js"

const Loginmainapp = async (req, res) => {
    try {
        const { mobile, password } = req.body
        console.log(mobile, password)

        res.json({
            meess: "Login Successfully",
            details: mobile
        })
    } catch (error) {
        console.log(error)
        res.json({
            meess: "Not Working"
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
        // console.log(error)
        res.status(500).json({
            mess: "Login Faild "
        })
    }

}

export { Loginmainapp, LoginAdminapp }