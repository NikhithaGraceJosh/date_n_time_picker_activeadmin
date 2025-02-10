require_relative 'lib/date_n_time_picker_activeadmin/version'

Gem::Specification.new do |spec|
  spec.name                   = 'date_n_time_picker_activeadmin'
  spec.version                = DateNTimePickerActiveadmin::VERSION
  spec.platform               = Gem::Platform::RUBY
  spec.licenses               = ['MIT']
  spec.authors                = ['Nikhitha Grace Josh']
  spec.email                  = ['josh.nikhitha@gmail.com']
  spec.summary                = %q{Datetime Picker for Activeadmin}
  spec.homepage               = 'https://github.com/NikhithaGraceJosh/date_n_time_picker_activeadmin'
  spec.required_ruby_version  = Gem::Requirement.new('>= 2.3.0')
  spec.metadata               = {
                                  'homepage_uri'      => spec.homepage,
                                  'source_code_uri'   => spec.homepage,
                                  'bug_tracker_uri'   => 'https://github.com/NikhithaGraceJosh/date_n_time_picker_activeadmin/issues'
                                }
  spec.files                  = Dir['{lib,vendor}/**/*'] + ['LICENSE', 'README.md', 'CODE_OF_CONDUCT.md']
  spec.require_paths          = ['lib']

  spec.required_ruby_version = ">= 3.1"

  spec.add_dependency 'font-awesome-sass', '~> 5.15', '>= 5.15.1'
  spec.add_dependency 'activeadmin', '>= 3.2.5'
end
