class Payment < ApplicationRecord
  belongs_to :loan
  belongs_to :transfer, optional: true
end
