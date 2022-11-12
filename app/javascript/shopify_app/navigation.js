import { Redirect } from '@shopify/app-bridge/actions'
import { debounce } from 'debounce'

function appRedirectHandler(payload) {
  const shopifyAppInit = document.getElementById('shopify-app-init')
  const shop = shopifyAppInit.dataset.shopOrigin
  const host = shopifyAppInit.dataset.host
  let path = payload.path

  if (path === '/' || path.startsWith('/?appLoadId=')) {
    path = shopifyAppInit.dataset.loadPath
  }

  console.log(payload)

  const url = new URL(location.origin + path)
  url.searchParams.set('shop', shop)
  url.searchParams.set('host', host)

  console.log('[shopify_app] Redirecting to:', url.toString())
  Turbo.visit(url)
}

export function setupRedirectHandler() {
  app.subscribe(Redirect.Action.APP, debounce(appRedirectHandler, 200))
}
