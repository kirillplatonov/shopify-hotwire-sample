import { Toast } from "@shopify/app-bridge/actions";

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
