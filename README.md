# DateNTimePickerActiveadmin
A datetimepicker, tailored for [ActiveAdmin](https://github.com/activeadmin/activeadmin).
<table>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/64245213/142817365-32fe4cd8-2314-4139-9fdc-4a0dd6c3f266.png">
        </td>
        <td>
            <img src="https://user-images.githubusercontent.com/64245213/142817454-b2f3a0ef-6ac8-48ef-90a7-22ece0220372.png">
        </td>
    </tr>
</table>
<br/><br/>

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'date_n_time_picker_activeadmin'
```

And then execute:

    $ bundle install

Or install it yourself as:

    $ gem install date_n_time_picker_activeadmin

<br/><br/>

## Usage

Code Sample

```ruby
f.input :column_name, as: :datetimepicker
```

CSS
In active_admin.scss, add the line,

```css
@import date_n_time_picker_activeadmin
```
JS
In active_admin.js, add the line,

```js
//= require date_n_time_picker_activeadmin
```

<br/><br/>

## Customisations

##### Add a Minimum Date
Disables all dates before the specified minimum date.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { min_date: Date.today }
```
##### Add a Maximum Date
Disables all dates after the specified minimum date.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { max_date: Date.today }
```
##### Specify a date format
Disables all dates after the specified minimum date.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { format: "%mm-%dd-%yyyy %HH:%MM:%SS %P"}
```
###### Example
<sub>Consider selected date is ```09 August 2021, 05:07:08 pm```, then format would be ```%dd %B %yyyy, %hh:%MM:%SS %p```</sub>

| <sub> Format Options </sub> | <sub> Meaning  </sub>                            | <sub> Example </sub>  |
| ---------------------------:|:------------------------------------------------:|:---------------------:|
| <sub> '%d' </sub>           | <sub> day (single digit) </sub>                  | <sub> 9 </sub>        |
| <sub> '%dd' </sub>          | <sub> day (2 digits) </sub>                      | <sub> 09 </sub>       |
| <sub> '%m' </sub>           | <sub> month (single digit) </sub>                | <sub> 8 </sub>        |
| <sub> '%mm' </sub>          | <sub> month (2 digits) </sub>                    | <sub> 08 </sub>       |
| <sub> '%yy' </sub>          | <sub> year (2 digits)  </sub>                    | <sub> 21 </sub>       |
| <sub> '%yyyy' </sub>        | <sub> year (4 digits)  </sub>                    | <sub> 2021 </sub>     |
| <sub> '%h' </sub>           | <sub> hour (12hr format, single digit) </sub>    | <sub> 5 </sub>        |
| <sub> '%hh' </sub>          | <sub> hour (12hr format, 2 digits) </sub>        | <sub> 05 </sub>       |
| <sub> '%H' </sub>           | <sub> hour (24hr format, single digit) </sub>    | <sub> 13 </sub>       |
| <sub> '%HH' </sub>          | <sub> hour (24hr format, 2 digits) </sub>        | <sub> 13 </sub>       |
| <sub> '%M' </sub>           | <sub> minutes (single digit) </sub>              | <sub> 7 </sub>        |
| <sub> '%MM' </sub>          | <sub> minutes (2 digits) </sub>                  | <sub> 07 </sub>       |
| <sub> '%S'  </sub>          | <sub> seconds (single digit) </sub>              | <sub> 8 </sub>        |
| <sub> '%SS' </sub>          | <sub> seconds (2 digits) </sub>                  | <sub> 08 </sub>       |
| <sub> '%P' </sub>           | <sub> time period in upper case </sub>           | <sub> AM/PM </sub>    |
| <sub> '%p' </sub>           | <sub> time period in lower case </sub>           | <sub> am/pm </sub>    |
| <sub> '%a' </sub>           | <sub> Day in words (short) </sub>                | <sub> Thu </sub>      |
| <sub> '%A' </sub>           | <sub> Day in words </sub>                        | <sub> Thursday </sub> |
| <sub> '%b' </sub>           | <sub> Month in words (short) </sub>              | <sub> Aug </sub>      |
| <sub> '%B' </sub>           | <sub> Month in words </sub>                      | <sub> August </sub>   |

##### Exclude Timepicker
Hides the timepicker.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { only_datepicker: true }
```

<br/><br/>

## Customize CSS
To change the major colors, you can use the following SASS variables:

|Variable Name                              |Default Value  | Description   |
|:------------------------------------------|:--------------|:--------------|
|$date-n-time-picker-primary-color          |![#339AF0](https://via.placeholder.com/15/339AF0/000000?text=+) #339AF0    |Header and Hover background color  |
|$date-n-time-picker-primary-text-color     |![#FFF](https://via.placeholder.com/15/FFF/000000?text=+) #FFF    |Header and Hover text color        |
|$date-n-time-picker-container-color        |![#FFF](https://via.placeholder.com/15/FFF/000000?text=+) #FFF    |DatetimePicker Container Background color  |
|$date-n-time-picker-container-text-color   |![#323537](https://via.placeholder.com/15/323537/000000?text=+) #323537    |Datetimepicker container Text Color    |

**Please make sure to define these variables before importing the datetimepicker's stylesheet.**

For Example,

> // active_admin.scss
>
> ```
> $date-n-time-picker-primary-color: red; //make sure this comes first, before importing datetimepicker's stylesheet
> @import "date_n_time_picker_activeadmin"
> ```
<br/>

_Note: All the CSS classes used for the datetimepicker elements can be overridden in your stylesheet. To know more, check the default stylesheet [here](https://github.com/NikhithaGraceJosh/date_n_time_picker_activeadmin/blob/master/vendor/assets/stylesheets/datetimepicker.scss)._

<br/><br/>

## Customise the Toggle Icon
To customize the toggle icon, create a .js file to store the following variables and require it before requiring datetimepicker's javascript file:

|Variable Name                              |Default Value  | Description   |
|:------------------------------------------|:--------------|:--------------|
|toggleTimeIcon          |```<i class="far fa-clock"></i>``` |Stores the element to be displayed as the toggle time icon  |
|toggleCalendarIcon    |```<i class="far fa-calendar-alt"></i>``` |Stores the element to be displayed as the toggle time icon       |


<table>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/64245213/142817888-c7163a42-a203-4d82-a960-3064006f0a19.png">
        </td>
        <td>
            <img src="https://user-images.githubusercontent.com/64245213/142817898-7d17427f-4637-46ef-bfee-d2e18437401e.png">
        </td>
    </tr>
</table>

For Example,

> // var.js
> 
> ```
> var toggleTimeIcon = '<div>TIME</div'
> var toggleCalendarIcon = '<div>CALENDAR</div>'
> ```

> // active_admin.js
>
> ```
> //= require var.js //make sure this comes first, before requiring datetimepicker's javascript file
> //= require date_n_time_picker_activeadmin.js
> ```

**Please make sure to define these variables before requiring the datetimepicker's javascript file.**

<br/><br/>

## Testing
To run tests,
```ruby
RAILS_ENV=test rspec spec
```

<br/><br/>

## Patches/Pull Requests
Bug reports and pull requests are welcome on GitHub at https://github.com/NikhithaGraceJosh/date_n_time_picker_activeadmin. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/NikhithaGraceJosh/date_n_time_picker_activeadmin/blob/master/CODE_OF_CONDUCT.md).

1. Clone the project
2. Checkout your own feature (or bug fix) branch from the `master` branch (git checkout -b my-new-proposed-feature)
3. Commit the changes (git commit -m 'New Proposed feature')
4. Push the changes to the `my-new-proposed-feature` branch (git push origin my-new-proposed-feature)
5. Create new Pull Request

<br/><br/>

## Code of Conduct
Everyone interacting in the DateNTimePickerActiveadmin project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/NikhithaGraceJosh/date_n_time_picker_activeadmin/blob/master/CODE_OF_CONDUCT.md).

<br/><br/>

## Copyright
Copyright (c) 2021 NikhithaGraceJosh. See [LICSENCE](https://github.com/NikhithaGraceJosh/date_n_time_picker_activeadmin/blob/master/LICENSE) for more details.

