import prisma from "../config/prisma.js";

// Create notification
const createNotification = async (req, res) => {
    try {
        const { userId, title, message } = req.body;
        const notif = await prisma.notifications.create({
            data: { userId: parseInt(userId), title, message },
        });
        res.status(201).json({ success: true, message: "Notification created", data: notif });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to create notification" });
    }
};

// Get notifications for user
const getNotifications = async (req, res) => {
    try {
        const { userId } = req.query;
        const notifs = await prisma.notifications.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: notifs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch notifications" });
    }
};

// Mark notification as read
const markNotificationRead = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.notifications.update({ where: { id: parseInt(id) }, data: { isRead: true } });
        res.status(200).json({ success: true, message: "Marked as read" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to mark read" });
    }
};

export { createNotification, getNotifications, markNotificationRead };
