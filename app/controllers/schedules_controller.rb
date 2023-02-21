class SchedulesController < ApplicationController
    wrap_parameters format: []
    # skip_before_action :one_class_per_day, only: :update

    def index
        schedules = @current_user.schedules
        render json: schedules
    end

    def show
        schedules = @current_user.schedules.find(params[:id])
        render json: schedules
    end

    def create
        schedule = @current_user.schedules.create!(schedule_params)
        render json: schedule, status: :created
    end

    def update
        schedule = @current_user.schedules.find(params[:id])
        schedule.update!(schedule_params)
        
        render json: schedule
    end

    def destroy
        schedule = @current_user.schedules.find(params[:id])
        schedule.destroy
        head :no_content
    end

    private

    def schedule_params
        params.permit(:id, :bring_own_supplies, :course_id)
    end

end
