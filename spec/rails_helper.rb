require 'spec_helper'

ENV['BUNDLE_GEMFILE'] = File.expand_path('../../test_app/blog/Gemfile', __FILE__)
require "bundler/setup"
Bundler.setup

ENV['RAILS_ENV'] = 'test'
# Ensure the Active Admin load path is happy
require 'rails'

ENV['RAILS'] = Rails.version
ENV['RAILS_ROOT'] = File.expand_path("../../test_app/blog", __FILE__)

require 'active_model'
# require ActiveRecord to ensure that Ransack loads correctly
require 'active_record'
require 'action_view'
require 'active_admin'
ActiveAdmin.application.load_paths = [ENV['RAILS_ROOT'] + "/app/admin"]
require File.expand_path(ENV['RAILS_ROOT'] + '/config/environment.rb', __FILE__)

require 'rspec/rails'
require 'capybara/rails'
require 'capybara/rspec'
require 'selenium-webdriver'

RSpec.configure do |config|
  config.use_transactional_fixtures = true

  Capybara.register_driver :selenium_chrome_headless do |app|
    Capybara::Selenium::Driver.load_selenium
    browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
      opts.args << '--headless'
      opts.args << '--disable-gpu' if Gem.win_platform?
      opts.args << "--incognito"
    end
    Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
  end

  config.before(:each) do
    config.include Capybara::DSL
    Capybara.server = :puma
    Capybara.current_driver = :selenium_chrome_headless
  end

  config.before(:suite) do
    ActiveRecord::Base.establish_connection
    schema_migration = ActiveRecord::Base.connection.schema_migration
    migration_context = ActiveRecord::MigrationContext.new(Rails.application.paths["db/migrate"].to_a, schema_migration)
    migration_context.migrate
  end
end
