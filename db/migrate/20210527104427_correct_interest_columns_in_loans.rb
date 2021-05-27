class CorrectInterestColumnsInLoans < ActiveRecord::Migration[6.0]
  def change
    add_column :loans, :interest_cents, :integer
    change_column :loans, :interest_rate, :float
  end
end
