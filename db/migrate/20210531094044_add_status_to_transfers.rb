class AddStatusToTransfers < ActiveRecord::Migration[6.0]
  def change
    add_column :transfers, :status, :string
  end
end
