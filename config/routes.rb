Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  resources :loans, only: %i[new create show destroy] do
    resources :transfers, only: %i[new create]
  end
  get '/dashboard', to: 'pages#dashboard'
  get '/wallet', to: 'pages#wallet'

  resources :transfers do
    resources :transfer_payments, only: %i[new]
  end

  mount StripeEvent::Engine, at: '/stripe-webhooks'

end
