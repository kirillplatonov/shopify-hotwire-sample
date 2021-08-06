class SplashPageController < ApplicationController
  include ShopifyApp::ShopHost
  include ShopifyApp::EmbeddedApp
  include ShopifyApp::RequireKnownShop
  include ShopifyApp::ShopAccessScopesVerification

  # required to trigger OAuth token check
  rescue_from ActiveResource::UnauthorizedAccess do
    redirect_to(shop_login)
  end

  def index
    @shop_origin = current_shopify_domain

    # required to trigger OAuth token check
    shop = Shop.find_by(shopify_domain: current_shopify_domain)
    shop.with_shopify_session do
      ShopifyAPI::Shop.current
    end
  end
end
