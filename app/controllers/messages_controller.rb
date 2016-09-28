class MessagesController < ApplicationController
  protect_from_forgery except: :create
  
  def create
    phone = Phone.find_or_initialize_by(number: params['From'])
    
    params['NumMedia'].to_i.times do |index|
      phone.photos.build({
        photo_remote_url: params["MediaUrl#{index}"],
        body: params['Body']
      })
    end
    
    phone.save
  end
end
