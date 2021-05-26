class Loan < ApplicationRecord
  belongs_to :user
  has_many :transfers

  enum status: { pending: 0, accepted: 1, refused: 2, cancelled: 3 }
end
