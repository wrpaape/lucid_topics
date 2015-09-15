class TopicsController < ApplicationController
  def index
    @topics = Topic.all_as_json
  end

  def download_file
    send_file(path, filename: params[:filename], type: params[:type])
  end

  private

  def path
    Rails.root.join("public", params[:path])
  end
end
