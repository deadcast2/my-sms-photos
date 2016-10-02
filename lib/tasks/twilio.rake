require 'twilio-ruby'

namespace :twilio do
  desc 'Deletes all SMS/MMS messages from your Twilio account'
  task delete_all: :environment do
    account_sid = ENV.fetch('TWILIO_ACCOUNT_SID')
    auth_token = ENV.fetch('TWILIO_ACCOUNT_AUTH_TOKEN')
    @client = Twilio::REST::Client.new account_sid, auth_token

    @client.messages.list(page_size: 1000).each do |message|  
      message.media.list.each do |media|
        puts "Deleting media #{media.sid} for message #{message.sid}"
        media.delete
      end if message.num_media.to_i > 0
  
      puts "Deleting message #{message.sid}"
      message.delete
    end
  end
end
