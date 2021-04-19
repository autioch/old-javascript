((function($, _, config, data) {

    var planner = {
        init: function() {

            _.bindAll();
            this.buildTable();
            //this.setCss();
            $(window).on('resize', this.setCss);
            this.buildLessons();
            this.setDraggable();
            this.setDroppable();
            this.attachEvents();

        },
        buildTable: function() {

            var tr = $('<tr/>');
            tr.append('<td class="day-label-header"/>');
            _.each(config.times, function(time) {
                tr.append('<th class="day-time-header">' + time + '</th>');
            });
            tr.append('<td class="day-label-header"/>').appendTo('.day-description');

            _.each(config.days, function(day) {
                tr = $('<tr class="day" />');
                tr.append('<td class="day-label">' + day + '</td>').appendTo('#day-wrapper');
                _.each(config.times, function() {
                    tr.append('<td class="day-time"><div class="day-time-container"/></div>');
                });
                tr.append('<td class="day-label">' + day + '</td>');
            });
        },
        setCss: function() {
            $('#custom-styles').remove();
            var style = '.lesson-wrapper{height:' + $('.day-time').height() + 'px;width:' + $('.day-time').width() + 'px}';
            $('head').append('<style id="custom-styles" type="text/css">' + style + '</style>');
        },
        buildLessons: function() {
            var wrapper;

            _.each(lessons, function(lesson, id) {
                wrapper = $('<div class="lesson-wrapper" data-lesson="' + id + '"/>');
                wrapper.append('<div class="lesson-container ' + (config.durations[lesson.duration] || '') + '" style="background-color:' + lesson.color + '">' + lesson.label + '</div>');
                wrapper.appendTo('#lessons');
                this.setAvailableHours(lesson, id);
            }, this);
        },
        setAvailableHours: function(lesson, id) {
            var cell, option;
            _.each(lesson.hours, function(hour) {
                cell = $('#day-wrapper>tr:nth-child(' + (hour.day + 1) + ')>.day-time:nth-child(' + (hour.time + 2) + ')>.day-time-container');
                option = $('<div class="day-time-option" data-lesson="' + id + '" style="background-color: ' + lesson.color + '" >' + hour.group + '</div>');
                if (config.places[hour.place].class) {
                    option.addClass(config.places[hour.place].class);
                }
                cell.append(option);
            });
        },
        setDraggable: function() {
            $('.lesson-wrapper').draggable({
                helper: 'clone',
                appendTo: 'body',
                revert: 'invalid'
            });
        },
        setDroppable: function() {
            $('.day-time-container').droppable({
                drop: function(event, ui) {
                    $(this).parent().append(ui.draggable);
                    if (!$('#lessons>.lesson-wrapper').length) {
                        $('#lessons').addClass('is-empty');
                        $('#day-table').addClass('is-full');
                        planner.setCss();
                    }
                },
                hoverClass: 'is-hovered',
            });
        },
        print: function() {
            var container = $('.js-day-print'), tr, td, cell, lesson, group;
            container.empty();
            $('#day-wrapper>.day').each(function(row, day) {
                tr = $('<tr class="day" />');
                $(day).children().each(function(col, hour) {
                    cell = $(hour);
                    if (cell.hasClass('day-label')) {
                        tr.append(cell.clone());
                        return;
                    }

                    if (!cell.children('.lesson-wrapper').length) {
                        tr.append('<td class="day-time" />');
                        return;
                    }

                    td = $('<td class="day-time" />');

                    cell.children('.lesson-wrapper').each(function(index, item) {
                        lesson = $(item).clone().removeClass('ui-draggable');
                        group = cell.find('.day-time-option[data-lesson="' + lesson.data('lesson') + '"]');
                        lesson.children().append('<div>Grupa: ' + (group.length ? group.html() : 'brak (błędna pozycja)') + '</div>').end().appendTo(td);
                    });

                    tr.append(td);
//day-time
                });
                container.append(tr);
            });
            container.append(content);
            this.showPrint();
        },
        showPrint: function() {
            $('.cover.js-print-wrapper').fadeIn(function() {
                $('#print-wrapper').fadeIn();
            });
        },
        attachEvents: function() {
            $('.js-print').on('click', this.print.bind(this));
            $('.js-close').on('click', function() {
                $(this).parent().fadeOut(function() {
                    $('.cover.js-print-wrapper').fadeOut();
                });
            });
        }
    };

    planner.init();

}(jQuery, _, window.config, window.data)));