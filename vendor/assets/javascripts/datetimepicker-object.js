//= require datetimepicker-constants

function myDate() {
    this.date = null;
    this.month = null;
    this.year = null;
}
function myTime() {
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.period = null;
}
function Datetimepicker(element) {
    this.dateInputElement = element;
    this.widget = null;
    this.viewingDate = new myDate()
    this.finalDate = new myDate()
    this.finalTime = new myTime()
    this.dateObject = null;
    this.datetimepicker_options = {};
    this.initDateTimePicker = function () {
        // initially display datetimepicker with current month, year
        let html = `<div class="datetimepicker-container">
                        <div class="header">
                        </div>
                        <div class="body">
                        </div>`
        if (!(this.datetimepicker_options["only_datepicker"])) {
            html += `<div class="footer">
                            <div class="toggle time">
                                <i class="far fa-clock"></i>
                            </div>
                        </div>
                    </div>`
        }
        $(this.dateInputElement).after(html)
        this.widget = $(this.dateInputElement).next()

        bindWidgetEvents.bind(this)()
        this.displayCalendar(this.viewingDate.month, this.viewingDate.year)
    }
    this.displayCalendar = function (month, year) {
        let startingDayOfMonth = new Date(year, month, 1).getDay()
        let totalDaysInMonth = new Date(year, parseInt(month) + 1, 0).getDate()

        let min_date = -1
        let max_date = totalDaysInMonth + 1
        let disable_year = false
        let disable_month = false

        if (this.datetimepicker_options["min_date"] != -1) {
            let min_full_date = new Date(this.datetimepicker_options["min_date"])
            if (year < min_full_date.getFullYear()) {
                // since the whole year is disabled and so are all the months
                disable_year = true
                disable_month = true
                min_date = totalDaysInMonth + 1
            } else if (min_full_date.getFullYear() == year && month < min_full_date.getMonth()) {
                //since the whole month is disbaled, set the flag to true
                disable_month = true
                min_date = totalDaysInMonth + 1
            } else if (min_full_date.getMonth() == month && min_full_date.getFullYear() == year) {
                min_date = min_full_date.getDate()
            }
        }

        if (this.datetimepicker_options["max_date"] != -1) {
            let max_full_date = new Date(this.datetimepicker_options["max_date"])
            if (year > max_full_date.getFullYear()) {
                // since the whole year is disabled and so are all the months
                disable_year = true
                disable_month = true
                max_date = 0
            } else if (max_full_date.getFullYear() == year && month > max_full_date.getMonth()) {
                //since the whole month is disbaled, set the flag to true
                disable_month = true
                max_date = 0
            } else if (max_full_date.getMonth() == month && max_full_date.getFullYear() == year) {
                max_date = max_full_date.getDate()
            }
        }
        this.fillHeaderCalendar(month, year, disable_month, disable_year)
        this.fillBodyCalendar(month, year, startingDayOfMonth, totalDaysInMonth, min_date, max_date)
    }

    this.fillHeaderCalendar = function (month, year, disable_month, disable_year) {
        let html = `<div class="calendar">
                        <span class="month">
                            <span class="previous-month">
                                <i class="fa fa-chevron-left"></i>
                            </span>
                            <span class="select-month ${disable_month ? "disabled" : ""}">
                                <span class="${month}">${MONTHS[month]}</span>
                            </span>
                            <span class="next-month">
                                <i class="fa fa-chevron-right"></i>
                            </span>
                        </span>
                        <span class="year">
                            <span class="previous-year">
                                <i class="fa fa-chevron-left"></i>
                            </span>
                            <span class="select-year ${disable_year ? "disabled" : ""}">${year}</span>
                            <span class="next-year">
                                <i class="fa fa-chevron-right"></i>
                            </span>
                        </span>
                    </div>`
        $('.datetimepicker-container .header').attr('class', 'header datepicker')
        $('.datetimepicker-container .header.datepicker').html(html)
    }

    this.fillBodyCalendar = function (month, year, day, total_days, min_date, max_date) {
        let i = 1;
        let html = `<table>
                        <thead>
                            <tr>`
        $.each(DAYS, function (index, value) {
            html += `<th> ${value} </th>`
        })
        html += `   </tr>
                </thead>
                <tbody>
                    <tr>`
        // $.map(DAYS, function (index, value) {
        for (index = 0; index < DAYS.length; index++) {
            if (index >= day) {
                if (parseInt(this.finalDate.date) == i && parseInt(this.finalDate.month) == month && parseInt(this.finalDate.year == year)) {
                    if (i < min_date || i > max_date) {
                        html += `<td class="disabled">${i}</td>`
                    } else {
                        html += `<td class="selected">${i}</td>`
                    }

                } else {
                    if (i < min_date || i > max_date) {
                        html += `<td class="disabled">${i}</td>`
                    } else {
                        html += `<td>${i}</td>`
                    }
                }
                i++;
            }
            else {
                html += `<td></td>`
            }
        }
        html += `</tr><tr>`
        for (x = 0; i <= total_days; x++) {
            if ((x % 7 == 0) && (x != 0)) {
                html += `</tr><tr>`
            }
            if (parseInt(this.finalDate.date) == i && parseInt(this.finalDate.month) == month && parseInt(this.finalDate.year) == year) {
                if (i < min_date || i > max_date) {
                    html += `<td class="disabled">${i}</td>`
                } else {
                    html += `<td class="selected">${i}</td>`
                }

            } else {
                if (i < min_date || i > max_date) {
                    html += `<td class="disabled">${i}</td>`
                } else {
                    html += `<td>${i}</td>`
                }
            }
            i++
        }
        html += `</tr></tbody></table>`
        $('.datetimepicker-container .body').attr('class', 'body datepicker')
        $('.datetimepicker-container .body.datepicker').html(html)
    }

    this.displayMonthPicker = function () {
        this.fillHeaderMonthPicker()
        this.fillBodyMonthPicker()
    }

    this.fillHeaderMonthPicker = function () {
        $('.datetimepicker-container .header').attr('class', 'header monthpicker')
        $('.datetimepicker-container .header.monthpicker').html(`<span> Select Month</span>`)
    }

    this.fillBodyMonthPicker = function () {
        $('.datetimepicker-container .body').attr('class', 'body monthpicker')
        let html = `<div class="month-container">`
        $.map(MONTHS, function (value, index) {
            html += `<div class="${index}">${value}</div>`
        })
        html += `</div> `
        $('.datetimepicker-container .body.monthpicker').html(html);
    }

    this.displayYearPicker = function () {
        let start_year = parseInt(this.viewingDate.year) - 5
        let end_year = parseInt(this.viewingDate.year) + 6
        this.fillHeaderYearPicker(start_year, end_year)
        this.fillBodyYearPicker(start_year, end_year)
    }

    this.displayNextDozenYears = function () {
        let current_end_year = $('.datetimepicker-container .header.yearpicker .current-dozen .end-year').text()
        let next_start_year = parseInt(current_end_year) + 1
        let next_end_year = parseInt(current_end_year) + 12
        this.fillHeaderYearPicker(next_start_year, next_end_year)
        this.fillBodyYearPicker(next_start_year, next_end_year)
    }

    this.displayPreviousDozenYears = function () {
        let current_start_year = $('.datetimepicker-container .header.yearpicker .current-dozen .start-year').text()
        let previous_start_year = parseInt(current_start_year) - 12
        let previous_end_year = parseInt(current_start_year) - 1
        this.fillHeaderYearPicker(previous_start_year, previous_end_year)
        this.fillBodyYearPicker(previous_start_year, previous_end_year)
    }

    this.fillHeaderYearPicker = function (start_year, end_year) {
        $('.datetimepicker-container .header').attr('class', 'header yearpicker')
        let html = `<span class="previous-dozen-years">
                    <i class="fa fa-chevron-left"></i>
                </span >
                <span class="current-dozen">
                    <span class="start-year">${start_year}</span> - <span class="end-year">${end_year}</span>
                </span>
                <span class="next-dozen-years">
                    <i class="fa fa-chevron-right"></i>
                </span>`
        $('.datetimepicker-container .header.yearpicker').html(html)
    }

    this.fillBodyYearPicker = function (start_year, end_year) {
        $('.datetimepicker-container .body').attr('class', 'body yearpicker')
        let html = `<div class="year-container"> `

        for (i = start_year; i <= end_year; i++) {

            if (i == this.finalDate.year) {
                html += `<div class="current-year ${i}">${i}</div>`
            } else {
                html += `<div class="${i}" >${i}</div>`
            }
        }
        html += `</div>`
        $('.datetimepicker-container .body.yearpicker').html(html);
    }

    this.toggleDateTimePickers = function () {
        if ($('.datetimepicker-container .footer .toggle').hasClass("time")) {
            //display timepicker
            this.displayTimePicker()

            //toggle footer icon
            this.toggleFooterIcon()

        } else {
            //display datepicker
            this.displayCalendar(this.viewingDate.month, this.viewingDate.year)

            //toggle footer icon
            this.toggleFooterIcon()
        }
    }

    this.toggleFooterIcon = function () {
        $('.datetimepicker-container .footer .toggle').children().toggleClass("fa-calendar-alt fa-clock")
        $('.datetimepicker-container .footer .toggle').toggleClass("time date")
    }

    this.displayTimePicker = function () {
        this.fillHeaderTimePicker()
        this.fillBodyTimePicker()
    }

    this.fillHeaderTimePicker = function () {
        $('.datetimepicker-container .header').attr('class', 'header timepicker')
        $('.datetimepicker-container .header.timepicker').html(`<span> Select Time</span> `)
    }

    this.fillBodyTimePicker = function () {
        let html = `<div class="time-container">
        <div class="hour-container">
            <div class="next-hour"><i class="fa fa-chevron-up"></i></div>
            <div class="hour">${this.finalTime.hour}</div>
            <div class="previous-hour"><i class="fa fa-chevron-down"></i></div>
        </div>
        <div class="separator-container">
            <span>:</span>
        </div>
        <div class="minute-container">
            <div class="next-minute"><i class="fa fa-chevron-up"></i></div>
            <div class="minute">${this.finalTime.minute}</div>
            <div class="previous-minute"><i class="fa fa-chevron-down"></i></div>
        </div>
        <div class="toggle-am-pm">
            ${this.finalTime.period}
        </div
                </div> `
        $('.datetimepicker-container .body').attr('class', 'body timepicker')
        $('.datetimepicker-container .body.timepicker').html(html);
    }

    this.displayHourPicker = function () {
        this.fillHeaderHourPicker()
        this.fillBodyHourPicker()
    }

    this.fillHeaderHourPicker = function () {
        $('.datetimepicker-container .header').attr('class', 'header hourpicker')
        $('.datetimepicker-container .header.hourpicker').html(`<span> Select Hour</span>`)
    }

    this.fillBodyHourPicker = function () {
        $('.datetimepicker-container .body').attr('class', 'body hourpicker')
        let html = `<div class="hour-container">`
        for (i = 1; i <= 12; i++) {
            html += `<div>${i}</div>`
        }
        html += `</div>`
        $('.datetimepicker-container .body.hourpicker').html(html);
    }

    this.displayMinutePicker = function () {
        this.fillHeaderMinutePicker()
        this.fillBodyMinutePicker()
    }

    this.fillHeaderMinutePicker = function () {
        $('.datetimepicker-container .header').attr('class', 'header minutepicker')
        $('.datetimepicker-container .header.hourpicker').html(`<span> Select Minute</span> `)
    }

    this.fillBodyMinutePicker = function () {
        $('.datetimepicker-container .body').attr('class', 'body minutepicker')
        let html = `<div class="minute-container"> `
        for (i = 0; i <= 59; i += 5) {
            html += `<div>${i}</div> `
        }
        html += `</div>`
        $('.datetimepicker-container .body.minutepicker').html(html);
    }
}

