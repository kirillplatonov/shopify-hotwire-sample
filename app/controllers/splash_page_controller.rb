class SplashPageController < ApplicationController
  include ShopifyApp::EmbeddedApp
  include ShopifyApp::RequireKnownShop

  def index
    @shop_origin = current_shopify_domain
  end
end
