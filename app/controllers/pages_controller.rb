class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
  end

  def dashboard
    @loans = current_user.loans
  end

  def wallet
    if params[:session_id]
      session = Stripe::Checkout::Session.retrieve(params[:session_id])
      flash[:notice] = session.payment_status == "paid" ? "Vos euros ont été transférés avec succès sur votre compte !" : "Vos euros n'ont pas pu être transférés sur votre compte !"
    end
    @loan = Loan.find(1)
    @transfer = Transfer.new
  end

  def lend
    @loan = Loan.find(1)
  end
end
