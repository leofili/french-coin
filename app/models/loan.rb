class Loan < ApplicationRecord
  belongs_to :user
  has_many :transfers
  has_many :payments

  enum status: { pending: 0, accepted: 1, refused: 2, cancelled: 3 }
end
