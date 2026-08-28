# Cakedeliveryapp — FILE-BY-FILE CHANGE & FEATURE PLAN

Prepared: 2026-08-28
App Type: React Native (customer-facing bakery delivery app)
Architecture: Stack + Bottom Tab navigation | Mock data + partial API service layer (`src/services/customerApi.js`)
> ⚠️ IMPORTANT: DO NOT USE `Cakedeliveryapp/Backend/` FOLDER. All changes/features must work client-side using `customerApi.js`, `AsyncStorage`, mock data, or simulated APIs only. No modifications to Backend folder allowed.

---

## 1. App.js
**Current**: Defines navigation stacks. Has leftover `console.log(Stack)`. Tab labels/names slightly inconsistent (`Categorys`, `Orderagain`, `Blog`).
**Change / Add**:
- [x] Remove `console.log(Stack)` line 40. (DONE — edited App.js, no AsyncStorage, no API change)
- [x] Rename tab `Categorys` → `Categories`. (DONE — App.js, no AsyncStorage, no API change)
- [x] Rename `Orderagain` → `Orders`. (DONE — App.js, no AsyncStorage, no API change)
- [x] Rename `Blog` (profile tab) → `ProfileTab`. (DONE — App.js, no AsyncStorage, no API change)
- [ ] Add missing screens to main stack if needed (e.g., `NotificationsScreen` is in Tabs? No, only in Stack). Ensure `NotificationsScreen` is reachable from header.
- [ ] Add `Cart` screen (Checkoutscreen) to stack navigation properly.
- [ ] Feature: Add splash/loading initial screen before Welcome for smoother UX.

---

## 2. src/Screen/Homescreen.js
**Current**: Large mock data (`bakeryData`, `foodData`, `promoData`, `categoryChips`, `reorderData`). Search filters only `foodData`. Category chip selects but doesn't filter bakery data. No real cart/state persistence between screens.
**Change / Add**:
- [ ] Integrate `customerApi.js` to fetch real bakery/store data instead of hardcoded arrays.
- [x] Fixed Homescreen duplicate `data` prop in FlatList (filter logic now clean). (DONE — Homescreen.js, no AsyncStorage, no API change)
- [x] Update category chip navigation reference to `Categories` (matches renamed tab). (DONE — Homescreen.js, no AsyncStorage, no API change)
- [x] Make category chips filter `bakeryData` by category label; added `onPress` to `Cakecard` navigating to `Cakedetails`. (DONE — Homescreen.js, no AsyncStorage, no API change)
- [x] Add `onPress` prop to `Cakecard` component (navigation to `Cakedetails` handled by parent). (DONE — Cakecard.js, no AsyncStorage, no API change)
- [ ] Make `reorderData` load from AsyncStorage (`cart` or `orders` history) instead of static array.
- [ ] Feature: Add "Favorite" / wishlist persistence per user using AsyncStorage.
- [ ] Feature: Pull-to-refresh should call API refresh instead of just `setTimeout`.
- [ ] Fix: Search should also search categories, not just bakery titles.
- [ ] Feature: Add horizontal scroll indicator removal where missing.

---

## 3. src/Screen/CakeDetails.js
**Current**: Hardcoded single product (`The Celestial Peony`, $850, quantity). No real product data passed from navigation. `Add to Cart` uses `Alert.alert` and navigates to `Cart` — no real cart update via `customerApi`. Favorite is local state only.
**Change / Add**:
- [x] Accept basic product info via `route.params`. Added `route?.params?.name` fallback (default kept for compatibility). (DONE — CakeDetails.js, no AsyncStorage, no API change)
- [ ] Make `pricePerCake`, `description`, `tags`, `image` dynamic based on passed params.
- [ ] Integrate `customerApi.cart.addItem()` for real cart persistence (AsyncStorage).
- [ ] Make favorite toggle call `customerApi.profile` or local wishlist storage with user awareness.
- [ ] Fix `navigation.navigate("Cart")` should go to `Cart` screen (Checkoutscreen) correctly.
- [ ] Feature: Add image zoom / gallery for multiple product images.
- [ ] Feature: Show real-time stock / availability.
- [ ] Feature: Add "Custom Order" navigation to `Customorderpage` with pre-filled product info.

