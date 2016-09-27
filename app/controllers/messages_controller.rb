class MessagesController < ApplicationController
  protect_from_forgery except: :create
  
  def create
    puts params
  end
end
