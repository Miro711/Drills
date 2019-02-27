class UsersController < ApplicationController

    before_action :find_user, only: [:edit, :update]
    before_action :authenticate_user!, only: [:edit, :update]

    def new
        @user = User.new
    end

    def create
        @user = User.new user_params
        if @user.save
          session[:user_id] = @user.id 
          redirect_to root_path
        else
          render :new
        end
    end

    def edit
    end

    def update
        if @user.update params.require(:user).permit(:name, :email)
          redirect_to root_path
        else
          render :edit
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def find_user
      @user = User.find(session[:user_id])
    end

end