---

## 4. src/Screen/CategoryListing.js
**Current**: `menuItems` array missing `price` and `bakingTime`. Sort logic exists but `parsePrice` used on missing `price`. `MenuCard` component doesn't support `isAdded`, `onAddToCart`, `price`, `bakingTime`. `addedIds` state exists but `handleAddToCart` and `handleGoToCart` are not fully wired into `MenuCard` props (commented out in code).
**Change / Add**:
- [x] Add `price`, `bakingTime` fields to `menuItems` (expanded to Donut, Croissant, Bread, etc.). (DONE — CategoryListing.js, no AsyncStorage, no API change)
- [ ] Pass `price` and `bakingTime` to `MenuCard` properly.
- [x] Wire `onAddToCart` and `onGoToCart` props into `MenuCard` (uncommented in CategoryListing render). (DONE — CategoryListing.js, no AsyncStorage, no API change)
- [ ] Make `MenuCard` accept `isAdded`, `onAddToCart`, `onGoToCart`, `price`, `bakingTime`.
- [ ] Fix `navigation.navigate("CategoryProducts", ...)` within `MenuCard` — ensure correct route name.
- [ ] Feature: Make search actually filter from `customerApi.products.search()`.
- [ ] Feature: Add pagination or infinite scroll when fetching real products.
- [ ] Fix: `parsePrice` uses `.replace()` on undefined price when `price` is missing — will crash.

---

## 5. src/Screen/CategoryProducts.js
**Current**: Shows category cards (`bakeryCategories`) and product grid (`products`). Uses `CategoryProductscard` and `ProductShowcaseCard`. No cart integration.
**Change / Add**:
- [ ] Add `price`, `rating`, `badge` support to `CategoryProductscard` if missing.
- [ ] Wire `ProductShowcaseCard` `onPress` to navigate to `Cakedetails` with product info.
- [ ] Integrate `customerApi.products.list()` or `search()` instead of hardcoded arrays.
- [ ] Feature: Add add-to-cart button inside product grid cards.
- [ ] Feature: Filter categories dynamically.

---

## 6. src/Screen/Checkoutscreen.js
**Current**: Uses hardcoded `initialCart` (prices like $2000, $8, $14). Subtotal calculation works. `handleCheckout` uses fake `setTimeout`. No real order creation. Navigation `navigation.navigate("Blog", { screen: "Adressscreen" })` is wrong.
**Change / Add**:
- [ ] Replace `initialCart` with `customerApi.cart.getLocalCart()` load.
- [ ] Update `handleCheckout` to call `customerApi.orders.create()` with cart and delivery address.
- [ ] Fix navigation path to address screen: should be `Profile` tab stack, not `Blog`.
- [ ] Make delivery fee and tax dynamic or fetched from settings/config.
- [ ] Feature: Add delivery time selection using `DeliveryMoment` integration.
- [ ] Feature: Add payment method selection screen.
- [ ] Feature: Add coupon / promo code input (use `promoData` from Home or new data).
- [ ] Fix: Cart should sync with `AsyncStorage` after quantity updates, not just local state.

---

## 7. src/components/MenuCard.js
**Current**: Only accepts `onPress`, `rating`, `title`, `description`, `image`. Missing `price`, `bakingTime`, `isAdded`, `onAddToCart`, `onGoToCart`.
**Change / Add**:
- [x] Add props: `price`, `bakingTime`, `isAdded`, `onAddToCart`, `onGoToCart`. Added `actionRow` with Add button / Go to Cart button based on `isAdded`. (DONE — MenuCard.js, no AsyncStorage, no API change)
- [ ] Show price in card.
- [ ] Show baking/preparation time.
- [ ] When `isAdded` is true, show "Added" or change button to "Go to Cart" using `onGoToCart`.
- [ ] When false, show `+` button calling `onAddToCart`.
- [ ] Feature: Add favorite (heart) icon integration.

