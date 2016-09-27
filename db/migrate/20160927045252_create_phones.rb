class CreatePhones < ActiveRecord::Migration[5.0]
  def change
    create_table :phones do |t|
      t.string :number, null: false
      t.index :number, unique: true

      t.timestamps
    end
  end
end
