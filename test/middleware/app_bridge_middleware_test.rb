require "test_helper"

class AppBridgeMiddlewareTest < ActionDispatch::IntegrationTest
  test "adds missing host params" do
    get "/?shop=platmart-dev.myshopify.com"

    # Base64 of "platmart-dev.myshopify.com/admin"
    assert_equal "cGxhdG1hcnQtZGV2Lm15c2hvcGlmeS5jb20vYWRtaW4", request.params["host"]
  end
end