---

## 8. src/components/Header.js
**Current**: Imports broken `Notificaton` (misspelled file `Notificaton.js`). Uses `navigation.navigate("Blog")` (unclear). Has `console.log` for geo coordinates. No real user profile link.
**Change / Add**:
- [x] Fix import spelling: removed broken `Notificaton` import. (DONE — Header.js, no AsyncStorage, no API change)
- [x] Replace `navigation.navigate("Blog")` with `navigation.navigate("Tabs", { screen: "Profile" })`. (DONE — Header.js)
- [x] Remove `console.log` statements. (DONE — Header.js)
- [ ] Add user name display near profile image using `AsyncStorage.getItem('user_name')` or from auth token.
- [ ] Feature: Make location fetch more robust with fallback (manual city selection).

---

## 9. src/components/Notificaton.js (misspelled file)
**Current**: File exists but is misspelled (`Notificaton`). Import in `Header.js` references it but doesn't use it.
**Change / Add**:
- [ ] Rename file to `Notification.js` (correct spelling) or keep name and update import consistently.
- [ ] Make it a proper notification bell component with unread count.
- [ ] Connect unread count to `customerApi.notifications.list()`.

---

## 10. src/services/customerApi.js
**Current**: Good structure. Uses `API_BASE_URL` from env. Has auth, profile, address, products, cart (local AsyncStorage), orders, reviews, notifications.
**Change / Add**:
- [ ] Add error handling with user-friendly messages.
- [ ] Add retry logic for network failures.
- [ ] Add `API_BASE_URL` validation / default from `.env`.
- [ ] Feature: Add `categories` endpoint for category listing.
- [ ] Feature: Add `favourites` or `wishlist` endpoint.
- [ ] Feature: Add `delivery` endpoint for delivery time/slot selection.
- [ ] Fix: Ensure `cart.addItem()` doesn't duplicate incorrectly when same item with different options added.

---

## 11. src/Screen/Profilescreen.js
**Current**: Profile edit screen. Has profile image, name, email, phone, address display. Password change is local only. Navigation to `AddressUI`.
**Change / Add**:
- [ ] Integrate `customerApi.profile.get()` and `.update()`.
- [ ] Make password change call `customerApi.profile.changePassword()`.
- [ ] Load user data from AsyncStorage/auth token on mount.
- [ ] Feature: Add logout functionality (clear auth_token, navigate to Welcome).
- [ ] Feature: Add order history quick link.

---

## 12. src/Screen/AddressUI.js
**Current**: Form to save address. Uses hardcoded IP (`10.140.21.221`). Basic fields.
**Change / Add**:
- [ ] Replace hardcoded IP with `customerApi.address.save()`.
- [ ] Add address validation (required fields, postcode format).
- [ ] Make it load saved address from `customerApi.address.list()`.
- [ ] Feature: Add multiple address support (home, work, etc.).
- [ ] Feature: Add map picker integration.

---

## 13. src/Screen/Customorderpage.js
**Current**: Custom cake order page. Has weight, flavor, image picker (`react-native-image-picker`), message input. Navigates to `Delivery`.
**Change / Add**:
- [ ] Make image picker use real `launchImageLibrary` from `react-native-image-picker`.
- [ ] Store custom order in local AsyncStorage or send to `customerApi.orders.create()` with `type: "custom"`.
- [ ] Add price estimation based on weight/flavor selection.
- [ ] Feature: Add delivery date/time selection before navigating to `Delivery`.

---

