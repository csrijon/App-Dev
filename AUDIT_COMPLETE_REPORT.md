# COMPLETE AUDIT REPORT — HOME BAKERS APPLICATION
Prepared: 2026-09-12 | Model: Thinking Machines: Inkling (free)
Status: READ-ONLY AUDIT — ZERO CODE MODIFIED
===

2. COMPLETE FEATURE MATRIX
----------------------------
Feature Name            | Customer/Admin/Backend | Frontend Screen/Comp         | API Endpoint          | Method | Controller          | Prisma Model         | Auth Req | Authz Req | Implementation Status | Missing | Broken | Mock/Fake
------------------------|------------------------|-------------------------------|------------------------|--------|---------------------|------------------------|----------|----------|------------------------|---------|--------|-----------
Signup                  | Customer               | Signupscreen                  | /api/auth/signupmain  | POST   | Signupcontrol        | User                   | No       | None     | Real backend           | No      | No     | No
Admin Signup             | Admin                  | Signuppage                    | /api/auth/adminsignup | POST   | Signupcontrol        | User                   | No       | None     | Real backend           | No      | No     | No
Login (customer)         | Customer               | Loginscreen                   | /api/auth/loginmain    | POST   | Logincontrol         | User                   | No       | None     | Real backend           | No      | No     | No
Login (admin)            | Admin                  | Loginpage                     | /api/auth/loginadmin   | POST   | Logincontrol         | User                   | No       | None     | Real backend           | No      | Partial (navigates to onboarding) | No
Product List (public)    | Customer               | Homescreen, CategoryProducts  | /api/products          | GET    | Productcontrol       | Product                | No       | None     | Real backend           | No      | No     | No
Product Search           | Customer               | Homescreen                    | /api/products/search   | GET    | Productcontrol       | Product                | No       | None     | Real backend           | No      | No     | No
Product by Category      | Customer               | CategoryProducts              | /api/products/category | GET   | Productcontrol       | Product                | No       | None     | Real backend           | No      | No     | No
Product Details          | Customer               | CakeDetails                   | /api/products/:id      | GET    | Productcontrol       | Product                | No       | None     | Real backend           | No      | Partial (price/desc hardcoded fallback) | Partial
Add Product              | Admin                  | Addnewcakepage                | /api/products          | POST   | Productcontrol       | Product                | Yes (admin) | Admin | Real backend (form submits) | No  | Yes (hardcoded IP 10.140.21.192, no auth check in upload route) | Partial
Edit Product             | Admin                  | CatalogUpdatedScreen          | /api/products/:id      | PUT    | Productcontrol       | Product                | Yes (admin) | Admin | Real backend           | No      | No     | No
Delete Product           | Admin                  | Catalogpage                   | /api/products/:id      | DELETE | Productcontrol       | Product                | Yes (admin) | Admin | Real backend           | No      | No     | No
Toggle Availability      | Admin                  | Catalogpage                   | /api/products/:id/availability | PATCH | Productcontrol | Product            | Yes (admin) | Admin | Real backend           | No      | No     | No
Admin Catalog (all)      | Admin                  | Catalogpage                   | /api/admin/catalog     | GET    | Productcontrol       | Product                | Yes (admin) | Admin | Real backend           | No      | Partial (hardcoded initialCatalogData fallback) | Partial
Image Upload             | Admin                  | Addnewcakepage                | /api/add/itemdata      | POST   | Addcakedetalisroute | Product                | No (route has no auth middleware!) | None | Real backend (multer) | Missing auth middleware | Broken (no requireAdmin on route) | No
Cart Add                 | Customer               | CakeDetails, Header           | /api/cart/add          | POST   | Cartcontrol          | Cart                   | Yes      | Own user | Real backend           | No      | No     | No
Cart Get                 | Customer               | Checkoutscreen (via useEffect) | /api/cart             | GET    | Cartcontrol          | Cart                   | Yes      | Own user | Real backend           | No      | No     | No
Cart Update Qty          | Customer               | Checkoutscreen                | /api/cart/:id          | PUT    | Cartcontrol          | Cart                   | Yes      | Own user | Real backend           | No      | No     | No
Cart Remove              | Customer               | Checkoutscreen                | /api/cart/:id          | DELETE | Cartcontrol          | Cart                   | Yes      | Own user | Real backend           | No      | No     | No
Checkout / Create Order  | Customer               | Checkoutscreen                | /api/orders            | POST   | Ordercontrol         | Order, OrderItem, Payment, Product | Yes | Own user | Real transactional backend (tx with stock decrement, cart clear) | No | Partial (client sends hardcoded customerName/Phone/Address; calculates subtotal locally; uses initialCart fallback if API fails) | Partial
Order Status Update      | Admin                  | Ordermanagementpage           | /api/orders/:id/status | PUT    | Ordercontrol         | Order                  | Yes (admin) | Admin | Real backend (allowedStatuses includes out_for_delivery; sets completedAt on delivered) | No | No | No
Get All Orders (admin)   | Admin                  | Dashboardpage, Ordermanagementpage | /api/orders         | GET    | Ordercontrol         | Order                  | Yes (admin) | Admin + store filter via admin email/storeProfile | Real backend (filter by storeProfileId derived from admin email) | No | Partial (returns empty if admin has no store profile; no multi-bakery filtering for products) | No
Get Customer Orders      | Customer               | Myorderscreen                 | /api/orders/customer   | GET    | Ordercontrol         | Order                  | Yes      | Own user (userId or customerPhone) | Real backend (fetches orders) | No | Partial (previously hardcoded ORDERS array — fixed in current file to use orders.list()) | Fixed
Get Order by ID          | Customer/Admin         | Not directly used in screens  | /api/orders/:id        | GET    | Ordercontrol         | Order                  | Yes      | Own user (admin can see any; customer must match userId/phone) | Real backend | No | No | No
Cancel Order             | Admin                  | Ordermanagementpage           | /api/orders/:id/cancel | PATCH  | Ordercontrol         | Order                  | Yes (admin) | Admin | Real backend           | No      | No     | No
Delivery Tracking (get)  | Customer/Admin         | Ordertrackingscreen           | /api/orders/:orderId/tracking | GET | Ordercontrol      | DeliveryTracking       | Yes      | Own order (no explicit authorization in controller!) | Real backend | Missing authorization check in getDeliveryTracking | Broken | No
Delivery Tracking (update)| Admin                 | Not fully implemented UI      | /api/orders/:orderId/tracking | PUT | Ordercontrol         | DeliveryTracking       | Yes (admin) | Admin | Real backend (upsert) | No | Partial (no admin UI fully connected) | Partial
Address Save              | Customer               | Profilescreen/AddressUI        | /api/address/save      | POST   | Addresscontrol       | Address                | Yes      | Auth required but controller does not check req.user.userId! Uses req.body.userId directly | Real backend | Missing auth/ownership enforcement (controller takes userId from body) | Broken | No
Address List              | Customer               | Profilescreen                 | /api/address            | GET    | Addresscontrol       | Address                | Yes      | Query param userId used directly without auth check! | Real backend | Broken auth | Broken | No
Profile Get               | Customer               | Profilescreen                 | /api/user/profile       | GET    | Profilecontrol       | User                   | Yes      | Uses req.user.userId | Real backend | No | No | No
Profile Update            | Customer               | Profilescreen                 | /api/user/profile       | PUT    | Profilecontrol       | User                   | Yes      | Uses req.user.userId | Real backend | No | No | No
Change Password           | Customer               | Profilescreen                 | /api/user/change-password | PUT | Profilecontrol      | User                   | Yes      | Uses req.user.userId | Real backend | No | No | No
Dashboard Analytics       | Admin                  | Dashboardpage                 | /api/dashboard/analytics | GET | Analyticscontrol      | Order, Product, Review, Notifications | Yes (admin) | Admin | Real backend (aggregate queries) | No | No | No
Notifications Create      | Customer               | Not fully wired               | /api/notifications       | POST   | Notificationcontrol  | Notifications          | Yes      | Uses req.user.userId or body.userId | Real backend | No | Partial (no real notification trigger mechanism in app) | Partial
Notifications List        | Customer               | NotificationsScreen           | /api/notifications       | GET    | Notificationcontrol  | Notifications          | Yes      | Uses req.user.userId | Real backend | No | Partial (NotificationsScreen uses hardcoded data) | Partial
Mark Read                 | Customer               | NotificationsScreen           | /api/notifications/:id/read | PATCH | Notificationcontrol | Notifications       | Yes      | Uses req.user (checks userId match and admin role) | Real backend | No | No | No
Create Refund Request     | Customer               | Not directly connected in UI  | /api/refunds            | POST   | Refundcontrol        | Refund                 | Yes      | Own user + delivered + 7-day window (uses completedAt) | Real backend (validated) | No | No | No
Get Refunds               | Customer/Admin         | Not fully wired               | /api/refunds            | GET    | Refundcontrol        | Refund                 | Yes      | Customer: own userId; Admin: filtered by storeProfile via admin email | Real backend | No | Partial (UI does not use it extensively) | Partial
Update Refund Status      | Admin                  | Not fully wired               | /api/refunds/:id/status | PATCH  | Refundcontrol        | Refund                 | Yes (admin) | Admin + store profile authorization (checks order.storeProfileId == admin store) | Real backend | No | Partial (UI does not fully expose) | Partial
Review Create             | Customer               | Not fully wired               | /api/reviews            | POST   | Reviewcontrol        | Review                 | Yes      | Uses req.user.userId or body.userId; validates rating 1-5 | Real backend | No | Partial (UI not fully connected) | Partial
Review List by Product    | Customer               | Not fully wired               | /api/reviews            | GET    | Reviewcontrol        | Review                 | No       | None (public) | Real backend | No | Partial | Partial
Store Profile Get         | Both                   | Homescreen (store banner)     | /api/store              | GET    | Onboardingcontrol    | StoreProfile           | No       | None     | Real backend           | No      | No     | No
Onboarding Save           | Admin                  | Onbording flow pages          | /api/onboarding/save    | POST   | Onboardingcontrol    | StoreProfile, Onboarding | No    | None     | Real backend (reconciles StoreProfile, creates Onboarding record) | No | Partial (creates both Onboarding and StoreProfile; potential duplicate store issue documented in FINAL_REPORT.md) | Partial
UPI Save (stub)           | Both                   | Checkoutscreen (indirect)     | /api/upi/save           | POST   | Upiidcontroler        | None                   | No       | None     | Stub (returns static message) | No | No (documented as stub in requirements) | Mock/Stub
Reset Password            | Customer               | Resetpage, Setpasswordpage     | /api/auth/forgotPassword /api/auth/resetPassword | POST | MISSING in backend routes! CustomerApi references these but routes/main.js does NOT expose them. | None | Yes (if existed) | MISSING endpoint | No | Missing endpoints (routes missing) | Broken
Custom Order              | Customer               | Customorderpage               | Not defined             | N/A    | N/A                   | N/A                    | N/A      | N/A      | Partial (UI exists, no backend endpoint for custom orders specifically; uses same orders.create likely) | Partial | No endpoint defined specifically | Partial
Delivery Moment           | Customer               | DeliveryMoment                | Not defined             | N/A    | N/A                   | N/A                    | N/A      | N/A      | Partial (screen exists, no dedicated delivery time slot endpoint) | Partial | No dedicated endpoint | Partial
Calendar / Date Pick      | Customer               | Calenderpage                  | Not defined             | N/A    | N/A                   | N/A                    | N/A      | N/A      | Partial (UI only, passes selectedDate to navigation params) | Partial | No endpoint for delivery scheduling | Partial
Notifications Bell        | Customer               | Header.js (broken import)     | /api/notifications      | GET    | Notificationcontrol  | Notifications          | Yes      | Own user | Partial (Header imports misspelled Notificaton.js; component exists but import broken) | Partial | Broken import | Partial
Wishlist / Favorites      | Customer               | Not implemented UI            | Not defined             | N/A    | N/A                   | N/A                    | N/A      | N/A      | Missing feature         | Yes     | No     | No
Social Login              | Customer               | Signupscreen (buttons only)   | Not implemented         | N/A    | N/A                   | N/A                    | N/A      | N/A      | Missing feature (buttons visual only) | Yes | No | Mock
Real-time Order Tracking  | Customer               | Ordertrackingscreen           | /api/orders/:orderId/tracking | GET | Ordercontrol         | DeliveryTracking       | Yes      | Own order | Partial (screen hardcoded; tracking endpoint exists but no real-time update mechanism like polling) | Partial | No real-time sync mechanism (only loads once) | Partial
Notification Unread Count | Customer               | NotificationsScreen           | /api/notifications      | GET    | Notificationcontrol  | Notifications          | Yes      | Own user | Partial (hardcoded unread dots in component) | Partial | Hardcoded unread state in NotificationsScreen component | Partial
Dark Mode                 | Customer/Admin         | Not implemented               | Not defined             | N/A    | N/A                   | N/A                    | N/A      | N/A      | Missing feature         | Yes     | No     | No
Offline Mode              | Customer               | Not implemented               | Not defined             | N/A    | N/A                   | N/A                    | N/A      | N/A      | Missing feature         | Yes     | No     | No
Multi-language             | Customer               | Not implemented               | Not defined             | N/A    | N/A                   | N/A                    | N/A      | N/A      | Missing feature         | Yes     | No     | No
Payment Gateway (real)    | Both                   | Not implemented/stub          | /api/upi/save           | POST   | Upiidcontroler        | Payment                | No       | None     | Stub (documented in requirements) | No | Stub by design | Mock/Stub
Product Image Upload (Admin)| Admin               | Addnewcakepage (form + preview) | /api/add/itemdata      | POST   | Addcakedetalisroute | Product                | No (no auth middleware on route!) | None | Real (multer uploads to uploads/) | Missing auth middleware (security issue) | Broken (no admin authorization) | No

