class CoursesController < ApplicationController
    skip_before_action :authorize

    def index
        courses = Course.all.order(day: :asc)
        render json: courses
    end

    def create
        course = Course.create(course_params)
        render json: course, status: :created
    end

    private

    def find_course
        Course.find(params[:id])
    end

    def course_params
        params.permit(:id, :name, :day)
    end

end

    # def show
    #     course = find_course
    #     render json: course
    # end
