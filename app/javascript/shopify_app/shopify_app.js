import { Turbo } from "@hotwired/turbo-rails";
import { createApp } from '@shopify/app-bridge';
import { getSessionToken } from "@shopify/app-bridge-utils";

document.addEventListener('DOMContentLoaded', () => {
  const data = document.getElementById('shopify-app-init').dataset;

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

// Force redirect via turbo using turbo_redirect_to helper in controller.
// Mandatory for Safari since it's loosing JWT token during 302 redirect.
document.addEventListener("turbo:before-fetch-response", (event) => {
  const response = event.detail.fetchResponse;
  const status = response.statusCode;
  const location = response.header("Location");

  if (status === 300 && location !== null) {
    event.preventDefault();
    Turbo.visit(location);
  }
});
