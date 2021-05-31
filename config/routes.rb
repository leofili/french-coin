Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  resources :loans, only: %i[new create show destroy] do
    resources :transfers, only: %i[new create]
  end
  get '/dashboard', to: 'pages#dashboard'
  get '/wallet', to: 'pages#wallet'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
