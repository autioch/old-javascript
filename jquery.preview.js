(function($) {
    var previewMethods = {
        init: function(options) {
            var config = $.extend({
                width: '200',
                height: '100',
                widthTitle: 'Width',
                heightTitle: 'Height',
                toggleTitle: '_',
                visible: true,
                id: ''
            }, options);

            return this.each(function() {
                var el = $(this);
                var wInput = $('<input />');
                var hInput = $('<input />');
                var content = $('<div />');
                var tools = $('<div />');
                var box = $('<div />');
                var p = 'preview';

                $('<span />').addClass(p + 'WidthTitle').html(config.widthTitle).appendTo(tools);

                wInput.addClass(p + 'WidthInput').val(config.width).appendTo(tools).keyup(function() {
                    content.css('width', parseInt($(this).val()));
                });

                $('<span />').addClass(p + 'HeightTitle').html(config.heightTitle).appendTo(tools);

                hInput.addClass(p + 'HeightInput').val(config.height).appendTo(tools).keyup(function() {
                    content.css('height', parseInt($(this).val()));
                });

                $('<span />').addClass(p + 'Toggle').html(config.toggleTitle).appendTo(tools).click(function() {
                    content.toggle();
                });

                tools.addClass(p + 'Tools').appendTo(box);
                content.addClass(p + 'Content').appendTo(box).css({
                    overflow: 'auto',
                    width: parseInt(wInput.val()),
                    height: parseInt(hInput.val())
                });
                box.addClass(p + 'Box').css({
                    position: 'absolute',
                    display: (config.visible ? 'block' : 'none')
                }).appendTo('body');

                var id = (config.id.length > 0) ? config.id : (el.attr('id') + 'Preview');
                if (id.length > 0) {
                    box.attr('id', id);
                }
                ;
                el.keyup(function() {
                    content.html(el.val());
                });
                content.html(el.val());
            });
        }
    };

    $.fn.preview = function(method) {
        if (previewMethods[method]) {
            return previewMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return previewMethods.init.apply(this, arguments);
        } else {
            $.error('No such method: ' + method);
        }
    };
})(jQuery);

