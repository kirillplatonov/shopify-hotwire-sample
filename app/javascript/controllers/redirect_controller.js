import { Controller } from "@hotwired/stimulus"
import { Redirect } from "@shopify/app-bridge/actions"

export default class extends Controller {
  initialize () {
    this.appBridgeRedirect = Redirect.create(window.app)
  }

  admin(event) {
    event.preventDefault()

    if (this.newWindow) {
      this.appBridgeRedirect.dispatch(Redirect.Action.ADMIN_PATH, {
        url: this.url,
        newContext: true
      })
    } else {
      this.appBridgeRedirect.dispatch(Redirect.Action.ADMIN_PATH, this.url)
    }
  }

  remote(event) {
    event.preventDefault()

    if (this.newWindow) {
      this.appBridgeRedirect.dispatch(Redirect.Action.REMOTE, {
        url: this.url,
        newContext: true
      })
    } else {
      this.appBridgeRedirect.dispatch(Redirect.Action.REMOTE, this.url)
    }
  }

  get url() {
    return this.element.getAttribute('href')
  }

  get newWindow() {
    return this.element.getAttribute('target') === '_blank'
  }
}
