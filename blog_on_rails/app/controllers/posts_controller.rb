class PostsController < ApplicationController
    
    def new
        @post = Post.new
        render :new
    end

    def create
        post_params = params.require(:post).permit(:title, :body)
        @post = Post.new post_params
        if @post.save
            redirect_to post_path(@post.id)
        else
            render :new
        end
    end

end