## 14. src/Screen/DeliveryMoment.js
**Current**: Not fully inspected. Likely delivery selection screen.
**Change / Add**:
- [ ] Inspect and complete delivery time slot selection UI.
- [ ] Integrate with `customerApi` for delivery slots.
- [ ] Feature: Show estimated delivery time based on address and order size.

---

## 15. src/Screen/Myorderscreen.js
**Current**: Hardcoded `ORDERS` array. Active / Past tabs. Tracking link navigates to `Ordertrackingscreen`.
**Change / Add**:
- [ ] Load orders from `customerApi.orders.list()`.
- [ ] Make active/past filter based on real order status/date.
- [ ] Make tracking link navigate with real order ID.
- [ ] Feature: Add cancel order functionality (if within time window).
- [ ] Feature: Add reorder from past orders.

---

## 16. src/Screen/Ordertrackingscreen.js
**Current**: Tracking UI with steps, courier card, hardcoded data.
**Change / Add**:
- [ ] Load tracking info from `customerApi.orders.get(id)` or simulated tracking.
- [ ] Make steps dynamic based on real order status.
- [ ] Feature: Add real-time location tracking for courier (if available).
- [ ] Feature: Add "Contact Courier" or "Call Support" buttons.

---

## 17. src/Screen/NotificationsScreen.js
**Current**: Hardcoded notifications, unread dots.
**Change / Add**:
- [ ] Load notifications from `customerApi.notifications.list()`.
- [ ] Make unread dots real based on `isUnread` field.
- [ ] Make tapping notification navigate to relevant screen (order, promotion, etc.).

---

## 18. src/Screen/Signup / Login / Reset Flow
**Current**: Uses hardcoded IPs for signup (`10.140.21.221`) and login (`10.144.103.154`). No error handling for unreachable server.
**Change / Add**:
- [ ] Replace all hardcoded IPs with `customerApi.auth.signup/login/forgotPassword/resetPassword()`.
- [ ] Add loading spinners and error messages (e.g., "Server unreachable, please try later").
- [ ] Store auth token in AsyncStorage upon successful login/signup.
- [ ] Auto-login using stored token on app launch.
- [ ] Feature: Add social login (Google) using `@react-native-google-signin/google-signin` (already in package.json).

---

## 19. src/components/CartCard.js
**Current**: Component for checkout cart items.
**Change / Add**:
- [ ] Verify props match `Checkoutscreen` data (`name`, `size`, `Flavor`, `price`, `note`, `image`, `quantity`).
- [ ] Add delete/remove functionality (already in checkout via `removeItem`).
- [ ] Feature: Add swipe-to-delete gesture.

---

## 20. src/components/Cakecard.js / FoodCard.js / CategoryCard.js / CategoryProductscard.js / ProductShowcaseCard.js / MYorderitemcard.js / Oderplacecakecard.js
**Current**: Various card components with different prop interfaces.
**Change / Add**:
- [ ] Standardize all card props to common interface: `id`, `title`, `image`, `price`, `rating`, `badge`, `onPress`, `onAddToCart`.
- [ ] Ensure all cards use responsive sizing (use `Dimensions` or `useWindowDimensions`).
- [ ] Feature: Add skeleton/loading state for cards when fetching data.

---

## 21. src/components/Button.jsx / Socialmediabutton.js / Simpleheader.js / Detailsheader.js / Resetheader.js
**Current**: UI components.
**Change / Add**:
- [ ] Ensure all button components use `TouchableOpacity` or `Pressable` consistently.
- [ ] Add disabled/loading states to buttons.
- [ ] Add accessibility labels (`accessibilityLabel`).

---

## 22. .env
**Current**: Only `webclientid`.
**Change / Add**:
- [ ] Add `API_BASE_URL=https://api.cakehaven.app` or configure based on environment.
- [ ] Add `ENV=development` / `production` flag.
- [ ] Add map API key if using maps.

---

