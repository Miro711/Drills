Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # 1 - GET new_post_path
  get("/posts/new", to: "posts#new", as: :new_post)

  # 2 - POST posts_path
  post("/posts", to: "posts#create", as: :posts)

end
