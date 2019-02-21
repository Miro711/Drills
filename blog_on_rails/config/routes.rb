Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :posts do
    resources :comments, only: [:create, :destroy]
  end

  # # 1 - GET new_post_path
  # get("/posts/new", to: "posts#new", as: :new_post)

  # # 2 - POST posts_path
  # post("/posts", to: "posts#create", as: :posts)

  # # 3 - GET post_path(<id>)
  # get("/posts/:id", to: "posts#show", as: :post)

  # # 4 - GET posts_path
  # get("/posts", to: "posts#index")
  # get("/", to: "posts#index", as: :root)

  # # 5 - DELETE post_path(<id>)
  # delete("/posts/:id", to: "posts#destroy")

  # # 6 - GET edit_post_path(<id>)
  # get("/posts/:id/edit", to: "posts#edit", as: :edit_post)

  # # 7 - PATCH post_path(<id>)
  # patch("/posts/:id", to: "posts#update")

end
