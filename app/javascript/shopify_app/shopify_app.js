import { Turbo } from "@hotwired/turbo-rails";
import { getSessionToken } from "@shopify/app-bridge-utils";

document.addEventListener('DOMContentLoaded', () => {
  var data = document.getElementById('shopify-app-init').dataset;
  var AppBridge = window['app-bridge'];
  var createApp = AppBridge.default;
  window.app = createApp({
    apiKey: data.apiKey,
    shopOrigin: data.shopOrigin,
  });

  // Redirect to the requested page
  Turbo.visit(data.loadPath);
});

// Intercept every Turbo request and load Shopify session token
Turbo.setRequestInterceptor(async (request) => {
  const token = await getSessionToken(window.app);
  request.addHeader("Authorization", `Bearer ${token}`);
});
