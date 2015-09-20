class CreateBuzzwords < ActiveRecord::Migration
  def change
    create_table :buzzwords do |t|
      t.string :word
      t.text :note

      t.timestamps null: false
    end

    create_table :buzzwords_related, id: false do |t|
      t.integer :buzzword_id
      t.integer :related_id
    end

    add_index :buzzwords_related, :buzzword_id
    add_index :buzzwords_related, :related_id
  end
end
