class PostsController < ApplicationController
    
    before_action :find_post, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user!, except: [:index, :show]
    before_action :authorize_user!, only: [:destroy, :edit, :update]
    skip_before_action :verify_authenticity_token

    def new
        @post = Post.new
    end

    def create
        @post = Post.new post_params
        @post.user = current_user
        if @post.save
            redirect_to post_path(@post.id)
        else
            render :new
        end
    end

    def show
        @new_comment = Comment.new
        @comments = @post.comments.order(created_at: :desc)
    end
        
    def index
        @posts = Post.all.order(created_at: :desc)
    end

    def destroy
        @post.destroy
        redirect_to posts_path
    end

    def edit
    end

    def update 
        if @post.update post_params
          redirect_to post_path(@post.id)
        else
          render :edit
        end
    end

    private

    def post_params
        params.require(:post).permit(:title, :body)
    end

    def find_post
        @post = Post.find(params[:id])
    end

    def authorize_user!
        redirect_to root_path, alert: 'Access Denied' unless can? :crud, @post
    end

end
