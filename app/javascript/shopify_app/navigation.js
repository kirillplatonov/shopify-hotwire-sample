import { Redirect } from '@shopify/app-bridge/actions'

export function setupRedirectHandler() {
  app.subscribe(Redirect.Action.APP, (redirectData) => {
    const urlParams = new URLSearchParams(location.search)
    const shop = urlParams.get('shop')

    const url = new URL(location.origin + redirectData.path)
    url.searchParams.set('shop', shop)

    console.log('[shopify_app] Redirecting to:', url.toString())
    Turbo.visit(url)
  })
}
