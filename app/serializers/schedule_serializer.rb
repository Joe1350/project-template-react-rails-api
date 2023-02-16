class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :week, :student_id, :course_id
end
