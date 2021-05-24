class Transaction < ApplicationRecord
  has_one :payment
  belongs_to :user
  belongs_to :loan
end