function formatDateTime(jsDateObject, dateObject, timeObject, format) {
    let token_regex = /%([d]{1,2}|[m]{1,2}|[y]{2,4}|[H]{1,2}|[h]{1,2}|[M]{1,2}|[S]{1,2}|[A,B,P,a,b,p])/gm
    let new_date = format.replace(token_regex, function (a, b) {
        switch (a) {
            case '%d':
                return dateObject.date
            case '%dd':
                if (dateObject.date < 10)
                    return "0" + dateObject.date
                else
                    return dateObject.date
            case '%m':
                return dateObject.month
            case '%mm':
                if (dateObject.month < 9)
                    return "0" + (dateObject.month + 1)
                else
                    return (dateObject.month + 1)
            case '%yy':
                return (dateObject.year % 100)
            case '%yyyy':
                return dateObject.year
            case '%h':
                return timeObject.hour
            case '%hh':
                if (timeObject.hour < 10)
                    return "0" + timeObject.hour
                else
                    return timeObject.hour
            case '%H':
                return jsDateObject.getHours()
            case '%HH':
                if (jsDateObject.getHours() < 10)
                    return "0" + jsDateObject.getHours()
                else
                    return jsDateObject.getHours()
            case '%M':
                return timeObject.minute
            case '%MM':
                if (timeObject.minute < 10)
                    return "0" + timeObject.minute
                else
                    return timeObject.minute
            case '%S':
                return jsDateObject.getSeconds()
            case '%SS':
                if (jsDateObject.getSeconds() < 10)
                    return "0" + jsDateObject.getSeconds()
                else
                    return jsDateObject.getSeconds()
            case '%P':
                return timeObject.period
                break
            case '%p':
                return timeObject.period.toLowerCase()
                break
            case '%a':
                return DAYS[jsDateObject.getDay()]
                break
            case '%A':
                return FULL_DAYS[jsDateObject.getDay()]
                break
            case '%b':
                return MONTHS[jsDateObject.month]
                break
            case '%B':
                return FULL_MONTHS[jsDateObject.month]
                break
        }
    })
    return new_date
}