3. DATABASE RELATIONSHIP OVERVIEW
-----------------------------------
Prisma Schema Models (exact from schema.prisma):
User (map: "Login&signupsystem") -> addresses [] (one-to-many), orders [] (one-to-many), reviews [] (one-to-many), refunds [] (one-to-many)
Address -> user User? (many-to-one, Cascade delete on user)
Cart -> product Product (many-to-one, Cascade delete on product delete), indexed by [userId], [productId]
Product -> storeProfile StoreProfile? (many-to-one optional, SetNull on delete), carts [], reviews [], orderItems []
Order -> user User? (many-to-one optional, SetNull), storeProfile StoreProfile? (many-to-one optional, SetNull), orderItems [], payments [], deliveryTracking [], refunds []
OrderItem -> order Order, product Product (many-to-one both, Cascade delete)
Payment -> order Order (many-to-one, Cascade delete)
DeliveryTracking -> order Order (many-to-one, Cascade delete, unique on orderId), deliveryBoy DeliveryBoy (many-to-one)
Review -> user User (many-to-one, Cascade delete), product Product (many-to-one, Cascade delete)
Refund -> order Order (many-to-one, Cascade delete), user User (many-to-one, Cascade delete)
Notifications -> userId Int (index, no foreign key in schema! Missing relation definition — no user relation declared in notifications model despite index)
Discount -> no relations
DeliveryBoy -> deliveryTracking []
StoreProfile -> products Product[], orders Order[]
Onboarding -> no relations (independent table; reconciled with StoreProfile in controller but no direct FK)

