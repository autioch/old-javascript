((function($, _, config, data) {

    var lessonAdd = {
        init: function() {
            this.buildHourField();
            this.attachEvents();
        },
        buildHourField: function() {
            var days, hours, places, teachers, template = $('.js-hour-template');

            days = template.find('.js-hour-day');
            _.each(config.days, function(day, key) {
                days.append('<option value="' + key + '">' + day + '</option>');
            });

            hours = template.find('.js-hour-time');
            _.each(config.times, function(time, key) {
                hours.append('<option value="' + key + '">' + time + '</option>');
            });

            places = template.find('.js-hour-place');
            _.each(config.places, function(place, key) {
                places.append('<option value="' + key + '">' + place.label + '</option>');
            });

            teachers = template.find('.js-hour-teacher');
            _.each(config.teachers, function(teacher, key) {
                teachers.append('<option value="' + key + '">' + teacher.label + '</option>');
            });

            this.hourFieldTemplate = template.children();
        },
        attachEvents: function() {
            $('.js-add-hour').on('click', this.addHour.bind(this));
            $('.js-clear').on('click', this.clearForm.bind(this));
            $('.js-convert').on('click', this.convert.bind(this));
        },
        addHour: function() {
            $('.js-hours').append(this.hourFieldTemplate.clone());
        },
        clearForm: function() {
            $('.js-label').val('');
            $('.js-color').val('');
            $('.js-duration').val('');
            $('.js-hour-day').val(-1);
            $('.js-hour-time').val(-1);
            $('.js-hour-place').val(-1);
            $('.js-hour-teacher').val(-1);
            $('.js-hours').empty();
        },
        convert: function() {
            var result = '0: {', $el;
            result += '\n\t label: "' + $('.js-label').val() + '",';
            result += '\n\t color: "#' + $('.js-color').val() + '",';
            result += '\n\t duration: ' + $('.js-duration').val() + ',';
            result += '\n\t hours: [';
            $('.js-hours>.hour-container').each(function(index, item) {
                $el = $(item);
                result += '\n\t\t {';
                result += '\n\t\t\t day: ' + $el.find('.js-hour-day').val() + ',';
                result += '\n\t\t\t time: ' + $el.find('.js-hour-time').val() + ',';
                result += '\n\t\t\t place: ' + $el.find('.js-hour-place').val() + ',';
                result += '\n\t\t\t teacher: ' + $el.find('.js-hour-teacher').val() + ',';
                result += '\n\t\t\t group: ' + $el.find('.js-hour-group').val();
                result += '\n\t\t },';
            });
            result += '\n\t ] \n },';

            $('.js-result').html(result);
        }
    };

    lessonAdd.init();

}(jQuery, _, window.config, window.data)));