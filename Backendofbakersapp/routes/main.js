import express from "express";
import { UserappSignup, Adminappsignup } from "../controllers/Signupcontrol.js";
import { Loginmainapp, LoginAdminapp } from "../controllers/Logincontrol.js";
import { saveAddress, getAddresses, updateAddress, deleteAddress } from "../controllers/Addresscontrol.js";
import { upiidhandeler } from "../controllers/Upiidcontroler.js";
import Addcakedetalisroute from "./Addcakedetalisroute.js";
import { getProfile, updateProfile, changePassword } from "../controllers/Profilecontrol.js";
import { getDashboardAnalytics } from "../controllers/Analyticscontrol.js";
import { saveOnboarding, getStoreProfile } from "../controllers/Onboardingcontrol.js";
import { createNotification, getNotifications, markNotificationRead } from "../controllers/Notificationcontrol.js";
import { createReview, getReviewsByProduct } from "../controllers/Reviewcontrol.js";
import { addToCart, getCart, updateCartItem, removeCartItem } from "../controllers/Cartcontrol.js";
import { createOrder, getAllOrders, getOrdersByCustomer, getOrderById, updateOrderStatus, updateDeliveryTracking, getDeliveryTracking } from "../controllers/Ordercontrol.js";
import { getAllProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct, searchProducts, toggleProductAvailability, getAllProductsAdmin } from "../controllers/Productcontrol.js";

const router = express.Router();

// ============== AUTH ==============
router.post("/api/auth/signupmain", UserappSignup);
router.post("/api/auth/adminsignup", Adminappsignup);
router.post("/api/auth/loginmain", Loginmainapp);
router.post("/api/auth/loginadmin", LoginAdminapp);

// ============== PRODUCTS (Customer + Admin) ==============
router.get("/api/products", getAllProducts);
router.get("/api/products/search", searchProducts);
router.get("/api/products/category", getProductsByCategory);
router.get("/api/products/:id", getProductById);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);
router.patch("/api/products/:id/availability", toggleProductAvailability);

router.get("/api/admin/catalog", getAllProductsAdmin);

// ============== CART (Customer) ==============
router.post("/api/cart/add", addToCart);
router.get("/api/cart", getCart);
router.put("/api/cart/:id", updateCartItem);
router.delete("/api/cart/:id", removeCartItem);

// ============== ORDERS (Admin + Customer) ==============
router.post("/api/orders", createOrder);
router.get("/api/orders", getAllOrders);
router.get("/api/orders/customer", getOrdersByCustomer);
router.get("/api/orders/:id", getOrderById);
router.put("/api/orders/:id/status", updateOrderStatus);
router.get("/api/orders/:orderId/tracking", getDeliveryTracking);
router.put("/api/orders/:orderId/tracking", updateDeliveryTracking);

// ============== ADDRESSES (Both apps) ==============
router.post("/api/address/save", saveAddress);
router.get("/api/address", getAddresses);
router.put("/api/address/:id", updateAddress);
router.delete("/api/address/:id", deleteAddress);

// ============== PROFILE (Both apps) ==============
router.get("/api/user/profile", getProfile);
router.put("/api/user/profile/:id", updateProfile);
router.put("/api/user/change-password", changePassword);

// ============== ANALYTICS (Admin Dashboard) ==============
router.get("/api/dashboard/analytics", getDashboardAnalytics);

// ============== NOTIFICATIONS ==============
router.post("/api/notifications", createNotification);
router.get("/api/notifications", getNotifications);
router.patch("/api/notifications/:id/read", markNotificationRead);

// ============== REVIEWS ==============
router.post("/api/reviews", createReview);
router.get("/api/reviews", getReviewsByProduct);

// ============== UPI / PAYMENT STUB ==============
router.post("/api/upi/save", upiidhandeler);

// ============== STORE PROFILE (Public store info) ==============
router.get("/api/store", getStoreProfile);

// ============== ONBOARDING (Admin store profile) ==============
router.post("/api/onboarding/save", saveOnboarding);

// ============== PRODUCT IMAGE UPLOAD (Admin catalog) ==============
router.use("/api/add/itemdata", Addcakedetalisroute);

export default router;
