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
    all_urls = {
      login: login_url,
      download_file: download_file_url,
      evaluate: {
        lisp: lisp_url,
        pascal: pascal_url
      }
    }

    Topic.all_urls = all_urls
  end
end
