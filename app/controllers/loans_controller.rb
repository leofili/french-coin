class LoansController < ApplicationController
  skip_before_action :authenticate_user!, only: :new

  def show
    @loan = Loan.find(params[:id])
    authorize @loan
  end

  def new
    @loan = Loan.new(params[:id])
    authorize @loan
  end

  def create
    @loan = Loan.new(loan_params)
    @loan.user = current_user
    authorize @loan
      if @loan.save
        redirect_to loan_path(@loan)
      else
        render "loans/new"
      end
  end

  private

  def loan_params
    params.require(:loan).permit(:collateral_cents, :collateral_currency, :amount_cents, :amount_currency, :start_date, :end_date, :interest_rate, :status, :name)
  end
end
