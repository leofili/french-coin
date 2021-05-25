class AddNameToLoans < ActiveRecord::Migration[6.0]
  def change
    add_column :loans, :name, :string
  end
end
