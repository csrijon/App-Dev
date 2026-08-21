
import prisma from "../config/prisma.js";


const UserappSignup = async (req, res) => {
    try {
        const { fullname, mobile, password, email } = req.body
        console.log(mobile, fullname, password, email)
        // 
        let checkaccount = await prisma.user.findFirst({
            where: {
                OR: [
                    { Email: email },
                    { Mobile: mobile }
                ]
            }
        })
        if (checkaccount) {
            return res.status(200).json({
                mess: "user Found Please go to Login"
            })
        }

        const Saveuser = await prisma.user.create({
            data: {
                Name: fullname,
                Email: email,
                Mobile: mobile,
                Password: password
            }
        })
        console.log("Signup successfully");

        res.status(201).json({
            success: true,
            message: "Signup successfully",
            user: Saveuser
        });

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