import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const Loginmainapp = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        console.log(mobile, password);

        const user = await prisma.user.findUnique({
            where: {
                Mobile: mobile
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Mobile Number or Password"
            });
        }

        if (user.Password !== password) {
            return res.status(401).json({
                message: "Invalid Mobile Number or Password"
            });
        }

        const jwttoken = jwt.sign(
            {
                id: user.id,
                name: user.Name,
                email: user.Email,
                mobile: user.Mobile
            },
            process.env.jwt_secret,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "Login Successfully",
            details: {
                id: user.id,
                name: user.Name,
                email: user.Email,
                mobile: user.Mobile
            },
            token: jwttoken
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

        console.log(email, password);

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

        if (user.Password !== password) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const jwttoken = jwt.sign(
            {
                id: user.id,
                name: user.Name,
                email: user.Email,
                mobile: user.Mobile
            },
            process.env.jwt_secret,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "Admin Login Successfully",
            details: {
                id: user.id,
                name: user.Name,
                email: user.Email,
                mobile: user.Mobile
            },
            token: jwttoken
        });

    } catch (error) {
        console.log("Admin Login Error:", error);

        return res.status(500).json({
            message: "Login Failed"
        });
    }
};

export { Loginmainapp, LoginAdminapp };