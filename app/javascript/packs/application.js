import { Turbo } from "@hotwired/turbo-rails"
import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

window.Turbo = Turbo
Rails.start()
window.Rails = Rails
ActiveStorage.start()

import "shopify_app"