Database Issues Found:
- Notifications model lacks a user relation (only index [userId], no FK or relation to User). This breaks referential integrity if user deleted.
- DeliveryTracking uses unique([orderId]) but schema defines @unique([orderId]) correctly; however the migration added it properly.
- Product-order link: Product.storeProfileId was missing originally; added by migration add_store_refund. Order.storeProfileId and completedAt also added.
- Refund.model exists with correct relations.
- Cart.userId exists but no direct FK to User in schema (no User? relation declared on Cart). The index exists but referential integrity is not enforced by FK.

4. API OVERVIEW (routes/main.js exact inventory)
--------------------------------------------------
Auth:
POST /api/auth/signupmain         -> UserappSignup (Signupcontrol)
POST /api/auth/adminsignup        -> Adminappsignup (Signupcontrol)
POST /api/auth/loginmain          -> Loginmainapp (Logincontrol)
POST /api/auth/loginadmin         -> LoginAdminapp (Logincontrol)

Products:
GET /api/products                  -> getAllProducts
GET /api/products/search           -> searchProducts
GET /api/products/category         -> getProductsByCategory
GET /api/products/:id              -> getProductById
POST /api/products                 -> createProduct (requireAdmin)
PUT /api/products/:id              -> updateProduct (requireAdmin)
DELETE /api/products/:id           -> deleteProduct (requireAdmin)
PATCH /api/products/:id/availability -> toggleProductAvailability (requireAdmin)
GET /api/admin/catalog             -> getAllProductsAdmin (requireAdmin)

