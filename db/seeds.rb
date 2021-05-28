# admin = User.create(email: "admin@example.com", password: "admin@example.com", password_confirmation: "admin@example.com")

User.create(first_name: "Helen", last_name: "Star", email: "helen@example.com", password: "helen@example.com", password_confirmation: "helen@example.com", phone_number: "0606060606", address: "6, rue du Faucon, 75011 Paris", crypto_balance: 10000, euro_balance: 10000)

helen = User.find_by(email: "helen@example.com")

#Creating fake loan
# Loan.create(user: admin)

#Creating two non validated loans
# first_unvalidated_loan = Loan.create(name: 'fake1', user: helen, collateral_cents: 500000, collateral_currency: 'EUR', amount_cents: 1000000, amount_currency: 'EUR', start_date: Date.today, duration: 6, end_date: Date.today + 6.months, interest_rate: 0.0675, interest_cents: 67500)

# second_unvalidated_loan = Loan.create(name: 'fake2', user: helen, collateral_cents: 500000, collateral_currency: 'ETH', amount_cents: 1000000, amount_currency: 'ETH', start_date: Date.today, duration: 6, end_date: Date.today + 6.months, interest_rate: 0.0675, interest_cents: 67500)


# Creating a validated loan in euros
# first_loan = Loan.create(name: 'fake1', user: helen, collateral_cents: 10000, collateral_currency: 'EUR', amount_cents: 50000, amount_currency: 'EUR', start_date: Date.today, duration: 6, end_date: Date.today + 6.months, interest_rate: 0.0675, interest_cents: 67500)

# Transfer.create(user: helen, loan: first_loan, amount_cents: 500000, amount_currency: 'EUR', category: 'collateral_payment')

# first_loan.duration.times do |num|
#   Payment.create(amount_cents: 177917, interest_amount_cents: 11250, refund_amount_cents: 166667, loan: first_loan, due_date: first_loan.start_date + (num + 1).months)
# end

# # Creating a validated loan in ethereum
# second_loan = Loan.create(name: 'fake2', user: helen, collateral_cents: 500000, collateral_currency: 'ETH', amount_cents: 1000000, amount_currency: 'ETH', start_date: Date.today, duration: 6, end_date: Date.today + 6.months, interest_rate: 0.0675, interest_cents: 67500)

# Transfer.create(user: helen, loan: second_loan, amount_cents: 500000, amount_currency: 'ETH', category: 'collateral_payment')

# second_loan.duration.times do |num|
#   Payment.create(amount_cents: 177917, interest_amount_cents: 11250, refund_amount_cents: 166667, loan: second_loan, due_date: second_loan.start_date + (num + 1).months)
# end

# Creating a validated loan in euros with three already done payments
third_loan = Loan.create(name: 'Achat voiture', user: helen, collateral_cents: 1000000, collateral_currency: 'ETH', amount_cents: 500000, amount_currency: 'EUR', start_date: Date.today - 3.months, duration: 6, end_date: Date.today + 3.months, interest_rate: 0.0675, interest_cents: 33750)

Transfer.create(user: helen, loan: third_loan, amount_cents: 1000000, amount_currency: 'ETH', category: 'collateral_payment')

third_loan.duration.times do |num|
  Payment.create(amount_cents: 88959, interest_amount_cents: 5625, refund_amount_cents: 83334, loan: third_loan, due_date: third_loan.start_date + (num + 1).months)
end

3.times do |num|
  new_transfer = Transfer.create(user: helen, loan: third_loan, amount_cents: 88959, amount_currency: 'EUR', category: 'monthly_payment')
  pay = third_loan.payments[num]
  pay.transfer = new_transfer
  pay.save
end


