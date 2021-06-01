class TransferPaymentsController < ApplicationController
  def new
    @transfer = current_user.transfers.where(status: 'pending').find(params[:transfer_id])
    authorize @transfer
  end
end
