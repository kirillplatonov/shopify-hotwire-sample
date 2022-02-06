import { Controller } from "@hotwired/stimulus"
import { Redirect } from "@shopify/app-bridge/actions";

export default class extends Controller {
  static values = {
    url: String
  }

  connect() {
    if (!window.app) {
      return
    }

    this.appBridgeRedirect(this.urlValue)
  }

  appBridgeRedirect(url) {
    const normalizedLink = document.createElement("a");
    normalizedLink.href = url;

    window.app.dispatch(
      Redirect.toRemote({
        url: normalizedLink.href
      })
    );
  }
}
