class AddBodyToPhotos < ActiveRecord::Migration[5.0]
  def change
    add_column :photos, :body, :string
  end
end
