# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::EnsureAuthenticatedLinks
  include ShopifyApp::EnsureHasSession

  skip_before_action :redirect_to_splash_page, unless: -> { Rails.configuration.force_iframe }

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

  def turbo_flashes
    turbo_stream.replace("shopify-app-flash", partial: "layouts/flash_messages.html.erb")
  end
end
