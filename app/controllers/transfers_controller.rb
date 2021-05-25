class TransfersController < ApplicationController
  def new
    @transfer = Transfer.new
    authorize @transfer
  end

  def create
    @transfer = Transfer.new(transfer_params)
    @transfer.user = current_user
    @transfer.loan = Loan.find(params[:loan_id])
      if @transfer.save
        redirect_to dashboard_path
      else
        render :new
      end
  end

  private

  def transfer_params
    params.require(:transfer).permit(:amount_cents, :amount_currency, :category)
  end
end
