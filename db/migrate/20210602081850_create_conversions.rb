class CreateConversions < ActiveRecord::Migration[6.0]
  def change
    create_table :conversions do |t|
      t.integer :unixtime
      t.integer :value

      t.timestamps
    end
  end
end
