class Conversion < ApplicationRecord
  def self.fill_conversion
    url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=EUR&limit=120&api_key=e0c8e19de543fd2593c72f16715c49fbab97d0581e47c2470fbffdba91964461'
    data_serialized = URI.open(url).read
    data = JSON.parse(data_serialized)
    data['Data']['Data'].each do |hash|
      if Rails.env == "development"
        unixtime = hash['time'] <= 1_616_889_600 ? hash['time'] + 3_600 : hash['time']
      else
        unixtime = hash['time']
      end
      Conversion.create(unixtime: unixtime, value: hash['open'])
    end
  end
end
