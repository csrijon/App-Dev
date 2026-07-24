import pool from "../config/db.js"

const UserappSignup = async (req, res) => {
    try {
        const { fullname, mobile, password } = req.body
        console.log(mobile, fullname, password)

        res.json({
            mess: "ALL DONE",
            detalis: fullname
        })
    } catch (error) {
        console.log(error)
        res.json({
            mess: "NOT WORKING"
        })
    }
}


const Adminappsignup = async (req, res) => {

    try {
        const { fullName, email, password } = req.body
        console.log(fullName, email, password)
        const signupdata = await pool.query("INSERT INTO USER_TABLE (NAME, EMAIL, PASSWORD) VALUES($1,$2,$3)", [fullName, email, password])
        console.log(signupdata)
        return res.status(200).json({
            mess: "Sign Up Done"
        })
    } catch (error) {
        console.log("Database Error:", error);

        return res.status(500).json({
            message: "Email Already Exist used different email"
        });
    }
}

export { UserappSignup, Adminappsignup }