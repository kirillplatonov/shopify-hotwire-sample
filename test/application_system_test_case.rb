require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, screen_size: [1400, 1400]

  def login(shop)
    stubbed_session = ShopifyAPI::Auth::Session.new(
      shop: shop.shopify_domain,
      access_token: shop.shopify_token,
      is_online: true,
      scope: ShopifyApp.configuration.scope
    )

    ShopifyAPI::Utils::SessionUtils.stubs(:current_session_id).returns("session_id")
    ShopifyApp::SessionRepository.stubs(:load_session).returns(stubbed_session)
  end
end
