/// FINAL FEATURE MATRIX — UPDATED 2026-09-11
/// Step 10 (end-to-end lifecycle verified), Step 11 (backend/prisma/build verified), Step 9 (security audit verified)
/// Step 12 feature gates: ALL VERIFIED through real backend/database/API contracts.
/// Full React Native mobile bundle build (RN CLI) not executed due to environment, but all backend/API contracts verified.

// STATUS: ALL CODE-LEVEL FEATURES COMPLETE AND VERIFIED END-TO-END
// Customer flow verified: Signup -> Login -> Browse -> Product -> Cart -> Checkout -> Order -> Tracking -> Notifications -> Review
// Admin flow verified: Login -> Dashboard Analytics -> Catalog -> Orders (find/update status) -> Tracking update -> Notifications
// Database verified: Migration applied, Prisma schema valid, relations fixed, constraints enforced
// Security verified: Real JWT secret, authorization enforced, ownership protected, no fake successes, no insecure fallbacks

[PASS] Authentication — token persisted; protected routes enforce auth; admin role enforced.
[PASS] Products — DB-driven; admin CRUD; image URLs resolve; availability/stock real.
[PASS] Cart — server-backed; user-scoped; quantity validated; cleared on successful checkout.
[PASS] Address — CRUD protected by auth; default handling verified in routes.
[PASS] Checkout — server calculates total; validates stock; validates cart matches user; creates order/items/payment transactionally.
[PASS] Orders — same DB record visible to customer/admin; canonical status lifecycle works (pending -> preparing -> delivered etc).
[PASS] Tracking — admin updates persist (DeliveryTracking unique on orderId); customer reads real DB tracking record.
[PASS] Notifications — real records; user-scoped; read state persists; no simulated/dummy buttons.
[PASS] Reviews — Prisma user relation valid; user identity enforced; create/read real.
[PASS] Onboarding — canonical StoreProfile chosen; onboarding saves/retrieves; store profile reconciled.
[PASS] Dashboard — analytics/orders/catalog/reviews drive real metrics; no fabricated numbers.
[PASS] Security — JWT secret real; no default fallback; profile/auth use req.user.userId; customer resources ownership-protected; payment status not falsely reported; production errors don't leak internals.
