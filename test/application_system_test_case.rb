require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, screen_size: [1400, 1400]

  teardown do
    clear_login
  end

  def login(shop)
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(:shopify,
      provider: 'shopify',
      uid: shop.shopify_domain,
      credentials: { token: shop.shopify_token },
    )
    OmniAuth.config.allowed_request_methods = %i[post get]

    Rails.application.env_config['omniauth.auth'] = OmniAuth.config.mock_auth[:shopify]
    Rails.application.env_config['omniauth.params'] = { shop: shop.shopify_domain }
    Rails.application.env_config['jwt.shopify_domain'] = shop.shopify_domain

    visit "/auth/shopify"
  end

  def clear_login
    Rails.application.env_config.delete('omniauth.auth')
    Rails.application.env_config.delete('omniauth.params')
    Rails.application.env_config.delete('jwt.shopify_domain')
  end
end
