class TransfersController < ApplicationController
  def new
    @transfer = Transfer.new
    @loan = Loan.find(params[:loan_id])
    authorize @loan, :create_transfer?
    @transfer.amount_currency = params[:money] unless params[:money].nil?
  end

  def create
    if params[:commit] == 'Transférer'
      transfer_money
    else
      save_new_loan
    end
    if @transfer.save
      if @transfer.amount_currency == "EUR" && @transfer.payment_mean == 'card'
        @transfer.update(checkout_session_id: @session.id)
        redirect_to new_transfer_transfer_payment_path(@transfer)
      elsif @transfer.amount_currency == "EUR"
        flash[:notice] = 'Votre garantie a été versée avec succès en euros!'
        redirect_to loan_path(@loan)
      elsif @transfer.amount_currency == "ETH" && params[:commit] == 'Transférer'
        flash[:notice] = 'Vos ethereum ont été transférés avec succès vers votre portefeuille!'
        redirect_to wallet_path
      else
        flash[:notice] = 'Votre garantie a été versée avec succès en ethereum!'
        redirect_to loan_path(@loan)
      end
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
    @transfer.status = 'pending'
    authorize @loan, :create_transfer?
    if @transfer.amount_currency == "EUR"
      @session = create_stripe_session('wallet')
    else
      add_to_balance(@transfer)
    end
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
    case money.amount_currency
    when "EUR" then current_user.euro_balance += money.amount_cents
    when "ETH" then current_user.crypto_balance += money.amount_cents
    end
    current_user.save
  end

  def save_new_loan
    @transfer = Transfer.new(transfer_params)
    collateral_transfer
    authorize @loan, :create_transfer?
    if @transfer.amount_currency == "EUR" && @transfer.payment_mean == "card"
      @session = create_stripe_session("loans/#{@loan.id}")
    else
      @loan.accepted!
      @loan.start_date = Date.today
      @loan.end_date = @loan.start_date + @loan.duration.months
      @loan.save
      create_empty_payments
      balance_operations
    end
  end

  def collateral_transfer
    @loan = Loan.find(params[:loan_id])
    @transfer.loan = @loan
    @transfer.amount_cents = @loan.collateral_cents
    @transfer.amount_currency = @loan.collateral_currency
    @transfer.user = current_user
    @transfer.category = 'collateral_payment'
    @transfer.status = 'pending'
  end

  def create_empty_payments
    mensuality = (@loan.amount_cents * @loan.interest_rate.fdiv(1200)).fdiv(1 - (1 + @loan.interest_rate.fdiv(1200))**-@loan.duration)
    rest = @loan.amount_cents
    @loan.duration.times do |num|
      payment = Payment.new(
        amount_cents: mensuality,
        loan: @loan,
        due_date: @loan.start_date + (num + 1).months
      )
      payment.interest_amount_cents = rest * @loan.interest_rate.fdiv(1200)
      payment.refund_amount_cents = payment.amount_cents - payment.interest_amount_cents
      rest -= payment.refund_amount_cents
      payment.save
    end
  end

  def create_stripe_session(path_word)
    Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{
        name: @transfer.category,
        amount: @transfer.amount_cents,
        currency: 'eur',
        quantity: 1
      }],
      success_url: "http://www.french-coin.cash/#{path_word}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://www.french-coin.cash/#{path_word}?session_id={CHECKOUT_SESSION_ID}"
    )
  end
end
