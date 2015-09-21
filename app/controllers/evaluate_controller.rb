class EvaluateController < ApplicationController
  include Lisp

  def lisp
    render json: Lisp.evaluate(format_lisp)
  end

  def pascal
    # 100.times { puts Lisp.evaluate(%q((* 1 2 3))) }
  end

  private

  def format_lisp
    "(progn #{params[:input]}\n)"
  end
end
