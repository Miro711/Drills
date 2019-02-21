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

    def show
        @post = Post.find(params[:id])

        @new_comment = Comment.new
        @comments = @post.comments.order(created_at: :desc)

        render :show
    end
        
    def index
        @posts = Post.all.order(created_at: :desc)
        render :index
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy
        redirect_to posts_path
    end

    def edit
        @post = Post.find(params[:id])
    end

    def update 
        @post = Post.find(params[:id])
        post_params = params.require(:post).permit(:title, :body)
        if @post.update post_params
          redirect_to post_path(@post.id)
        else
          render :edit
        end
    end

end
