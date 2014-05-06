class CreateEmoticons < ActiveRecord::Migration
  def change
    create_table :emoticons do |t|
      t.string :name
      t.string :emoji

      t.timestamps
    end
  end
end
