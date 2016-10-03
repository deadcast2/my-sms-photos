class Photo < ApplicationRecord
  belongs_to :phone
  
  has_attached_file :photo, 
    processors: [:thumbnail, :paperclip_optimizer],
    paperclip_optimizer: { jpegoptim: { allow_lossy: true, max_quality: 0 } },
    styles: { thumb: '256x256#' }
  process_in_background :photo
    
  validates_attachment :photo, presence: true, content_type: 
    { content_type: ['image/jpeg'] }
    
  def photo_remote_url= url
    self.photo = open(url, allow_redirections: :all)
  end
end
