class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
  end

  def dashboard
  end

  def wallet
    @loan = Loan.find(1)
    @transfer = Transfer.new
  end
end
