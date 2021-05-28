class AddColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :address, :string
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone_number, :string
    add_column :users, :iban, :string
    add_column :users, :bic, :string
    add_column :users, :crypto_balance, :integer, default: 0
    add_column :users, :euro_balance, :integer, default: 0
  end
end
