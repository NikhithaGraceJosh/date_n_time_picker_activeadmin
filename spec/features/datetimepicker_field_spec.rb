require 'rails_helper'

feature 'Datetimepicker' do
  
  given!(:admin) do
    AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
  end

  scenario 'Admin New user form is loaded' do
    #Log in
    visit '/admin/admin_users/new'
    fill_in 'admin_user_email', with: 'admin@example.com'
    fill_in 'admin_user_password', with: 'password'
    find('input[type=submit]').click

    # Check if elments got the right classes
    wrapper_element = find('#admin_user_date_of_birth_input')
    datetimepicker_input_field = find('#admin_user_date_of_birth')
    datetimepicker_label = find('label[for=admin_user_date_of_birth]')

    expect(wrapper_element[:class]).to include('ui-datetime-picker-wrapper')
    expect(datetimepicker_input_field[:class]).to include('ui-datetime-picker-input')
    expect(datetimepicker_label[:class]).to include('ui-datetime-picker-label')
  end

  scenario 'Datetimepicker field is focused' do
    #Log in
    visit '/admin/admin_users/new'
    fill_in 'admin_user_email', with: 'admin@example.com'
    fill_in 'admin_user_password', with: 'password'
    find('input[type=submit]').click

    datetimepicker_input_field = find('#admin_user_date_of_birth')
    # Check if datetimepicker is displayed on click
    datetimepicker_input_field.click
    expect(datetimepicker_input_field).to have_sibling('.datetimepicker-container')

    # select date = Aug 30 1997
    find('.select-month ').click
    find('.month-container div', text: /\AAug\z/).click
    find('.select-year').click
    start_year = find('.start-year').text.to_i
    while(start_year >= 1997)
      find('.previous-dozen-years').click
      start_year = find('.start-year').text.to_i
    end
    find('.year-container div', text: "1997").click
    first('.datetimepicker-container table td', text: '30').click

    #select Time = 4:15 PM
    find('.toggle.time').click
    find('.hour').click
    find('.hour-container div', text: /\A4\z/).click
    find('.minute').click
    find('.minute-container div', text: /\A15\z/).click
    if(find('.toggle-am-pm').text == 'AM')
      find('.toggle-am-pm').click
    end
    #check if correct date is displayed on clicking outside
    find('#page_title').click
    expect(datetimepicker_input_field.value).to eq("08-30-1997 16:15:00")
  end
end