function bindWidgetEvents() {
    this.widget.on('click', '.header.datepicker .select-month', function () {
        //display month picker
        this.displayMonthPicker();
        $('.datetimepicker-container .footer').hide()
    }.bind(this))
    this.widget.on('click', '.body.monthpicker .month-container div', function (e) {
        this.viewingDate.month = parseInt($(e.currentTarget)[0].className)
        // display calendar
        this.displayCalendar(this.viewingDate.month, this.viewingDate.year)
        //show footer
        $('.datetimepicker-container .footer').show()
    }.bind(this))
    this.widget.on('click', '.header.datepicker .previous-month', function () {
        let current_month = $('.datetimepicker-container .header.datepicker .select-month span')[0].className
        // get the previous value of current month
        if (current_month == 0) {
            this.viewingDate.month = 11
            this.viewingDate.year = parseInt($('.select-year').text()) - 1
        }
        else {
            this.viewingDate.month = current_month - 1
        }
        // display calendar
        this.displayCalendar(this.viewingDate.month, this.viewingDate.year)
    }.bind(this))
    this.widget.on('click', '.header.datepicker .next-month', function () {
        let current_month = $('.datetimepicker-container .header.datepicker .select-month span')[0].className
        // get the next value of current month
        if (current_month == 11) {
            this.viewingDate.month = 0
            this.viewingDate.year = parseInt($('.select-year').text()) + 1
        } else {
            this.viewingDate.month = parseInt(current_month) + 1
        }

        // display calendar
        this.displayCalendar(this.viewingDate.month, this.viewingDate.year)
    }.bind(this))
    this.widget.on('click', '.header.datepicker .next-year', function () {
        let year = $('.datetimepicker-container .header.datepicker .select-year').text()
        this.viewingDate.year = parseInt(year) + 1

        // display calendar
        this.displayCalendar(this.viewingDate.month, this.viewingDate.year)
    }.bind(this))
    this.widget.on('click', '.header.datepicker .previous-year', function () {
        let year = $('.datetimepicker-container .header.datepicker .select-year').text()
        this.viewingDate.year = parseInt(year) - 1

        // display calendar
        this.displayCalendar(this.viewingDate.month, this.viewingDate.year)
    }.bind(this))
    this.widget.on('click', '.header.datepicker .select-year', function () {

        // display year picker
        this.displayYearPicker()

        //hide footer
        $('.datetimepicker-container .footer').hide()
    }.bind(this))
    this.widget.on('click', '.body.yearpicker .year-container div', function (e) {
        //selected year
        this.viewingDate.year = $(e.currentTarget).text()

        //display calendar
        this.displayCalendar(this.viewingDate.month, this.viewingDate.year)

        //show footer
        $('.datetimepicker-container .footer').show()
    }.bind(this))
    this.widget.on('click', '.header.yearpicker .previous-dozen-years', function () {
        this.displayPreviousDozenYears()
    }.bind(this))
    this.widget.on('click', '.header.yearpicker .next-dozen-years', function () {
        this.displayNextDozenYears()
    }.bind(this))
    this.widget.on('click', '.footer .toggle', function () {
        this.toggleDateTimePickers()
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .hour', function (e) {
        this.finalTime.hour = $(e.currentTarget).val()
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .minute', function (e) {
        this.finalTime.minute = $(e.currentTarget).val()
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .hour-container .previous-hour', function () {
        if (this.finalTime.hour == 0) {
            this.finalTime.hour = 12
        } else {
            this.finalTime.hour = this.finalTime.hour - 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .hour').text(this.finalTime.hour)
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .hour-container .next-hour', function () {
        if (this.finalTime.hour == 12) {
            this.finalTime.hour = 0
        } else {
            this.finalTime.hour = parseInt(this.finalTime.hour) + 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .hour').text(this.finalTime.hour)
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .minute-container .previous-minute', function () {
        if (this.finalTime.minute == 0) {
            this.finalTime.minute = 60
        } else {
            this.finalTime.minute = this.finalTime.minute - 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .minute').text(this.finalTime.minute)
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .minute-container .next-minute', function () {
        if (this.finalTime.minute == 60) {
            this.finalTime.minute = 0
        } else {
            this.finalTime.minute = parseInt(this.finalTime.minute) + 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .minute').text(this.finalTime.minute)
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .hour', function () {
        this.displayHourPicker()
        $('.datetimepicker-container .footer').hide()
    }.bind(this))
    this.widget.on('click', '.body.timepicker .time-container .minute', function () {
        this.displayMinutePicker()
        $('.datetimepicker-container .footer').hide()
    }.bind(this))
    this.widget.on('click', '.body.hourpicker .hour-container div', function (e) {
        //save the selected month value
        this.finalTime.hour = $(e.currentTarget).text()
        this.updateDateObject()

        // display calendar
        this.displayTimePicker()

        //show footer
        $('.datetimepicker-container .footer').show()
    }.bind(this))
    this.widget.on('click', '.body.minutepicker .minute-container div', function (e) {
        //save the selected month value
        this.finalTime.minute = $(e.currentTarget).text()
        this.updateDateObject()

        // display calendar
        this.displayTimePicker()

        //show footer
        $('.datetimepicker-container .footer').show()
    }.bind(this))
    this.widget.on('click', '.body.timepicker .toggle-am-pm', function () {
        //save the selected month value
        if (this.finalTime.period == "AM") {
            this.finalTime.period = "PM"
            $('.datetimepicker-container .body.timepicker .toggle-am-pm').text("PM")
        } else {
            this.finalTime.period = "AM"
            $('.datetimepicker-container .body.timepicker .toggle-am-pm').text("AM")
        }
        this.updateDateObject()
        // display calendar
        // this.displayTimePicker()

        //show footer
        // $('.datetimepicker-container .footer').show()
    }.bind(this))
    this.widget.on('click', '.body.datepicker table td:not(.disabled)', function (e) {

        // add and remove class (for the design)
        $('.datetimepicker-container .body.datepicker table td').removeClass('selected')
        $(e.currentTarget).addClass('selected')

        // let min_date = new Date(datetimepicker_options['min_date'])
        // let max_date = new Date(datetimepicker_options['max_date'])

        // save selected date
        this.finalDate.date = $(e.currentTarget).text()
        this.finalDate.year = this.viewingDate.year
        this.finalDate.month = this.viewingDate.month

        this.updateDateObject()
    }.bind(this))
    this.updateDateObject = function(){
        //update date object
        var hr24;
        if(this.finalTime.period == "AM")
            hr24 = this.finalTime.hour
        else
            hr24 = parseInt(this.finalTime.hour) + 12
        
        this.dateObject = new Date(this.finalDate.year, this.finalDate.month, this.finalDate.date, hr24, this.finalTime.minute )
    }.bind(this)
}
