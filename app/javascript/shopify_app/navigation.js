import { Redirect } from '@shopify/app-bridge/actions'
import { debounce } from 'debounce'

function appRedirectHandler(redirectData) {
  const urlParams = new URLSearchParams(location.search)
  const shopifyAppInit = document.getElementById("shopify-app-init")
  let shop = urlParams.get('shop')

  // Fallback when shop param is missing
  if (!shop && shopifyAppInit) {
    shop = shopifyAppInit.dataset.shopOrigin
  }

  const url = new URL(location.origin + redirectData.path)
  url.searchParams.set('shop', shop)
  url.searchParams.set('embedded', 1)

  console.log('[shopify_app] Redirecting to:', url.toString())
  Turbo.visit(url)
}

export function setupRedirectHandler() {
  app.subscribe(Redirect.Action.APP, debounce(appRedirectHandler, 200))
}
