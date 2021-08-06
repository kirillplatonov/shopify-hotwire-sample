import { Turbo } from "@hotwired/turbo-rails"
import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

window.Turbo = Turbo
Rails.start()
window.Rails = Rails
ActiveStorage.start()

Rails.delegate(document, Rails.linkDisableSelector,   "turbo:before-cache", Rails.enableElement)
Rails.delegate(document, Rails.buttonDisableSelector, "turbo:before-cache", Rails.enableElement)
Rails.delegate(document, Rails.buttonDisableSelector, "turbo:submit-end", Rails.enableElement)

Rails.delegate(document, Rails.formSubmitSelector, "turbo:submit-start", Rails.disableElement)
Rails.delegate(document, Rails.formSubmitSelector, "turbo:submit-end", Rails.enableElement)
Rails.delegate(document, Rails.formSubmitSelector, "turbo:before-cache", Rails.enableElement)

import "shopify_app"
