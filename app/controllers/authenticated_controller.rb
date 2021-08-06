# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::ShopHost
  include ShopifyApp::EnsureAuthenticatedLinks
  include ShopifyApp::Authenticated

  before_action :set_shop_origin

  helper_method :current_shop, :jwt_expire_at

  def current_shop
    @current_shop ||= Shop.find_by(shopify_domain: current_shopify_domain)
  end

  def default_url_options
    { shop: @shop_origin }
  end

  private
    def set_shop_origin
      @shop_origin = current_shopify_domain
    end
end
