class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title
      t.string :component
      t.string :filename

      t.timestamps null: false
    end
  end
end
