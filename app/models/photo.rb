class Photo < ApplicationRecord
  belongs_to :phone
  
  has_attached_file :photo, styles: { medium: '300x300>', thumb: '150x150#' }
    
  validates_attachment :photo, presence: true, content_type: 
    { content_type: ['image/jpeg'] }
    
  def photo_remote_url= url
    self.photo = open(url, allow_redirections: :all)
  end
end
