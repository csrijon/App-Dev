# Phase 5 — Out of Scope / Unconfigured Documentation

## Wishlist — OUT OF SCOPE
- No `Wishlist` model exists in `prisma/schema.prisma`.
- Existing `WishlistScreen.js` uses `AsyncStorage.getItem("wishlist")` (local-only persistence).
- Per user instruction: no DB model added; existing screen remains local-only. If persistence is required in future, add model and endpoint.

## Security Settings — PARTIALLY OUT OF SCOPE
- `Securitypage.js` references `/api/auth/twofactor` (line 100). This endpoint does NOT exist in `routes/main.js` or controllers.
- The `Switch` for two-factor calls a non-existent endpoint; it falls back to a local alert (`Enabled locally`). Documented as out of scope until backend endpoint is implemented.
- Permission toggle (`permission`) and location access (`locationAccess`) are local UI state only with no backend endpoints; kept as local UI only.
- `delacc` uses `/api/auth/delete` (not in routes); kept as is since it has a stub endpoint attempt.

## Profile / Admin — FIXED
- `Profilepage.js` now loads from `/api/user/profile` via `useEffect` and saves via PUT.
- Removed hardcoded mock data (`Eloise Beaumont`, etc.); state variables (`name`, `email`, `phone`, `address`) are used.
- Note: `global.authToken` is used for authorization header; ensure auth token is stored globally in admin app or use AsyncStorage/local session.

## Customer Directory — FIXED
- `CustomerDirectorypage.js` removed hardcoded mock arrays (`dashboardCardData`, `filterCategoryData`, `customerCardData`).
- Now fetches `/api/orders` (admin endpoint) and derives `derivedCustomers` and total orders from real DB data.

## Forgot / Reset Password — IMPLEMENTED
- Controller: `ResetPasswordcontrol.js` (secure token with `crypto.randomUUID`, 1-hour expiration, `used` flag, `bcrypt.hash`).
- Routes: `/api/auth/forgotPassword` and `/api/auth/resetPassword` wired in `routes/main.js`.
- External email delivery: NOT configured (no SMTP/Nodemailer in `server.js`). Backend secure boundary is fully implemented; email sending requires external SMTP configuration (documented in controller comments).