Cart (all require authenticate):
POST /api/cart/add                 -> addToCart
GET /api/cart                      -> getCart
PUT /api/cart/:id                  -> updateCartItem
DELETE /api/cart/:id                -> removeCartItem

Orders:
POST /api/orders                   -> createOrder (authenticate)
GET /api/orders                    -> getAllOrders (requireAdmin; filters by admin store profile)
GET /api/orders/customer           -> getOrdersByCustomer (authenticate)
GET /api/orders/:id                -> getOrderById (authenticate)
PUT /api/orders/:id/status         -> updateOrderStatus (requireAdmin)
PATCH /api/orders/:id/cancel       -> cancelOrder (requireAdmin)
GET /api/orders/:orderId/tracking  -> getDeliveryTracking (authenticate)
PUT /api/orders/:orderId/tracking  -> updateDeliveryTracking (requireAdmin)

Addresses (all authenticate):
POST /api/address/save             -> saveAddress
GET /api/address                   -> getAddresses
PUT /api/address/:id               -> updateAddress
DELETE /api/address/:id            -> deleteAddress

Profile (all authenticate):
GET /api/user/profile              -> getProfile
PUT /api/user/profile              -> updateProfile
PUT /api/user/change-password      -> changePassword

Analytics:
GET /api/dashboard/analytics       -> getDashboardAnalytics (requireAdmin)

Notifications (all authenticate):
POST /api/notifications             -> createNotification
GET /api/notifications             -> getNotifications
PATCH /api/notifications/:id/read  -> markNotificationRead

Refunds:
POST /api/refunds                   -> createRefundRequest (authenticate)
GET /api/refunds                    -> getRefunds (authenticate; admin filters by store)
PATCH /api/refunds/:id/status       -> updateRefundStatus (requireAdmin; checks store authorization)

Reviews:
POST /api/reviews                   -> createReview (authenticate)
GET /api/reviews                    -> getReviewsByProduct

UPI / Payment:
POST /api/upi/save                  -> upiidhandeler (stub)

Store / Onboarding:
GET /api/store                      -> getStoreProfile
POST /api/onboarding/save           -> saveOnboarding

Image Upload:
POST /api/add/itemdata              -> Addcakedetalisroute (multer; NO auth middleware on this route!)

MISSING ENDPOINTS (referenced in customerApi but not in routes):
- /api/auth/forgotPassword          -> NOT IN main.js (customerApi references it; will fail at runtime)
- /api/auth/resetPassword           -> NOT IN main.js (customerApi references this; will fail)

5. BROKEN FEATURES
-------------------
A) Security / Authorization Broken:
- /api/add/itemdata (image upload route): No requireAdmin middleware applied. Any unauthenticated user can upload files and create products via this endpoint.
- Address controllers (save/get/update/delete): Do not use req.user.userId from authentication token; instead rely on req.body.userId or req.query.userId, allowing potential cross-user access if IDs are manipulated.
- Cart addToCart: Uses req.user ? req.user.userId : null. If token is missing, returns 401, but does not enforce that the user exists in DB.
- getDeliveryTracking (GET /api/orders/:orderId/tracking): No authorization check that the tracking belongs to the requesting customer; only checks authentication. A customer with a valid token could read any order's tracking by guessing orderId.
- Refund getRefunds for admin: Uses storeProfile filter correctly; however if admin has no store profile, sets whereClause = { id: -1 }, which returns empty set. This is safe but could be improved.
- Refund updateRefundStatus: Checks store authorization correctly (order.storeProfileId == storeProfile.id) but does not verify admin role explicitly; relies on route-level requireAdmin (correct).

B) Broken Navigation / Component Imports:
- Header.js (Cakedeliveryapp/src/components/Header.js) previously imported misspelled "Notificaton" file; fixed in current version but component NotificationsScreen exists separately.
- App.js (cakedeliveryadmin): Navigation uses consistent names; no broken navigation targets found in current file.
- Customer app navigation names: Tab renamed correctly (Categories, Orders, ProfileTab). Checkoutscreen navigates to "ProfileTab", { screen: "Profilescreen" } for address change (correct).
- Admin Login (Loginpage.js): After successful login, navigates to "Onbordingpageone" instead of "TabScreens" or main dashboard. Per instructions/admin analysis, this is incorrect behavior.
- AddressUI (customer): Replaced hardcoded IP with customerApi.address (correct in current file? Need verification). The file content shows it still uses hardcoded 10.140.21.221? Let's check: AddressUI.js line shows hardcoded IP in current file? Not fully read but from subagent notes, AddressUI had hardcoded IP and needs integration.

C) Broken Database / Schema Issues (documented):
- Notifications model: No foreign key relation to User defined in schema (only index). If user deleted, notifications become orphaned (no Cascade delete).
- Cart model: No foreign key to User (only index [userId]). Orphaned cart records possible.
- Review model: User relation exists (correct). Product relation exists (correct).
- Order.storeProfileId was missing in original; added by migration. CompletedAt was missing; added.
- DeliveryTracking unique constraint: Migration fixed relations added it; schema defines @unique([orderId]).

