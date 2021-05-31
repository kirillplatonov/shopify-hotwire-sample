import { Toast } from '@shopify/app-bridge/actions';

document.addEventListener("turbo:load", (event) => {
  if (!window.app) { return }

  const shopifyAppFlash = document.getElementById('shopify-app-flash')
  if (!shopifyAppFlash) { return }
  const flashData = JSON.parse(shopifyAppFlash.dataset.flash);

  if (flashData.notice) {
    flashNotice(flashData.notice);
  }

  if (flashData.error) {
    flashError(flashData.error);
  }
});

export function flashNotice(message) {
  Toast.create(window.app, {
    message: message,
    duration: 5000,
  }).dispatch(Toast.Action.SHOW);
}

export function flashError(message) {
  Toast.create(window.app, {
    message: message,
    duration: 5000,
    isError: true,
  }).dispatch(Toast.Action.SHOW);
}
