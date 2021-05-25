class Payment < ApplicationRecord
  belongs_to :loan
  belongs_to :transfer
end
