import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Loginmainapp = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        console.log("Login attempt mobile:", mobile);

        const user = await prisma.user.findUnique({
            where: {
                Mobile: mobile
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "No account found for this mobile number. Please sign up first."
            });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password. Please try again."
            });
        }

        const secret = process.env.JWT_SECRET || process.env.jwt_secret;
        if (!secret) throw new Error("JWT secret not configured");
        const token = jwt.sign(
            { userId: user.id, email: user.Email, mobile: user.Mobile, role: "customer" },
            secret,
            { expiresIn: "7d" }
        );
        const { Password, ...safeUserInfo } = user;
        return res.status(200).json({
            message: "Login Successfully",
            user: {
                id: user.id,
                name: user.Name,
                email: user.Email,
                mobile: user.Mobile
            },
            token
        });

    } catch (error) {
        console.log("Main App Login Error:", error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


const LoginAdminapp = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Admin login attempt email:", email);

        const user = await prisma.user.findUnique({
            where: {
                Email: email
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const secret = process.env.JWT_SECRET || process.env.jwt_secret;
        if (!secret) throw new Error("JWT secret not configured");
        const token = jwt.sign(
            { userId: user.id, email: user.Email, mobile: user.Mobile, role: "admin" },
            secret,
            { expiresIn: "7d" }
        );
        const { Password, ...safeAdminInfo } = user;
        return res.status(200).json({
            message: "Admin Login Successfully",
            user: {
                id: user.id,
                name: user.Name,
                email: user.Email,
                mobile: user.Mobile
            },
            token
        });

    } catch (error) {
        console.log("Admin Login Error:", error);

        return res.status(500).json({
            message: "Login Failed"
        });
    }
};

export { Loginmainapp, LoginAdminapp };