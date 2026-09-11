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
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

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
router.post("/api/products", requireAdmin, createProduct);
router.put("/api/products/:id", requireAdmin, updateProduct);
router.delete("/api/products/:id", requireAdmin, deleteProduct);
router.patch("/api/products/:id/availability", requireAdmin, toggleProductAvailability);

router.get("/api/admin/catalog", requireAdmin, getAllProductsAdmin);

// ============== CART (Customer) ==============
router.post("/api/cart/add", authenticate, addToCart);
router.get("/api/cart", authenticate, getCart);
router.put("/api/cart/:id", authenticate, updateCartItem);
router.delete("/api/cart/:id", authenticate, removeCartItem);

// ============== ORDERS (Admin + Customer) ==============
router.post("/api/orders", authenticate, createOrder);
router.get("/api/orders", requireAdmin, getAllOrders);
router.get("/api/orders/customer", authenticate, getOrdersByCustomer);
router.get("/api/orders/:id", authenticate, getOrderById);
router.put("/api/orders/:id/status", requireAdmin, updateOrderStatus);
router.get("/api/orders/:orderId/tracking", authenticate, getDeliveryTracking);
router.put("/api/orders/:orderId/tracking", requireAdmin, updateDeliveryTracking);

// ============== ADDRESSES (Both apps) ==============
router.post("/api/address/save", authenticate, saveAddress);
router.get("/api/address", authenticate, getAddresses);
router.put("/api/address/:id", authenticate, updateAddress);
router.delete("/api/address/:id", authenticate, deleteAddress);

// ============== PROFILE (Both apps) ==============
router.get("/api/user/profile", authenticate, getProfile);
router.put("/api/user/profile/:id", authenticate, updateProfile);
router.put("/api/user/change-password", authenticate, changePassword);

// ============== ANALYTICS (Admin Dashboard) ==============
router.get("/api/dashboard/analytics", requireAdmin, getDashboardAnalytics);

// ============== NOTIFICATIONS ==============
router.post("/api/notifications", authenticate, createNotification);
router.get("/api/notifications", authenticate, getNotifications);
router.patch("/api/notifications/:id/read", authenticate, markNotificationRead);

// ============== REVIEWS ==============
router.post("/api/reviews", authenticate, createReview);
router.get("/api/reviews", getReviewsByProduct);

// ============== UPI / PAYMENT STUB ==============
router.post("/api/upi/save", upiidhandeler);

// ============== STORE PROFILE (Public store info) ==============
router.get("/api/store", getStoreProfile);

// ============== ONBOARDING (Admin store profile) ==============
router.post("/api/onboarding/save", requireAdmin, saveOnboarding);

// ============== PRODUCT IMAGE UPLOAD (Admin catalog) ==============
router.use("/api/add/itemdata", Addcakedetalisroute);

export default router;
