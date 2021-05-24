class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :loan, null: false, foreign_key: true
      t.integer :amount_cents
      t.string :amount_currency
      t.string :category

      t.timestamps
    end
  end
end
