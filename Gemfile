source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"

# backend
gem "rails", "~> 7.0.6"
gem "pg", "~> 1.1"
gem "redis", "~> 5.0"
gem "puma", "~> 6.0"
gem "bootsnap", require: false
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "dotenv-rails"

# shopify
gem "shopify_app", "~> 21.6"
gem "polaris_view_components", "~> 1.1.0"
gem "shopify_graphql", "~> 1.2"

# frontend
gem "sprockets-rails"
gem "jsbundling-rails"
gem "turbo-rails"
gem "stimulus-rails"

group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  gem "web-console"
  gem "pry-rails"
  gem "hotwire-livereload"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
