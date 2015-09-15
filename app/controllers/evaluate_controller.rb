class EvaluateController < ApplicationController
  include Lisp

  def lisp
    render json: Lisp.evaluate(params[:input])
  end

  def pascal
    # 100.times { puts Lisp.evaluate(%q((* 1 2 3))) }
  end
end
