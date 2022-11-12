class SplashPageController < ApplicationController
  include ShopifyApp::EmbeddedApp
  include ShopifyApp::RequireKnownShop
  include ShopifyApp::ShopAccessScopesVerification

  # required to trigger OAuth token check
  rescue_from ShopifyAPI::Errors::HttpResponseError do |exception|
    if exception.code == 401
      redirect_to(shop_login)
    else
      raise exception
    end
  end

  def index
    @shop_origin = current_shopify_domain

    # required to trigger OAuth token check
    shop = Shop.find_by(shopify_domain: current_shopify_domain)
    shop.with_shopify_session do
      ShopifyAPI::Shop.all.first
    end
  end
end