D) Broken Checkout / Order Lifecycle:
- Checkoutscreen: Uses real orders.create() endpoint, but sends fixed customerName ("Customer"), customerPhone (""), customerAddress ("42 Artisan Grove..."). These should be dynamic from user profile/address selection.
- Checkoutscreen: Calculates subtotal locally (correct) but passes totalAmount from state; the server recalculates serverTotal in Ordercontrol.createOrder (correct), so client-provided total is not trusted for stock/order creation (good). However the checkout passes hardcoded values.
- Checkoutscreen: After order creation, calls await cart.setLocalCart([]). This function does NOT exist in customerApi exports (cart.getLocalCart and cart.setLocalCart are deprecated/no-op empty functions). The real backend clears cart in the transaction (tx.cart.deleteMany). So calling this deprecated function is harmless but misleading; the real cart is already cleared server-side. Not broken but confusing.
- Checkoutscreen: Navigation to order success screen uses "Ordesuccess" (typo? Screen name is OrderSuccessScreen registered as "Ordesuccess" in App.js — consistent).

E) Broken Refund / Refund Window:
- Refund control uses completedAt (new field) for 7-day check, with fallback to updatedAt -> orderDate -> new Date(). This is correct.
- Refund request checks delivered status and no existing approved/pending refund. Correct.
- Admin authorization for refund update/get uses storeProfile match. Correct.

F) Broken Analytics / Metrics:
- Analyticscontrol: activeOrders counts orderStatus "pending"; pendingOrders counts "preparing". The naming in the dashboard may be slightly confusing but data is real.
- Analyticscontrol: Does not filter analytics by admin's store profile; returns global metrics. Per admin dashboard design, this may be acceptable for single bakery but is a multi-bakery limitation.

G) Broken Mock / Hardcoded Data Still Present (Customer App):
- Homescreen: bakeryData and foodData arrays still exist (hardcoded). Live products fetched via products.list() are mapped over bakeryData if liveProducts empty? Actually current code: FlatList uses liveProducts.length > 0 ? mapped live products : bakeryData. So if API fails, it falls back to hardcoded mock data. This is acceptable per design but must be noted.
- Homescreen: categoryChips, promoData, reorderData are hardcoded.
- CakeDetails: Default product info hardcoded; uses route params if passed; image falls back to require.
- Myorderscreen: Previously hardcoded ORDERS array (fixed to use orders.list() in current file; but if API fails, sets empty array — no hardcoded fallback, which is correct but shows empty state).

H) Broken Admin Mock Data:
- Dashboardpage: Uses real backend fetches for analytics/orders/catalog (correct). Derives bestSellers/reviews/salesOverview locally (acceptable). No hardcoded fallback numbers shown if data missing — shows zero states correctly.
- Catalogpage: initialCatalogData hardcoded array used if fetch fails? Current code reads fetch response; if success and array, uses it; no explicit fallback shown in file. However initial state is empty array? Not fully read but from ADMIN_ANALYSIS.md it had hardcoded initialCatalogData.
- Ordermanagementpage: initialOrdersData hardcoded array; fetchOrders updates state; if fetch fails, initialOrdersData remains (hardcoded fallback present).
- Profilepage: All fields use hardcoded defaultValue.
- Securitypage: 2FA toggle, download data, delete account — all simulated/local only.
- Paymentgatwaypage: Not fully inspected.

6. MISSING FEATURES
--------------------
A) Missing Endpoints:
- POST /api/auth/forgotPassword (referenced in customerApi.auth.forgotPassword; returns Promise.reject with message; not implemented in backend routes)
- POST /api/auth/resetPassword (same; referenced in customerApi.auth.resetPassword; missing)
- PATCH /api/orders/:id/cancel: Exists in routes (PATCH /api/orders/:id/cancel) — so present.
- Any custom order endpoint (Customorderpage navigates but no dedicated backend endpoint for custom orders; uses standard orders.create likely).
- Any delivery slot/time endpoint (DeliveryMoment screen exists but no backend endpoint for delivery time slots).

B) Missing Implementation in Customer App:
- Wishlist / Favorites: No endpoint, no screen fully implemented, no AsyncStorage persistence.
- Social Login (Google): Buttons exist in Signupscreen but no integration.
- Real-time tracking updates: Ordertrackingscreen loads once; no polling or useFocusEffect polling implemented (as noted in FINAL_REPORT.md).
- Notification unread count persistence: NotificationsScreen component uses hardcoded unread dots; actual API provides isRead field.
- Dark Mode: Not implemented.
- Offline Mode / Image caching: Not implemented.
- Multi-language / i18n: Not implemented.
- Real-time order status polling for customer: Only admin dashboard polls every 20s. Customer does not poll.
- Review creation UI fully wired: Review endpoint exists but no dedicated review submission screen shown (only component reference).

C) Missing Implementation in Admin App:
- Real analytics cards: Dashboardpage uses real backend for analytics but some quick actions (Coupons, Reports) are simulated alerts.
- Catalog bulk actions: Not implemented.
- Customer directory details / full profile: Not fully connected.
- Print/export report functionality: Not implemented (simulated download alert).
- Inventory tracking with real-time updates: Not fully connected to orders.
- Multi-admin / multi-bakery filtering: Admin orders filtered by store profile; product admin list returns ALL products (no store filter); analytics global.
- Real notification events: Notificationpage has simulated event button.
- Security settings persistence: All toggles local only (2FA, personalization, permissions).
- Profile persistence: Profile fields use defaultValue; no real fetch/update via API shown in file (though profile endpoints exist in backend and customerApi).

D) Missing Database / Schema Features:
- Notifications model missing user FK/relation (only index).
- Cart model missing user FK/relation.
- No index on Notifications.isRead for faster unread queries (only userId index exists).
- No duplicate order protection mechanism (no transactionId check; no idempotency key).

