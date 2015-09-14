class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_login, :set_urls

  private

  def require_login
    unless session[:logged_in]
      redirect_to login_url
    end
  end

  def set_urls
    Topic.all_urls = {
      login: login_url,
      download_file: download_file_url
    }
  end
end
