/* Requires jQuery */

function qbDragable(selector) {
    var ox = 0, oy = 0, el;

    var qbDragStart = function(e) {
        el = $(this);
        ox = e.pageX - parseFloat(el.css('left'), 10);
        oy = e.pageY - parseFloat(el.css('top'), 10);
        $(document).on('mousemove', qbDragPos);
    };

    var qbDragStop = function() {
        $(document).off('mousemove', qbDragPos);
    };

    var qbDragPos = function(e) {
        el.css({
            top: e.pageY - oy,
            left: e.pageX - ox
        });
    };

    $(selector).each(function() {
        $(this).on('mousedown', qbDragStart).on('mouseup', qbDragStop);
    });

}

function qbDragableHandle(element, handle) {
    var ox = 0, oy = 0, el = $(element);

    var qbDragStart = function(e) {
        ox = e.pageX - parseFloat(el.css('left'), 10);
        oy = e.pageY - parseFloat(el.css('top'), 10);
        $(document).on('mousemove', qbDragPos);
    };

    var qbDragStop = function() {
        $(document).off('mousemove', qbDragPos);
    };

    var qbDragPos = function(e) {
        el.css({
            top: e.pageY - oy,
            left: e.pageX - ox
        });
    };

    $(handle).on('mousedown', qbDragStart).on('mouseup', qbDragStop);

}

/* work in progress */
function qbDragableInContainer(sel, container) {
    var ox = 0, oy = 0, oxc = 0, oyc = 0, el = $(sel), con = $(container);

    var qbDragStart = function(e) {
        ox = e.pageX - parseFloat(el.css('left'), 10);
        oy = e.pageY - parseFloat(el.css('top'), 10);
        oxc = e.pageX - parseFloat(con.css('left'), 10);
        oyc = e.pageY - parseFloat(con.css('top'), 10);

        $(document).on('mousemove', qbDragPos);
        $(document).on('mouseup', qbDragStop);
    };

    var qbDragStop = function() {
        $(document).off('mousemove', qbDragPos);
    };

    var qbDragPos = function(e) {
        if (e.pageX < oxc) {
            el.css({
                left: oxc
            });
            return;
        }
        if (e.pageX + el.width() > oxc + con.width()) {
            el.css({
                left: con.width() - el.width()
            });
            return;
        }
        if (e.pageY < oyc) {
            el.css({
                top: oyc
            });
            return;
        }
        if (e.pageY > oyc + con.height()) {
            el.css({
                top: con.height() - el.height()
            });
            return;
        }
        el.css({
            top: e.pageY - oy,
            left: e.pageX - ox
        });
    };

    el.on('mousedown', qbDragStart).on('mouseup', qbDragStop);
}
