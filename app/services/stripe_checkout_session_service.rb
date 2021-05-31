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
    loan.duration.times do |num|
      payment = Payment.new(
        interest_amount_cents: loan.interest_cents.fdiv(loan.duration).round,
        refund_amount_cents: loan.amount_cents.fdiv(loan.duration).round,
        loan: loan,
        due_date: loan.start_date + (num + 1).months
      )
      payment.amount_cents = payment.interest_amount_cents + payment.refund_amount_cents
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

