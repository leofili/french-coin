class StripeCheckoutSessionService
  def call(event)
    transfer = Transfer.find_by(checkout_session_id: event.data.object.id)
    transfer.update(status: 'paid')
    case transfer.category
    when 'account_transfer'
      transfer.user.euro_balance += transfer.amount_cents
      transfer.user.save
    when 'collateral_payment'
      loan = transfer.loan
      loan.accepted!
      loan.start_date = Date.today
      loan.end_date = loan.start_date + loan.duration.months
      loan.save
      create_empty_payments(loan)
      add_to_balance(loan)
    end
  end

  private

  def create_empty_payments(loan)
    mensuality = (loan.amout_cents * loan.interest_rate.fdiv(1200)).fdiv(1 - (1 + loan.interest_rate.fdiv(1200))**-loan.duration)
    rest = loan.amount_cents
    loan.duration.times do |num|
      payment = Payment.new(
        amount_cents: mensuality,
        loan: loan,
        due_date: loan.start_date + (num + 1).months
      )
      payment.interest_amount_cents = rest * loan.interest_rate.fdiv(1200)
      payment.refund_amount_cents = payment.amount_cents - payment.interest_amount_cents
      rest -= payment.refund_amount_cents
      payment.save
    end
  end

  def add_to_balance(loan)
    case loan.amount_currency
    when "EUR" then loan.user.euro_balance += loan.amount_cents
    when "ETH" then loan.user.crypto_balance += loan.amount_cents
    end
    loan.user.save
  end
end

