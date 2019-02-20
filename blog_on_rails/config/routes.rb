Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # 1 - GET new_post_path
  get("/posts/new", to: "posts#new", as: :new_post)

  # 2 - POST posts_path
  post("/posts", to: "posts#create", as: :posts)

  # 3 - GET post_path 
  get("/posts/:id", to: "posts#show", as: :post)

  # 4 - GET posts_path
  get("/posts", to: "posts#index")

end
