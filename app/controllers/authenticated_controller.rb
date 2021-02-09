# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::EnsureAuthenticatedLinks
  include ShopifyApp::Authenticated
end
