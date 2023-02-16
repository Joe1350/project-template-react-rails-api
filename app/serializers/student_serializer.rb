class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :grade, :username, :password_digest
end
