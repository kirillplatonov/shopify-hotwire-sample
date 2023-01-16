# frozen_string_literal: true

class ProductsController < AuthenticatedController
  def index
    @graphql = params[:graphql] == "true"
    if @graphql
      @products = GetProducts.call.data
    else
      @products = ShopifyAPI::Product.all(limit: 10)
    end
  end
end
