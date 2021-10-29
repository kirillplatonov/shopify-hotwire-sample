// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./shopify_app"
import "./controllers"

// Polaris
import { registerPolarisControllers } from "polaris-view-components"
registerPolarisControllers(Stimulus)
