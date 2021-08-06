Rails.application.routes.draw do
  root to: 'splash_page#index'
  get '/home', to: 'home#index'

  resources :products, only: [:index]
  resource :messages, only: :create

  mount ShopifyApp::Engine, at: '/'
end
