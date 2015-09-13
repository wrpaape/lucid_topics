Rails.application.routes.draw do
  get "login", to: "sessions#new", as: "login"
  post "login", to: "sessions#create", as: "create_session"
  root to: "topics#index", as: "topics"
end
