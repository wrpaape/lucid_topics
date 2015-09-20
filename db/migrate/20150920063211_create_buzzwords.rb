class CreateBuzzwords < ActiveRecord::Migration
  def change
    create_table :buzzwords do |t|
      t.string :word
      t.text :note

      t.timestamps null: false
    end
  end
end
