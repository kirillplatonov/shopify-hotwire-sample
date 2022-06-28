import { Turbo } from "@hotwired/turbo-rails";
import { getSessionToken } from "@shopify/app-bridge-utils";
import createApp from '@shopify/app-bridge';
import { setupRedirectHandler } from './navigation'

document.addEventListener('DOMContentLoaded', () => {
  const shopifyAppInit = document.getElementById('shopify-app-init')
  if (!shopifyAppInit) { return }
  var data = shopifyAppInit.dataset;
  if (data.forceIframe === "false") { return }

  window.app = createApp({
    apiKey: data.apiKey,
    host: data.host,
    forceRedirect: true,
  });

  // Append Shopify's JWT to every Turbo request
  document.addEventListener('turbo:before-fetch-request', async (event) => {
    event.preventDefault()

    window.sessionToken = await retrieveToken();
    event.detail.fetchOptions.headers['Authorization'] = `Bearer ${window.sessionToken}`

    event.detail.resume()
  })

  // Redirect to the requested page
  Turbo.visit(data.loadPath, { action: "replace" });

  document.addEventListener("turbo:load", () => {
    const shopifyAppInit = document.getElementById('shopify-app-init')
    if (!shopifyAppInit) { return }
    const data = shopifyAppInit.dataset;
    const jwtExpireAt = data.jwtExpireAt;

    if (window.sessionToken && jwtExpireAt) {
      // Convert jwtExpireAt to milliseconds
      window.jwtExpireAt = jwtExpireAt * 1000;
    }
  });

  setupRedirectHandler()
});

export async function retrieveToken() {
  if (window.sessionToken && window.jwtExpireAt && window.jwtExpireAt > Date.now()) {
    const diff = parseInt((window.jwtExpireAt - Date.now()) / 1000) + 's';
    console.log('[shopify_app] Reusing token. Expires in:', diff);
    return window.sessionToken;
  } else {
    console.log('[shopify_app] Get new token');
    return await getSessionToken(window.app);
  }
}

// Force redirect via turbo using turbo_redirect_to helper in controller.
// Mandatory for Safari since it's loosing JWT token during 302 redirect.
document.addEventListener("turbo:before-fetch-response", (event) => {
  const response = event.detail.fetchResponse;
  const status = response.statusCode;
  const location = response.header("Location");

  if (status === 200 && location !== null) {
    event.preventDefault();
    Turbo.visit(location);
  }
});
