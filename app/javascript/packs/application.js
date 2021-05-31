import { Turbo } from "turbo-rails-edge"
import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

window.Turbo = Turbo
Rails.start()
window.Rails = Rails
ActiveStorage.start()

import "shopify_app"