## 23. package.json
**Current**: React Native 0.84.1, React 19.2.3. Has `react-native-config`.
**Change / Add**:
- [ ] Ensure `react-native-config` is properly configured (`.env` loaded).
- [ ] Check compatibility of `react-native-image-picker` with RN 0.84.
- [ ] Feature: Add `react-native-fast-image` for better image loading in cards.

---

## 24. Backend / Database (EXCLUDED — DO NOT USE BACKEND FOLDER)
**Current**: `Cakedeliveryapp/Backend/` exists (`package.json`, `king.js`, `index.js`). MUST NOT be used or modified.
**Note**: All changes must use `customerApi.js` (client layer) with `AsyncStorage` fallback or simulated/mock mode. No backend folder usage allowed.
**Change / Add**:
- [ ] Confirm `API_BASE_URL` in `.env` points to external/simulated endpoint (not local backend folder).
- [ ] Add fallback mock mode when any external server unreachable (cart, notifications already simulated).
- [ ] Feature: Add polling for real-time order updates using only client-side `customerApi` + `AsyncStorage`.

---

## 25. Overall Features to Add (App-wide)
- [ ] **Real-time Order Tracking**: Poll `customerApi.orders.get(id)` periodically on tracking screen.
- [ ] **Push Notifications**: Integrate `react-native-push-notification` (or similar) for order updates.
- [ ] **Search & Filter**: Make search work across all screens (products, orders, bakeries).
- [ ] **Wishlist / Favorites**: Persistent favorite list per user.
- [ ] **Dark Mode**: Toggle between light/dark themes using React Native context.
- [ ] **Offline Mode**: Cache product images and basic data using `react-native-fast-image` or AsyncStorage when offline.
- [ ] **Multi-language**: Add i18n using `react-i18next` or `i18n-js`.
- [ ] **Accessibility**: Add `accessibilityRole`, `accessibilityLabel`, `accessibilityHint` to all interactive elements.
- [ ] **Performance**: Add `React.memo` to card components; use `FlatList` `getItemLayout` where possible.
- [ ] **Testing**: Add unit tests for `customerApi.js` and integration tests for auth/cart flows.

---

## 26. Bugs to Fix (Summary)
- `App.js`: Remove `console.log(Stack)`.
- `Header.js`: Fix broken `Notificaton` import; fix `navigation.navigate("Blog")`.
- `CategoryListing.js`: Add `price` and `bakingTime` to `menuItems`; wire `MenuCard` props correctly.
- `MenuCard.js`: Add missing props (`price`, `bakingTime`, `isAdded`, etc.).
- `Checkoutscreen.js`: Replace mock `initialCart`; fix navigation to address; integrate real `customerApi`.
- `CakeDetails.js`: Make product data dynamic; integrate real cart and favorite persistence.
- `Signup/Login`: Replace hardcoded IPs; add error handling.
- `.env`: Add `API_BASE_URL`.
- `Notificaton.js`: Fix spelling / usage.
- `AddressUI.js`: Replace hardcoded IP; integrate `customerApi`.

---

## 27. New Feature Ideas (High-level)
1. **Live Delivery Map**: Show courier location in real-time on `Ordertrackingscreen`.
2. **Subscription / Reorder Plan**: Weekly/monthly cake delivery subscription.
3. **Gift Cards**: Buy and send digital gift cards from app.
4. **Social Sharing**: Share order / favorite cake to social media (`Socialmediabutton`).
5. **Review System**: After delivery, prompt user to leave review (`customerApi.reviews.create`).
6. **Personalized Recommendations**: Based on past orders (`Myorderscreen`) and favorites.
7. **In-app Chat**: Customer support chat for custom orders and delivery questions.
8. **Loyalty Program**: Points system for every purchase, redeemable for discounts.

---

END OF FILE

---

