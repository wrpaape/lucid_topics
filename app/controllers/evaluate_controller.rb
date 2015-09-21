class EvaluateController < ApplicationController
  include Lisp

  def lisp
    render json: Lisp.evaluate(format_lisp)
  end

  def pascal
    render json: "(coming soon)" #TODO: add Pascal module
  end

  private

  def format_lisp
    "(progn #{params[:input]}\n)"
  end
end