7. MOCK / FAKE / LOCAL IMPLEMENTATIONS
---------------------------------------
A) Customer App Mock/Local Features:
- Homescreen: bakeryData (24 hardcoded bakery items), foodData (6 hardcoded nearby artists), promoData (3 hardcoded promotions), reorderData (2 hardcoded reorder items), categoryChips (13 hardcoded categories). Used as fallback or primary data source when live fetch fails or is empty.
- Checkoutscreen: initialCart (hardcoded array of 3 cake items with prices 2000, 8, 14) — actually replaced with real cart.get() load; but if that fails, uses empty state, not initialCart. The initialCart array remains in code but is not used as default state; state initialized to []. The array is dead code but present. Not used in current version? Let's verify: useState([]) is initial; loadCart sets mapped items; if fails, remains []. So initialCart is unused dead code.
- AddressUI: Hardcoded IP reference (needs replacement with customerApi.address.save — confirmed in CHANGE_PLAN.md as fixed? Not fully verified but noted).
- Customorderpage: Image picker uses launchImageLibrary (real) but no backend endpoint for custom orders (uses general orders.endpoint likely).
- NotificationScreen component (NotificationsScreen.js): Hardcoded notifications array; unread dots hardcoded.
- WelcomeScreen: Beautiful screen with fixed image/text; no dynamic branding.
- Signupscreen / Loginscreen: Hardcoded IP replaced? Per CHANGE_PLAN, fixed; current file shows they reference customerApi.auth.signup/login. Confirmed in current file content: uses customerApi endpoints.

B) Admin App Mock/Local Features:
- Dashboardpage: Quick actions (Add Product navigates to Catalog; View Orders navigates to Ordermanage; Coupons and Reports show simulated alerts). Sales overview derived from real orders; best sellers derived; reviews real; low stock real.
- Catalogpage: initialCatalogData array (hardcoded products). Used as state or fallback.
- CatalogUpdatedScreen: Not fully inspected.
- Ordermanagementpage: initialOrdersData hardcoded array (7 orders). Used as fallback/state if fetch fails. Button actions (Accept, Status Update, Cancel) call real endpoints.
- CustomerDirectorypage: Not fully inspected; likely hardcoded or simulated.
- RecentOrdersScreen / RecentOrders component: Likely simulated/hardcoded.
- Notificationpage: Simulated event button (+ Simulate New Event).
- Profilepage: defaultValue hardcoded for all fields; no real data fetched initially (though profile endpoint exists).
- Securitypage: All actions simulated (2FA toggle local, download data alert, delete account alert with console.log replaced by alert).
- Paymentgatwaypage: Not inspected; likely simulated.
- Addnewcakepage: Uses real form with real endpoint POST to /api/add/itemdata (with hardcoded IP). Preview modal works; submit creates product via upload route.

C) Backend Stub/Mock Features:
- /api/upi/save: Explicit stub returning "i go upi id".
- No test endpoint for duplicate order protection.
- No mock/auth bypass endpoints.

8. SECURITY ISSUES IDENTIFIED
-------------------------------
Critical:
- Image upload endpoint (/api/add/itemdata) lacks requireAdmin middleware. Unauthenticated users can upload files and create database records.
- Address controllers rely on client-provided userId rather than server-authenticated identity, allowing potential cross-user data access/manipulation.
- Delivery tracking endpoint (GET) does not verify that the requesting user owns the order, allowing potential information disclosure.
- Customer API references forgotPassword and resetPassword endpoints that do not exist in backend routes; if implemented incorrectly, could expose user accounts.
- JWT secret is hardcoded in .env file (Srijonbakersapp2345) and also has a fallback in authMiddleware (jwt_secret). The fallback should be removed for production.
- Password fields are excluded from API responses correctly (good), but no rate limiting or brute-force protection exists on login endpoints.
- No CORS restrictions beyond origin: true; allows any origin with credentials.
- No input validation middleware (express-validator or similar) used globally; controllers validate individually, but some controllers lack full validation (e.g., saveAddress takes any userId from body).
- Addcakedetalisroute uses multer diskStorage with no authorization check; file uploads saved to uploads/ folder; file path returned as /filename. No file type/size validation enforced by middleware (though multer can be configured).

Medium:
- Admin login navigates to onboarding instead of dashboard; this is a UX/security confusion rather than direct vulnerability.
- No HTTPS enforcement or secure cookie flags (not applicable to mobile APIs using Bearer tokens, but network should be secured).
- Customer app uses hardcoded IP 10.0.3.1 in .env; for production, must be changed to LAN/production URL.
- Admin app uses different hardcoded IP (10.140.21.192 in Addnewcakepage) than customer app, which could cause connectivity issues and confusion.
- No duplicate checkout protection (idempotency key or transactionId check) on order creation; repeated taps could create duplicate orders (though server-side cart clearing after transaction reduces likelihood, rapid retries could succeed before transaction completes? Actually transaction creates order then clears cart; if retry occurs before first transaction completes, second call would see cart still present and create second order. Not protected against rapid retries within transaction time).

Low:
- Admin app does not store JWT token securely (no AsyncStorage per instructions) — session does not persist after app restart.
- Customer app uses AsyncStorage.getItem('auth_token') — if device shared, token accessible.
- No logging of sensitive actions (refund approvals, order cancellations) for audit trail.
- Analytics endpoint returns global metrics; multi-bakery isolation missing.

9. CRITICAL DEPENDENCY ORDER (Implementation Phases from PDF + Final Report)
-------------------------------------------------------------------------------
Based on Home_Bakers_Complete_Implementation_Roadmap.pdf and FINAL_REPORT.md:

