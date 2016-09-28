class Phone < ApplicationRecord
  after_create :send_welcome
  after_save :confirmation
  
  has_many :photos
  
  private
  
  def send_welcome
    Twilio::REST::Client.new.messages.create({
      from: '+12096617815',
      to: self.number,
      body: "Ahoy and welcome to My SMS Photos! You can access your photos 
      by visting mysms.photos/#{self.number.sub('+1', '')}"
    })
  end
  
  def confirmation
    Twilio::REST::Client.new.messages.create({
      from: '+12096617815',
      to: self.number,
      body: 'We got your photos! :)'
    })
  end
end
