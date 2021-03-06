Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :notebooks
      resources :users
      resources :lectures
    end
  end

  get 'api/v1/users/:id/notebooks', to: 'api/v1/users#notebooks', as: 'api_v1_user_notebooks'
  get 'api/v1/users/:id/lectures', to: 'api/v1/users#lectures', as: 'api_v1_user_lectures'

  get 'api/v1/lectures/:id/notebooks', to: 'api/v1/lectures#notebooks', as: 'api_v1_lecture_notebooks'
  get 'api/v1/lectures/:id/users', to: 'api/v1/lectures#users', as: 'api_v1_lecture_users'

  post 'api/v1/auth', to: 'api/v1/auth#create'
  get 'api/v1/current_user', to: 'api/v1/auth#show'

end
