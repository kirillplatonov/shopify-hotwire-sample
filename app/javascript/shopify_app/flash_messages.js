import { Toast } from '@shopify/app-bridge';

document.addEventListener("turbo:load", (event) => {
  const flashData = JSON.parse(document.getElementById('shopify-app-flash').dataset.flash);

  if (flashData.notice) {
    Toast.create(app, {
      message: flashData.notice,
      duration: 5000,
    }).dispatch(Toast.Action.SHOW);
  }

  if (flashData.error) {
    Toast.create(app, {
      message: flashData.error,
      duration: 5000,
      isError: true,
    }).dispatch(Toast.Action.SHOW);
  }
});
