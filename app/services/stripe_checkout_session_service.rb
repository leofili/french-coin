class StripeCheckoutSessionService
  def call(event)
    transfer = Transfer.find_by(checkout_session_id: event.data.object.id)
    transfer.update(status: 'paid')
    add_to_balance(transfer)
  end

  private

  def add_to_balance(money)
    if money.amount_currency == 'EUR'
      current_user.euro_balance += money.amount_cents
    else
      current_user.crypto_balance += money.amount_cents
    end
    current_user.save
  end
end
