class TopicsController < ApplicationController
  mattr_accessor :all_urls, :all_paths

  def index
    @topics = Topic.all_as_json
    @urls = all_urls
    @paths = all_paths
  end

  def download_file
    send_file(path, filename: params[:filename], type: params[:type])
  end

  private

  def path
    "#{Rails.root}/public/#{params[:path]}"
  end
end
