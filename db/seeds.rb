# admin = User.create(email: "admin@example.com", password: "admin@example.com", password_confirmation: "admin@example.com")

User.create(first_name: "Paul", last_name: "Bismuth", email: "bismuth4@example.com", password: "bismuth4@example.com", password_confirmation: "bismuth4@example.com", phone_number: "0606060606", address: "6, rue du Faucon, 75011 Paris", crypto_balance: 10000, euro_balance: 10000)

helen = User.find_by(email: "bismuth4@example.com")

# Creating a validated loan in euros with three already done payments
Conversion.destroy_all
Conversion.fill_conversion

third_loan = Loan.create(name: 'Achat voiture', user: helen, collateral_cents: 1000000, collateral_currency: 'ETH', amount_cents: 500000, amount_currency: 'EUR', start_date: Date.today - 4.months, duration: 6, end_date: Date.today + 2.months, interest_rate: 8.95, interest_cents: 22375)

Transfer.create(user: helen, loan: third_loan, amount_cents: 1000000, amount_currency: 'ETH', category: 'collateral_payment')

mensuality = (third_loan.amount_cents * third_loan.interest_rate.fdiv(1200)).fdiv(1 - (1 + third_loan.interest_rate.fdiv(1200))**-third_loan.duration)
rest = third_loan.amount_cents
third_loan.duration.times do |num|
  payment = Payment.new(
    amount_cents: mensuality,
    loan: third_loan,
    due_date: third_loan.start_date + (num + 1).months
  )
  payment.interest_amount_cents = rest * third_loan.interest_rate.fdiv(1200)
  payment.refund_amount_cents = payment.amount_cents - payment.interest_amount_cents
  rest -= payment.refund_amount_cents
  payment.save
end

4.times do |num|
  new_transfer = Transfer.create(user: helen, loan: third_loan, amount_cents: mensuality, amount_currency: 'EUR', category: 'monthly_payment')
  pay = third_loan.payments[num]
  pay.transfer = new_transfer
  pay.save
end


