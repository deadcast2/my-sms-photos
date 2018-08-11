Rails.application.routes.draw do
  post 'messages/create'
  get '/', to: 'home#welcome'
  get '/:number', to: 'phones#index'
end
