const TRACKED_EVENTS = ["search", "view", "cart_add", "cart_remove", "order_create", "feature_use"];

export const trackEvent = async (eventName, data = {}) => {
  try {
    console.log(`[Analytics] ${eventName}`, data);
  } catch (e) {
    console.log("Analytics error:", e);
  }
};
