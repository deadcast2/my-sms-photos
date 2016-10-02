class PhonesController < ApplicationController
  def index
    if phone = Phone.find_by_number("+1#{params[:number]}")
      @photos = phone.photos.order(created_at: :desc)
    else
      redirect_to '/404.html'
    end
  end
end
