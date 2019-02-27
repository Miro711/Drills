class UsersController < ApplicationController

    before_action :find_user, only: [:edit, :update, :change_password]
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

    def change_password
    end

    def patch_password
      #render json: params
      user = User.find(params[:id])
      pass_params = params.permit(:current_password, :new_password, :new_password_confirmation)
      if user&.authenticate(pass_params["current_password"])
        if user.update(password: pass_params["new_password"], password_confirmation: pass_params["new_password_confirmation"])
          flash[:notice] = "Password Changed Successfully"
          redirect_to root_path
        else
          flash[:notice] = "New passwords not matching"
          render :change_password
        end
      else
        flash[:alert] = "Wrong password"
        render :change_password
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
