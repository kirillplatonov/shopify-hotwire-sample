import { Redirect } from '@shopify/app-bridge/actions'

export function setupRedirectHandler() {
  app.subscribe(Redirect.Action.APP, (redirectData) => {
    const urlParams = new URLSearchParams(location.search)
    let shop = urlParams.get('shop')
    
    // workaround for urlParams sometimes missing 'shop'
    if (shop == null) {
      const shopifyAppInit = document.getElementById("shopify-app-init");
      if (!shopifyAppInit) {
        return;
      }
      shop = shopifyAppInit.dataset.shopOrigin;
    }

    const url = new URL(location.origin + redirectData.path)
    url.searchParams.set('shop', shop)

    console.log('[shopify_app] Redirecting to:', url.toString())
    Turbo.visit(url)
  })
}
