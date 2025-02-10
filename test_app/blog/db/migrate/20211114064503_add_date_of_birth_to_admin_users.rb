class AddDateOfBirthToAdminUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :admin_users, :date_of_birth, :datetime
  end
end