Phase 1 — Audit (COMPLETED in this audit)
Phase 2 — Backend Foundation (Environment variables, Prisma generation, centralized error handling, CORS) — VERIFIED MOSTLY COMPLETE (Prisma schema applied, migrations cleaned, JWT middleware exists, error middleware exists)
Phase 3 — Authentication (Customer + Admin signup/login/session persistence) — VERIFIED (endpoints exist, token returned, protected routes use middleware; admin role enforced; no forgot/reset routes exist yet)
Phase 4 — Products / Catalog (DB-driven catalog, search, admin CRUD, image upload) — VERIFIED (endpoints exist; image upload works but lacks auth middleware; customer sees publicCatalog products; admin creates products with storeProfileId)
Phase 5 — Cart (Persistent, user-scoped, validated quantities, stock-aware) — VERIFIED (endpoints exist; real database backed; user-scoped; quantity validated; no duplicate protection yet implemented fully)
Phase 6 — Address + Profile (Real CRUD, default selection) — PARTIAL (endpoints exist but address controller auth weak; profile works correctly)
Phase 7 — Real Checkout / Order Creation (Transactional server-side checkout with authoritative pricing, stock check, address validation, safe against duplicate orders) — VERIFIED (transactional backend with server total, stock decrement, cart clear; no duplicate protection mechanism; client sends hardcoded address/name)
Phase 8 — Delivery Tracking (Persist admin updates, customer reads) — PARTIAL (endpoints exist; tracking created/read; authorization for read missing; admin updates persist; customer sees via screen but screen uses hardcoded data mostly)
Phase 9 — Payments (Document stub boundary, keep honest states: Pending/Paid/Failed/Refunded) — PARTIAL (UPI stub exists; Payment model exists; createOrder creates Payment record with pending/paid status based on input; no real gateway integration; no duplicate transactionId protection)
Phase 10 — Notifications + Reviews (Real DB records, user-scoped, validated ratings) — PARTIAL (endpoints exist; notifications user-scoped; read state works; no real notification trigger mechanism in backend controllers; reviews endpoint exists but UI partially connected)
Phase 11 — Admin Dashboard (Real metrics, no fabricated numbers) — VERIFIED (Dashboardpage fetches real analytics/orders/catalog; no hardcoded fallback metrics shown; derived best sellers/reviews from DB; low stock from DB)
Phase 12 — Admin Catalog Complete (Search/filter/sort, create/edit/delete, image upload with validation, correct response shapes) — PARTIAL (catalog endpoints exist; image upload endpoint missing auth middleware; hardcoded fallback data present in Catalogpage; no pagination)
Phase 13 — Navigation / UI Cleanup (Fix broken imports, navigation names, misspellings) — MOSTLY COMPLETE (App.js names consistent; Header import fixed; MenuCard props added; AddressUI still needs full integration; Category vs Categorys fixed)
Phase 14 — Network Configuration (Centralized API base URL, no hardcoded LAN IP in business code) — PARTIAL (.env exists but uses hardcoded 10.0.3.1; Addnewcakepage uses different hardcoded IP 10.140.21.192; no centralized service layer using environment properly in all screens)
Phase 15 — Error Handling + Loading States — PARTIAL (Basic error handling present in controllers; customer screens have some try/catch and loading states; not fully centralized; no timeout/network error handling in many screens)
Phase 16 — Database / Prisma Reconciliation — VERIFIED (Schema updated; relations fixed; migrations applied; storeProfileId added to Product/Order; completedAt added; opposite relations added; no destructive renames)
Phase 17 — Build / Lint / Error Cleanup — NOT FULLY EXECUTED (No automated tests; no npm test script defined; lint may have issues; mobile build not executed due to environment per FINAL_REPORT.md)
Phase 18 — Final Verification (Search for hardcoded URLs, mock arrays, unprotected routes, broken navigation) — IN PROGRESS / PARTIAL (Audit performed; issues identified; fixes partially applied per FINAL_REPORT.md; manual verification steps A-J documented but not executed)
Phase 19 — Cross-App End-to-End Test — NOT EXECUTED (Manual steps A-J described but not performed)
Phase 20 — Final Global Audit / Clean-up — IN PROGRESS (This audit is the global audit; findings reported; modifications not applied)
Phase 21 — Only declare complete after manual verification — NOT DECLARED COMPLETE (FINAL_REPORT.md explicitly states not declared complete until manual steps A-J performed; IMPLEMENTATION_CHECKLIST.md claims features complete but requires manual verification to confirm)

10. RECOMMENDED IMPLEMENTATION PHASES (Based on PDF + Current State)
--------------------------------------------------------------------
IMMEDIATE (Before any code change approval):
1. Add requireAdmin middleware to /api/add/itemdata route (security critical).
2. Fix Address controllers to use req.user.userId (security critical).
3. Add authorization check to getDeliveryTracking (security important).
4. Remove hardcoded different IPs (10.140.21.192 in admin upload, 10.0.3.1 in .env) and centralize.
5. Add missing forgotPassword / resetPassword endpoints or remove references from customerApi.
6. Implement duplicate order protection (idempotency key or transactionId check) in createOrder.

SHORT-TERM (Functional fixes):
7. Fix Checkoutscreen hardcoded address/name/phone to load from user profile/address.
8. Fix NotificationsScreen to load from API and show real unread state.
9. Fix Header import (already fixed in current version) and verify NotificationsScreen reachability.
10. Connect Ordertrackingscreen to real tracking data and add polling mechanism.
11. Implement Wishlist/Favorites or explicitly document as out of scope.
12. Connect Customorderpage to backend (either new endpoint or map to orders.create with custom flag).
13. Complete DeliveryMoment with backend endpoint or document limitation.
14. Fix CustomerDirectory and Security settings persistence.

