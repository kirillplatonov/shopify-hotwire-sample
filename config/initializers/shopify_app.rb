ShopifyApp.configure do |config|
  config.application_name = "Shopify Hotwire Sample"
  config.old_secret = ""
  config.scope = "read_products" # Consult this page for more scope options:
                                  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = "2021-07"
  config.shop_session_repository = 'Shop'
  config.allow_jwt_authentication = true
  config.allow_cookie_authentication = false
  config.reauth_on_access_scope_changes = true

  config.api_key = ENV.fetch('SHOPIFY_API_KEY', '').presence
  config.secret = ENV.fetch('SHOPIFY_API_SECRET', '').presence
  if defined? Rails::Server
    raise('Missing SHOPIFY_API_KEY. See https://github.com/Shopify/shopify_app#api-keys') unless config.api_key
    raise('Missing SHOPIFY_API_SECRET. See https://github.com/Shopify/shopify_app#api-keys') unless config.secret
  end
end

# Expose JWT expire time
module ShopifyApp
  class JWT
    def expire_at
      @payload['exp'].to_i if @payload && @payload['exp']
    end
  end

  class JWTMiddleware
    def set_env_variables(token, env)
      jwt = ShopifyApp::JWT.new(token)

      env['jwt.shopify_domain'] = jwt.shopify_domain
      env['jwt.shopify_user_id'] = jwt.shopify_user_id
      env['jwt.expire_at'] = jwt.expire_at
    end
  end

  module LoginProtection
    def jwt_expire_at
      expire_at = request.env['jwt.expire_at']
      return unless expire_at
      expire_at - 5.seconds # start fetching new token bit earlier
    end
  end
end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known