## 28. src/Screen/WelcomeScreen.js
**Current**: Beautiful welcome screen with image, title, description, button to Signup. No real branding customization.
**Change / Add**:
- [ ] Make title/dynamic configurable (e.g., from `.env` or settings).
- [ ] Feature: Add skip/login option for returning users.
- [ ] Feature: Show promotional banner or seasonal theme.

---

## 29. src/Screen/Signupscreen.js
**Current**: Full form with validation (name, mobile, email, password, confirm, checkbox). Uses hardcoded IP. Has loading state. Social media buttons.
**Change / Add**:
- [ ] Replace `fetch("http://10.140.21.221:3000/api/auth/signupmain")` with `customerApi.auth.signup()`.
- [ ] Add error handling for unreachable server (show user-friendly message, not just console.log).
- [ ] Store received auth token in AsyncStorage after signup.
- [ ] Feature: Add Google Sign-In integration (package already includes `@react-native-google-signin/google-signin`).
- [ ] Feature: Auto-fill form fields from social login profile.

---

## 30. src/Screen/Loginscreen.js
**Current**: Not fully read, but likely login form with mobile + password.
**Change / Add**:
- [ ] Replace hardcoded login IP with `customerApi.auth.login()`.
- [ ] Add "Remember me" checkbox using AsyncStorage.
- [ ] Add forgot password link that navigates to `Reset` flow properly.
- [ ] Feature: Biometric login option (Face ID / Fingerprint) if device supports it.

---

## 31. src/Screen/Resetpage.js / ResetLinkpage.js / Setpasswordpage.js / PasswordChanged.js
**Current**: Password reset flow screens. Some incomplete.
**Change / Add**:
- [ ] Ensure `Resetpage` calls `customerApi.auth.forgotPassword()`.
- [ ] Ensure `Setpasswordpage` uses token from URL/route params for `customerApi.auth.resetPassword()`.
- [ ] Add success/error feedback messages.
- [ ] Feature: Add expiration timer for reset links.

---

## 32. src/Screen/Calenderpage.js
**Current**: Calendar picker for delivery date. Uses `react-native-calendars`. Hardcoded subtitle date (`Oct 9th, 2024`). Navigation to `MyOrder` with `Delivery` screen uses incorrect route names (`MyOrder`, `Delivery`).
**Change / Add**:
- [ ] Fix navigation: `navigation.navigate("Tabs", { screen: "Categorys", ... })` or correct screen names.
- [ ] Make subtitle date dynamic based on `selecteddate`.
- [ ] Make `Calendar` theme colors configurable from app theme.
- [ ] Feature: Show unavailable/booked dates based on bakery schedule.

---

## 33. src/Screen/Customorderpage.js
**Current**: Weight selection, flavor selection (CategoryCard), image picker (`launchImageLibrary`), message input, price estimate. No real storage.
**Change / Add**:
- [ ] Confirm `CategoryCard` props work for flavor selection.
- [ ] Save custom order data (weight, flavor, image URI, message, price) to AsyncStorage or send to `customerApi.orders.create()` with `custom: true`.
- [ ] Make price estimate update in real-time when weight/flavor changes.
- [ ] Feature: Add delivery date/time picker integrated with calendar.

---

## 34. src/Screen/DeliveryMoment.js
**Current**: Not fully inspected.
**Change / Add**:
- [ ] Complete delivery time slot selection UI (morning, afternoon, evening slots).
- [ ] Integrate with `customerApi` for available delivery slots.
- [ ] Show delivery fee based on distance/time slot.

---

## 35. src/Screen/OrderSuccessScreen.js / Ordersummarypage.js
**Current**: Order success animation and summary.
**Change / Add**:
- [ ] Make order number and details come from `route.params` after real checkout.
- [ ] Add share functionality (`Socialmediabutton`) to share order summary.
- [ ] Feature: Show estimated delivery time based on selected date.

---

