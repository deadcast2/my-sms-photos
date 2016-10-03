phone = Phone.create({ number: "+12093427939" })

3.times do |i|
  phone.photos.create({
    photo: File.new("#{Rails.root}/test/fixtures/files/image#{i}.jpeg"),
    body: "image #{i}"
  })
end
