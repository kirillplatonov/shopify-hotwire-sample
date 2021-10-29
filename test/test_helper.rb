ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
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

    Rails.application.env_config['omniauth.auth'] = OmniAuth.config.mock_auth[:shopify]
    Rails.application.env_config['omniauth.params'] = { shop: shop.shopify_domain }
    Rails.application.env_config['jwt.shopify_domain'] = shop.shopify_domain

    post "/auth/shopify"
    follow_redirect!
  end

  def clear_login
    Rails.application.env_config.delete('omniauth.auth')
    Rails.application.env_config.delete('omniauth.params')
    Rails.application.env_config.delete('jwt.shopify_domain')
  end
end
