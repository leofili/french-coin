class AddCheckoutSessionIdToTransfers < ActiveRecord::Migration[6.0]
  def change
    add_column :transfers, :checkout_session_id, :string
  end
end
