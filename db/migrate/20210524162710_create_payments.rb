class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.references :loan, null: false, foreign_key: true
      t.integer :amount_cents
      t.integer :interest_amount_cents
      t.integer :refund_amount_cents
      t.references :transfer, foreign_key: true
      t.date :due_date

      t.timestamps
    end
  end
end
