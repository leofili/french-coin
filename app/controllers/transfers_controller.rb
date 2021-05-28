class TransfersController < ApplicationController
  def new
    @transfer = Transfer.new
    @loan = Loan.find(params[:loan_id])
    authorize @loan, :create_transfer?
    @transfer.amount_currency = params[:money] unless params[:money].nil?
  end

  def create
    if params[:commit] == 'Transfer'
      transfer_money
    else
      save_new_loan
    end
    if @transfer.save
      redirect_to params[:commit] == 'Transfer' ? wallet_path : dashboard_path
    else
      render :new
    end
  end

  private

  def transfer_params
    params.require(:transfer).permit(:amount_currency, :payment_mean)
  end

  def transfer_money
    @transfer = Transfer.new(transfer_params)
    convert_amount
    @loan = Loan.find(params[:loan_id])
    @transfer.loan = @loan
    @transfer.user = current_user
    @transfer.category = 'account_transfer'
    authorize @loan, :create_transfer?
    add_to_balance(@transfer)
  end

  def convert_amount
    @transfer.amount_cents = @transfer.amount_currency == 'EUR' ? params[:transfer][:amount_cents].to_f * 100 : params[:transfer][:amount_cents].to_f * 100 * 2_257
  end

  def balance_operations
    substract_to_balance
    add_to_balance(@loan)
  end

  def substract_to_balance
    case @transfer.payment_mean
    when "euro_wallet" then current_user.euro_balance -= @transfer.amount_cents
    when "crypto_wallet" then current_user.crypto_balance -= @transfer.amount_cents
    end
  end

  def add_to_balance(money)
    if money.amount_currency == 'EUR'
      current_user.euro_balance += money.amount_cents
    else
      current_user.crypto_balance += money.amount_cents
    end
    current_user.save
  end

  def save_new_loan
    @transfer = Transfer.new(transfer_params)
    collateral_transfer
    authorize @loan, :create_transfer?
    @loan.accepted!
    @loan.start_date = Date.today
    @loan.end_date = @loan.start_date + @loan.duration.months
    create_empty_payments
    balance_operations
  end

  def collateral_transfer
    @loan = Loan.find(params[:loan_id])
    @transfer.loan = @loan
    @transfer.amount_cents = @loan.collateral_cents
    @transfer.amount_currency = @loan.collateral_currency
    @transfer.user = current_user
    @transfer.category = 'collateral_payment'
  end

  def create_empty_payments
    @loan.duration.times do |num|
      payment = Payment.new(
        interest_amount_cents: @loan.interest_cents.fdiv(6).round,
        refund_amount_cents: @loan.amount_cents.fdiv(6).round,
        loan: @loan,
        due_date: @loan.start_date + (num + 1).months
      )
      payment.amount_cents = payment.interest_amount_cents + payment.refund_amount_cents
      payment.save
    end
  end
end
