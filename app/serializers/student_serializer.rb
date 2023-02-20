class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :username

  has_many :schedules
  has_many :courses, through: :schedules
end
