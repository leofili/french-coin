class LoansController < ApplicationController
  skip_before_action :authenticate_user!, only: :new

  def show
    if params[:session_id]
      session = Stripe::Checkout::Session.retrieve(params[:session_id])
      flash[:notice] = session.payment_status == "paid" ? "Votre collatéral a bien été versé !" : "Votre collatéral n'a pas pu être versé !"
    end
    @loan = Loan.find(params[:id])
    authorize @loan
  end

  def new
    @loan = Loan.new(params[:id])
    authorize @loan
  end

  def destroy
    @loan = Loan.find(params[:id])
    authorize @loan
    @loan.destroy
    redirect_to new_loan_path
  end

  def create
    @loan = Loan.new(loan_params)
    @loan.user = current_user
    @loan.duration =  params[:month].to_i
    # Envoi des données amount en centimes d'euros
    if params[:loan][:amount_currency] == "Ethereums"
      @loan.amount_currency = "ETH"
      @loan.amount_cents = params[:loan][:amount_cents].to_f * 2217.86 * 100

    elsif params[:loan][:amount_currency] == "Euros"
      @loan.amount_currency = "EUR"
      @loan.amount_cents = params[:loan][:amount_cents].to_f * 100
    end
    # Envoi des données collateral en centimes d'euros
    if params[:loan][:collateral_currency] == "Ethereums"
      @loan.collateral_currency = "ETH"
      @loan.collateral_cents = params[:loan][:collateral_cents].to_f * 2217.86 * 100
    elsif params[:loan][:collateral_currency] == "Euros"
      @loan.collateral_currency = "EUR"
      @loan.collateral_cents = params[:loan][:collateral_cents].to_f * 100
    end
    authorize @loan
      if @loan.save

        redirect_to loan_path(@loan)
      else
        render "loans/new"
      end
  end

  def edit
    @loan = Loan.find(params[:id])
    authorize @loan
    if @loan.user != current_user
      redirect_to root_path
    end
  end

  def update
    @loan = Loan.find(params[:id])
    @loan.update(loan_params)
    @loan.user = current_user   
    @loan.duration =  params[:month].to_i
    # Envoi des données amount en centimes d'euros
    if params[:loan][:amount_currency] == "Ethereums"
      @loan.amount_currency = "ETH"
      @loan.amount_cents = params[:loan][:amount_cents].to_f * 2217.86 * 100
    elsif params[:loan][:amount_currency] == "Euros"
      @loan.amount_currency = "EUR"
      @loan.amount_cents = params[:loan][:amount_cents].to_f * 100
    end
    # Envoi des données collateral en centimes d'euros
    if params[:loan][:collateral_currency] == "Ethereums"
      @loan.collateral_currency = "ETH"
      @loan.collateral_cents = params[:loan][:collateral_cents].to_f * 2217.86 * 100
    elsif params[:loan][:collateral_currency] == "Euros"
      @loan.collateral_currency = "EUR"
      @loan.collateral_cents = params[:loan][:collateral_cents].to_f * 100
    end
    authorize @loan
    if @loan.save!
      redirect_to loan_path(@loan)
    else
      render :edit
    end
  end

  private

  def loan_params
    params.require(:loan).permit(:collateral_cents, :collateral_currency, :amount_cents, :amount_currency, :start_date, :end_date, :interest_rate, :interest_cents, :status, :name, :duration)
  end
end
