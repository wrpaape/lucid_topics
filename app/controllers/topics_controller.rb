class TopicsController < ApplicationController
  include Lisp

  def index
    # 100.times { puts Lisp.evaluate(%q((* 1 2 3))) }
    @topics = Topic.all_as_json
  end

  def download_file
    send_file(path, filename: params[:filename], type: params[:type])
  end

  private

  def path
    "#{Rails.root}/public/#{params[:path]}"
  end
end
