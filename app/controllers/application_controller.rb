class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_login, :set_urls, :set_paths

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
    TopicsController.all_urls = all_urls
  end

  def set_paths
    all_paths = {
      # img: ""
      img: "/assets/"
    }

    Topic.all_paths = all_paths
    TopicsController.all_paths = all_paths
  end
end
