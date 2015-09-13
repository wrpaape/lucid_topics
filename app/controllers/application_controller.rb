class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_login

  private

  def require_login
    unless session[:logged_in]
      redirect_to login_path
    end
  end
end
