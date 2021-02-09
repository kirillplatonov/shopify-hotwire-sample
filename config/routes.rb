Rails.application.routes.draw do
  root to: 'splash_page#index'
  get '/home', to: 'home#index'
  get '/products', to: 'products#index'
  mount ShopifyApp::Engine, at: '/'
end
