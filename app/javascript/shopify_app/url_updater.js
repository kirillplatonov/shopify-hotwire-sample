import { History } from '@shopify/app-bridge/actions';

function prepareParams(params) {
  // Ignores Shopify params provided after OAuth since we don't
  // need to include them in the Shopify's URL
  const shopifyParams = ['hmac', 'locale', 'new_design_language', 'session', 'shop', 'timestamp', 'host'];
  shopifyParams.forEach(param => params.delete(param));
  const paramsString = params.toString();

  if (paramsString.length > 0) {
    return `?${paramsString}`;
  } else {
    return '';
  }
}

// Sync URL with Shopify
document.addEventListener("turbo:visit", (event) => {
  const url = new URL(event.detail.url);
  const params = prepareParams(url.searchParams);
  const path = url.pathname + params;
  const history = History.create(window.app);

  history.dispatch(History.Action.PUSH, path);
});
