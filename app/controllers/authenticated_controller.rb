# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::EnsureAuthenticatedLinks
  include ShopifyApp::Authenticated

  before_action :shop_origin

  helper_method :current_shop, :jwt_expire_at

  def shop_origin
    @shop_origin = current_shopify_domain
  end

  def current_shop
    @current_shop ||= Shop.find_by(shopify_domain: current_shopify_domain)
  end
end
