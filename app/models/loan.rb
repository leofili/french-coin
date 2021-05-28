class Loan < ApplicationRecord
  belongs_to :user
  has_many :transfers
  has_many :payments

  enum status: { pending: 0, accepted: 1, refused: 2, cancelled: 3 }

  def self.convert_amount(amount, currency)
   return currency == 'EUR' ? amount.fdiv(100) : (amount.fdiv(100) * 0.00044)
  end
end
