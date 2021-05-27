class AddDurationToLoans < ActiveRecord::Migration[6.0]
  def change
    add_column :loans, :duration, :integer
  end
end
