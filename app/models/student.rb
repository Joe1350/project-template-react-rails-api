class Student < ApplicationRecord
    has_many :schedules
    has_many :courses, through: :schedules

    has_secure_password

    validates :name, presence: true
    validates :age, inclusion: { in: 18..150,
        message: "must be over 18" }
    validates :username, uniqueness: true

end
