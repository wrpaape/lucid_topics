Rails.application.routes.draw do
  scope "evaluate" do
    get "lisp", to: "evaluate#lisp"
    get "pascal", to: "evaluate#pascal"
  end
  get "login", to: "sessions#new", as: "login"
  post "login", to: "sessions#create", as: "create_session"
  get "download_file", to: "topics#download_file", as: "download_file"
  root to: "topics#index", as: "topics"
end
