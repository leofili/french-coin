class AddPaymentMeanToTransfers < ActiveRecord::Migration[6.0]
  def change
    add_column :transfers, :payment_mean, :string
  end
end
