class CreateLoans < ActiveRecord::Migration[6.0]
  def change
    create_table :loans do |t|
      t.integer :collateral_cents
      t.string :collateral_currency
      t.integer :amount_cents
      t.string :amount_currency
      t.date :start_date
      t.date :end_date
      t.integer :interest_rate
      t.integer :status, default: 0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
