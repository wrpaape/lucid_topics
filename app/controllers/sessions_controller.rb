class SessionsController < ApplicationController
  skip_before_action :require_login

  def create
    if Employee.first.authenticate(params[:password])
      session[:logged_in] = true
      redirect_to topics_path
    else
      render :new
    end
  end
end
