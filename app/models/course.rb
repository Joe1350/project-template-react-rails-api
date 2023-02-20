class Course < ApplicationRecord
    has_many :schedules, dependent: :destroy
    has_many :students, through: :schedules

    validates :name, presence: true
    validates :day, inclusion: { in: %w(monday tuesday wednesday thursday friday),
        message: "%{value} is not a valid day"
    }
end
