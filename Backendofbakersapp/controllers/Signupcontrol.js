
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const UserappSignup = async (req, res) => {
    try {
        const { fullname, mobile, password, email } = req.body
        console.log("Signup for mobile:", mobile);
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

        const hashedPassword = await bcrypt.hash(password, 10);
        const Saveuser = await prisma.user.create({
            data: {
                Name: fullname,
                Email: email,
                Mobile: mobile,
                Password: hashedPassword
            }
        });
        const token = jwt.sign(
            { userId: Saveuser.id, email: Saveuser.Email, mobile: Saveuser.Mobile, role: "customer" },
            process.env.JWT_SECRET || process.env.jwt_secret || "default_secret_change_in_env",
            { expiresIn: "7d" }
        );
        const { Password, ...safeUser } = Saveuser;
        res.status(201).json({
            success: true,
            message: "Signup successfully",
            user: safeUser,
            token
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

        console.log("Admin signup for email:", email);

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

        const hashedPassword = await bcrypt.hash(password, 10);
        const signupdata = await prisma.user.create({
            data: {
                Name: fullName,
                Email: email,
                Mobile: mobile,
                Password: hashedPassword
            }
        });

        console.log("Admin signup successfully");

        const token = jwt.sign(
            { userId: signupdata.id, email: signupdata.Email, mobile: signupdata.Mobile, role: "admin" },
            process.env.JWT_SECRET || process.env.jwt_secret || "default_secret_change_in_env",
            { expiresIn: "7d" }
        );
        const { Password, ...safeAdmin } = signupdata;
        return res.status(201).json({
            success: true,
            message: "Sign Up Done",
            user: safeAdmin,
            token
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