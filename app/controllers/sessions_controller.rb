class SessionsController < ApplicationController
  skip_before_action :require_login

  def create
    100.times { puts  }
    if Employee.first.authenticate(params[:password])
      session[:logged_in] = true
      redirect_to topics_url
    else
      render :new
    end
  end
end
