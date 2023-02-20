class Schedule < ApplicationRecord
    belongs_to :student
    belongs_to :course

    validate :one_class_per_day

    def one_class_per_day
        course = Course.find(self.course_id)
        student = Student.find(self.student_id)
        student.courses.each do |c|
            unless c.day != course.day
                errors.add(:schedules, "Only one class per day")
            end
        end
    end

end
