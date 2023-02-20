class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.boolean :bring_own_supplies
      t.integer :student_id
      t.integer :course_id

      t.timestamps
    end
  end
end
