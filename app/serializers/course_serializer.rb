class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :day

  has_many :students, through: :schedules
  has_many :schedules
end
