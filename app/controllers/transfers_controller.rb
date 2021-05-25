class TransfersController < ApplicationController
  def new
    @transfer = Transfer.new
    authorize @transfer
  end
end
