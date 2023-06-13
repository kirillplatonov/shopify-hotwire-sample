class AppBridgeMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    if request.params.has_key?("shop") && !request.params.has_key?("host")
      shop = request.params["shop"]
      if request.url.include?("admin.shopify.com")
        shop = shop.gsub(".myshopify.com", "").gsub(".myshopify.io", "")
        host = Base64.urlsafe_encode64("admin.shopify.com/store/#{shop}", padding: false)
      else
        host = Base64.urlsafe_encode64("#{shop}/admin", padding: false)
      end
      request.update_param("host", host)
    end

    @app.call(env)
  end
end
