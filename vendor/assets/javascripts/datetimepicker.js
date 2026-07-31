//= require datetimepicker-object

let default_options = {
    'min_date': -1,
    'max_date': -1,
    'format': '%dd-%mm-%yyyy %hh:%MM:%SS %P',
    'only_datepicker': false
};
let datetimepicker_active_objects = [];

function initDatetimepickers() {
    // Initialising datetimepicker objects
    // Saving them to an array
    document.querySelectorAll('.ui-datetime-picker-wrapper > .ui-datetime-picker-input').forEach(function (d) {
        let obj = new Datetimepicker(d);
        if (d.value == "") {
            obj.dateObject = new Date()
            obj.viewingDate.date = -1;
            obj.viewingDate.month = obj.dateObject.getMonth()
            obj.viewingDate.year = obj.dateObject.getFullYear()
            let time = obj.dateObject.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')

            obj.finalTime.hour = time[0]
            obj.finalTime.minute = obj.dateObject.getMinutes()
            obj.finalTime.period = time[1]

            // display date according to format specified
            if (d.hasAttribute('datetimepicker_options')) {
                let options = d.getAttribute('datetimepicker_options')
                obj.datetimepicker_options = { ...default_options, ...JSON.parse(options) }
            } else {
                obj.datetimepicker_options = default_options
            }

        } else {
            let val = d.value

            // for firefox browser
            val = val.replace(' UTC', '')

            obj.dateObject = new Date(val)
            obj.viewingDate.date = obj.dateObject.getDate();
            obj.viewingDate.month = obj.dateObject.getMonth()
            obj.viewingDate.year = obj.dateObject.getFullYear()

            let time = obj.dateObject.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')

            obj.finalTime.hour = time[0]
            obj.finalTime.minute = obj.dateObject.getMinutes()
            obj.finalTime.period = time[1]

            // display date according to format specified
            let options = d.getAttribute('datetimepicker_options')

            obj.datetimepicker_options = { ...default_options, ...JSON.parse(options) }

            let formatted_date = formatDateTime(obj.dateObject, obj.viewingDate, obj.finalTime, obj.datetimepicker_options["format"])
            d.value = formatted_date
        }

        d.addEventListener('click', function () {
            obj.initDateTimePicker.bind(obj)()
            datetimepicker_active_objects.push(obj)
        })
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDatetimepickers)
} else {
    initDatetimepickers()
}

document.addEventListener('click', function (e) {
    if (datetimepicker_active_objects.length > 0) {
        let clicked_inside_wrapper = e.target.closest('.ui-datetime-picker-wrapper') != null
        if ((!clicked_inside_wrapper) || (e.target.classList.contains('ui-datetime-picker-input'))) {
            let obj_to_remove = datetimepicker_active_objects.shift()
            // set value of input field with selected date
            if ((!(obj_to_remove.finalDate.date == null))) {
                let formatted_date = formatDateTime(obj_to_remove.dateObject, obj_to_remove.finalDate, obj_to_remove.finalTime, obj_to_remove.datetimepicker_options["format"])
                obj_to_remove.dateInputElement.value = formatted_date
            }
            if (obj_to_remove.widget) {
                obj_to_remove.widget.remove()
            }
        }
    }
}, true)