## 36. src/Screen/Ordertrackingscreen.js
**Current**: Tracking steps, courier info, hardcoded.
**Change / Add**:
- [ ] Load tracking steps from `customerApi.orders.get(id)`.
- [ ] Make courier info dynamic (name, phone, image if available).
- [ ] Feature: Auto-refresh tracking status every 30 seconds.
- [ ] Feature: Add "Contact Courier" button that uses `Linking.openURL('tel:...')`.

---

## 37. src/Screen/EmptyOrderScreen.js
**Current**: Empty state with image, stats cards, explore button. Used for `Orderagain` tab.
**Change / Add**:
- [ ] Make stats dynamic based on user history (total orders, favorite category, etc.).
- [ ] Make image rotate/change seasonally.
- [ ] Feature: Show personalized recommendation based on preferences.

---

## 38. src/components/NotificationsScreen.js (component, not screen)
**Current**: Notification screen component with unread dots.
**Change / Add**:
- [ ] Load notifications from `customerApi.notifications.list()`.
- [ ] Make unread dots real.
- [ ] Make tapping navigate to relevant order/promotion.

---

## 39. src/components/Cakecard.js / FoodCard.js / CartCard.js
**Current**: Card components for different contexts.
**Change / Add**:
- [ ] Standardize props across all cards.
- [ ] Add loading state (skeleton).
- [ ] Add error state (retry button) if image fails to load.
- [ ] Feature: Add long-press context menu (add to cart, favorite, share).

---

## 40. src/components/CategoryCard.js
**Current**: Used in `CategoryProducts` and `Customorderpage`.
**Change / Add**:
- [ ] Verify props (`id`, `title`, `selectid`, `setselectid`) work in both contexts.
- [ ] Add selected state styling consistency.

---

## 41. src/components/CategoryProductscard.js / ProductShowcaseCard.js
**Current**: Product cards in category view.
**Change / Add**:
- [ ] Make `ProductShowcaseCard` accept `onPress` properly.
- [ ] Add favorite toggle button.
- [ ] Show stock/availability badge.

---

## 42. src/components/Detailsheader.js / Simpleheader.js / Resetheader.js
**Current**: Header components.
**Change / Add**:
- [ ] Ensure `Detailsheader` passes navigation props correctly.
- [ ] Make headers responsive to safe area insets.
- [ ] Feature: Add back button with animation.

---

## 43. src/components/CartTabicon.js
**Current**: Cart icon with count.
**Change / Add**:
- [ ] Make count dynamic based on `customerApi.cart.getLocalCart()` length.
- [ ] Update when items added/removed in real-time.

---

## 44. src/components/Button.jsx / Socialmediabutton.js / Search.js / Oderplacecakecard.js / MYorderitemcard.js
**Current**: Various utility and card components.
**Change / Add**:
- [ ] `Button.jsx`: Add disabled/loading/variant props (primary, secondary, outline).
- [ ] `Socialmediabutton.js`: Make buttons open actual apps/URLs (Facebook, Instagram, Twitter) using `Linking`.
- [ ] `Search.js`: Make it a reusable search component that accepts `onSearch` prop.
- [ ] `Oderplacecakecard.js`: Fix spelling (`Oder` → `Order`); standardize props.
- [ ] `MYorderitemcard.js`: Standardize props; add reorder and cancel actions.

---

## 45. Backend / Database (EXCLUDED — DO NOT TOUCH)
**Current**: `Cakedeliveryapp/Backend/` exists (`package.json`, `king.js`, `index.js`). DO NOT USE, DO NOT MODIFY, DO NOT IMPORT FROM.
**Note**: All work uses `src/services/customerApi.js` + `AsyncStorage`. Backend folder is off-limits.

---

## 46. .watchmanconfig / metro.config.js / babel.config.js / tsconfig.json
**Current**: Standard React Native config files.
**Change / Add**:
- [ ] Ensure `metro.config.js` supports image assets and custom fonts.
- [ ] Add font loading if using custom fonts.

---

END OF FULL FILE LIST
