import { Controller } from "@hotwired/stimulus"
import { flashNotice, flashError } from "../shopify_app/flash_messages"

export default class extends Controller {
  connect() {
    if (!window.app) {
      return
    }
    const flashData = JSON.parse(this.element.dataset.flash)

    if (flashData.notice) {
      flashNotice(flashData.notice)
    }

    if (flashData.alert) {
      flashError(flashData.alert)
    }
  }
}
