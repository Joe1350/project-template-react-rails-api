class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :bring_own_supplies, :course_id

  belongs_to :student
  belongs_to :course
end
