source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.2'

# backend
gem 'rails', '~> 6.1.2'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'dotenv-rails', '~> 2.7'
# We have to rely on fork until shopify_app will remove Rails 6.1 restriction
gem 'shopify_app', github: 'kirillplatonov/shopify_app'

# frontend
gem 'webpacker', '~> 5.0'
gem 'turbo-rails', '~> 0.5.7'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'listen', '~> 3.3'
  gem 'spring'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end
