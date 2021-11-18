//= require datetimepicker-object 

let default_options = {
    'min_date': -1,
    'max_date': -1,
    'format': '%dd-%mm-%yyyy %hh:%MM:%SS %P',
    'only_datepicker': false
};
let datetimepicker_active_objects = [];

$(function () {
    // Initialising datetimepicker objects
    // Saving them to an array
    $.map($('.ui-datetime-picker-wrapper > .ui-datetime-picker-input'), function (d, index) {
        let obj = new Datetimepicker($(d));
        if ($(d).val() == "") {
            obj.dateObject = new Date()
            obj.viewingDate.date = -1;
            obj.viewingDate.month = obj.dateObject.getMonth()
            obj.viewingDate.year = obj.dateObject.getFullYear()
            let time = obj.dateObject.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')

            obj.finalTime.hour = time[0]
            obj.finalTime.minute = obj.dateObject.getMinutes()
            obj.finalTime.period = time[1]


            // display date according to format specified
            if ($(d)[0].hasAttribute('datetimepicker_options')) {
                let options = $(d).attr('datetimepicker_options')
                obj.datetimepicker_options = { ...default_options, ...($.parseJSON(options)) }
            } else {
                obj.datetimepicker_options = default_options
            }

        } else {
            let val = $(d).val()

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
            let options = $(d).attr('datetimepicker_options')

            obj.datetimepicker_options = { ...default_options, ...($.parseJSON(options)) }

            let formatted_date = formatDateTime(obj.dateObject, obj.viewingDate, obj.finalTime, obj.datetimepicker_options["format"])
            $(d).val(formatted_date)
        }

        d.addEventListener('click', function(){
            obj.initDateTimePicker.bind(obj)()
            datetimepicker_active_objects.push(obj)
        })
    })
})

$(document)[0].addEventListener('click', function (e) {
    if(datetimepicker_active_objects.length > 0){
        if (($('.ui-datetime-picker-wrapper').find($(e.target)).length == 0) || ($(e.target).hasClass('ui-datetime-picker-input'))){
            let obj_to_remove = datetimepicker_active_objects.shift()
            // set value of input field with selected date
            if ((!(obj_to_remove.finalDate.date == null))) {
                formatted_date = formatDateTime(obj_to_remove.dateObject, obj_to_remove.finalDate, obj_to_remove.finalTime, obj_to_remove.datetimepicker_options["format"])
                $(obj_to_remove.dateInputElement).val(formatted_date)
            }
            $(obj_to_remove.dateInputElement).next().remove()
        }
    }
}, true)