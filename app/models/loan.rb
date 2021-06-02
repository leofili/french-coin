require 'json'
require 'open-uri'

class Loan < ApplicationRecord
  belongs_to :user
  has_many :transfers
  has_many :payments

  enum status: { pending: 0, accepted: 1, refused: 2, cancelled: 3 }

  def self.convert_amount(amount, currency)
    return currency == 'EUR' ? amount.fdiv(100) : (amount.fdiv(100) * 0.00044)
  end

  def collateral_graph_values
    today = Date.today.to_time.to_i + 7_200
    start = start_date.to_time.to_i + 7_200
    graph_values = [start]
    until start == today
      start += 86_400
      start -= 3600 if start == 1_616_979_600
      graph_values << start
    end
    graph_values
  end

  def collateral_graph_array
    array = []
    dates = collateral_graph_values
    initial_collateral = collateral_cents.fdiv(100).fdiv(Conversion.find_by(unixtime: dates[0]).value)
    dates.each do |unixtime|
      p unixtime
      value = Conversion.find_by(unixtime: unixtime).value
      array << [Time.at(unixtime), (initial_collateral * value).round]
    end
    array
  end
end
