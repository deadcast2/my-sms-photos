class MessagesController < ApplicationController
  protect_from_forgery except: :create
  
  def create
    phone = Phone.create_or_find_by_number(params['From'])
    params['NumMedia'].to_i.times do |index|
      phone.photos.create({
        photo_remote_url: params["MediaUrl#{index}"],
        body: params['Body']
      })
    end
    
    Twilio::REST::Client.new.message.create({
      from: params['To'],
      to: params['From'],
      body: 'Hello!'
    })
  end
end