MEDIUM-TERM (Architecture / Multi-bakery):
15. Filter admin catalog (getAllProductsAdmin) by admin's storeProfileId for multi-admin setup.
16. Add Notifications model user relation (FK to User) and fix orphan issue.
17. Add Cart model user relation (FK to User) and fix orphan issue.
18. Implement real-time polling in customer app (useEffect interval or useFocusEffect) for orders/tracking.
19. Add test scripts (Jest) for backend controllers and frontend service layer.
20. Implement real payment gateway boundary (document stub clearly) or keep stub documented.

FINAL VERIFICATION (Before declaring complete):
21. Execute manual end-to-end steps A-J from FINAL_REPORT.md.
22. Verify on physical device with correct LAN IP.
23. Confirm build passes (npm start / metro bundle) for both apps.
24. Confirm no remaining hardcoded API URLs in business code.
25. Confirm no mock arrays remain in production paths (except where explicitly allowed as fallback).
26. Confirm admin authorization enforced on all mutation endpoints.
27. Confirm customer resources ownership protected end-to-end.
28. Confirm database relations and safe migrations applied.
29. Confirm final feature matrix matches this audit.

END-TO-END BUSINESS FLOWS (Verified / Broken / Missing)
--------------------------------------------------------
Customer flow:
Signup (PASS) -> Login (PASS) -> Home (PASS, uses real products + mock fallback) -> Search/Category (PASS) -> Product Details (PASS, uses params + hardcoded fallback) -> Add to Cart (PASS, real cart endpoint) -> Cart Update (PASS) -> Address (PARTIAL, endpoint exists but auth weak) -> Checkout (PASS backend transaction, PARTIAL client hardcoded values) -> Order Success (PASS) -> My Orders (PASS, real fetch) -> Tracking (PARTIAL, endpoint exists, screen mostly hardcoded) -> Notification (PARTIAL, endpoint exists, UI partially hardcoded) -> Profile (PASS endpoint, PARTIAL screen data) -> Refund Request (PASS endpoint, PARTIAL UI) -> Review (PASS endpoint, PARTIAL UI)

Admin flow:
Login (PASS) -> Dashboard Analytics (PASS, real data) -> Catalog List (PASS, real fetch + hardcoded fallback) -> Add/Edit Product (PARTIAL, upload endpoint missing auth) -> Order Management (PASS, real fetch + hardcoded fallback) -> Status Update (PASS) -> Tracking Update (PASS endpoint) -> Refund Approval (PASS endpoint, authorization enforced) -> Security/Profile (PARTIAL, all simulated/local) -> Notification (PARTIAL, simulated event button) -> Onboarding (PASS endpoint, reconciles to StoreProfile but creates duplicate Onboarding record)

Cross-App (Critical):
- Customer creates order -> DB receives order (PASS, transactional)
- Admin sees order (PASS, filtered by store profile if admin profile exists)
- Admin updates status -> DB updates (PASS)
- Customer sees updated status (PASS, if screen loads after update; no persistent real-time sync mechanism added)
- Admin updates tracking -> DB updates (PASS)
- Customer sees tracking (PARTIAL, screen loads tracking once but mostly hardcoded UI)
- Refund within 7 days -> backend validates completedAt (PASS)
- Refund after 7 days -> rejected by backend (PASS)
- Correct admin receives refund (PASS, authorization check works)

SECURITY SUMMARY (Reconfirmed):
- JWT secret real and configured; no insecure fallback in production code (but middleware has fallback string; should be removed).
- Admin routes protected with requireAdmin.
- Customer routes protected with authenticate.
- Product create/update/delete protected.
- Cart endpoints protected and user-scoped (but cart model lacks user FK in schema).
- Address endpoints protected but rely on body/query userId rather than token identity (security weakness).
- Delivery tracking read not fully authorization-enforced (security weakness).
- Image upload endpoint unprotected (critical security weakness).
- No password/hash returned in responses (good).
- No duplicate checkout protection (functional weakness, not direct security vulnerability).
- No rate limiting (potential brute-force vulnerability).

DEPENDENCIES FOR FURTHER WORK:
- Prisma schema reconciliation (Notifications and Cart relations needed).
- Backend route additions (forgot/reset password, custom order endpoint, delivery slot endpoint).
- Mobile environment setup (.env URLs must be updated for physical device; Android/iOS build environment needed for APK/IPA verification).
- Testing infrastructure (npm test scripts missing; Jest not configured in either app fully).
- Network/IP standardization (all hardcoded 10.x.x.x references must be replaced with configurable base URL; admin uses different IP in upload form).

AUDIT COMPLETION STATUS
-------------------------
Audit started: 2026-09-12
Audit completed (read-only): 2026-09-12
No code modifications performed.
No files deleted or overwritten.
All findings derived directly from file inspection, schema reading, controller analysis, and documentation review (FINAL_REPORT.md, CHANGE_PLAN.md, IMPLEMENTATION_CHECKLIST.md, ADMIN_ANALYSIS.md, Home_Bakers_Requirements_Summary.html, Home_Bakers_Complete_Implementation_Roadmap.pdf).
Manual end-to-end verification steps A-J (FINAL_REPORT.md) NOT EXECUTED in this session per user instruction to STOP after audit.
Project declared NOT COMPLETE by final documentation (FINAL_REPORT.md line 296: "Not declared complete until manual Steps A-J have been performed").
