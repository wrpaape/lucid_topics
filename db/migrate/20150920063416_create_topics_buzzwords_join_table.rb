class CreateTopicsBuzzwordsJoinTable < ActiveRecord::Migration
  def change
    create_join_table :topics, :buzzwords
  end
end
