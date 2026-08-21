
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
        const { fullName, email, password, mobile } = req.body;

        console.log(fullName, email, password, mobile);

        const checkaccount = await prisma.user.findFirst({
            where: {
                OR: [
                    { Email: email },
                    { Mobile: mobile }
                ]
            }
        });

        if (checkaccount) {
            return res.status(409).json({
                success: false,
                message: "Email or mobile number already exists."
            });
        }

        const signupdata = await prisma.user.create({
            data: {
                Name: fullName,
                Email: email,
                Mobile: mobile,
                Password: password
            }
        });

        console.log("Admin signup successfully");

        return res.status(201).json({
            success: true,
            message: "Sign Up Done",
            user: signupdata
        });

    } catch (error) {
        console.log("Database Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to sign up"
        });
    }
};

export { UserappSignup, Adminappsignup }