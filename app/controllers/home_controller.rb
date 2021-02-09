# frozen_string_literal: true

class HomeController < AuthenticatedController
  def index
    @shop_origin = current_shopify_domain
  end
end
