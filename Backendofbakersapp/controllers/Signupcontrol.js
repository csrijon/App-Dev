import pool from "../config/db.js"

const UserappSignup = async (req, res) => {
    try {
        const { fullname, mobile, password } = req.body
        console.log(mobile, fullname, password)
        let checknumber = await pool.query("SELECT * FROM MAINAPPLOGIN WHERE MOBILENUMBER =$1", [
            mobile
        ])
        if (checknumber.rowCount > 0) {
            return res.status(409).json({
                mess: "Number Already exist used Different NUmber"
            })
        }

        let signupprocess = await pool.query("INSERT INTO MAINAPPLOGIN(NAME,MOBILENUMBER,PASSWORD) VALUES($1,$2,$3)", [
            fullname, mobile, password
        ])
        console.log(signupprocess)
        if (signupprocess.rowCount > 0) {
            return res.status(201).json({
                mess: "Signup Successfully",
                detalis: fullname
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mess: "Faild to Signup"
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