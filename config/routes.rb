Rails.application.routes.draw do
  post 'messages/create'
  get '/:number', to: 'phones#index'
end
