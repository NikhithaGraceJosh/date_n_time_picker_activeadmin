# frozen_string_literal: true

module ActiveAdmin
  module Inputs
    class DatetimepickerInput < ::Formtastic::Inputs::StringInput
      
      def input_html_options
        if options[:datetimepicker_options].nil?
          super.merge(class: 'ui-datetime-picker-input', autocomplete: 'off')
        else
          super.merge(class: 'ui-datetime-picker-input', autocomplete: 'off', datetimepicker_options: options[:datetimepicker_options].to_json)
        end
      end

      def wrapper_html_options_raw
        { class: 'ui-datetime-picker-wrapper' }.merge(options[:wrapper_html] || {}).dup
      end

      def label_html_options
        {
          for: input_html_options[:id],
          class: ['label'] << 'ui-datetime-picker-label'
        }
      end
    end
  end
end
