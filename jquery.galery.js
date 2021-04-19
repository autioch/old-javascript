/* Requires jQuery */

/* Example
 
    $(function() {
        var g = new qbGallery('#gallery1');
    })
 
 */

function qbGallery(list) {

    var self = this;
    self.list = list;

    self.init = function() {
        self.box = $("<div />");
        self.box.addClass('qbGalleryFrame');
        self.image = $("<img />");
        self.image.addClass('qbGalleryImage').appendTo(self.box);
        self.prev = $("<div />");
        self.prev.addClass('qbGalleryPrev qbGalleryButton').click(self.prevImage).appendTo(self.box);
        self.next = $("<div />");
        self.next.addClass('qbGalleryNext qbGalleryButton').click(self.nextImage).appendTo(self.box);
        self.close = $("<div />");
        self.close.addClass('qbGalleryClose qbGalleryButton').click(self.hide).appendTo(self.box);
        self.items = $("<div />");
        self.items.addClass('qbGalleryItems').appendTo(self.box);
        self.box.appendTo('body');
        $(list + '>li').click(function() {
            $(this).addClass('qbGaleryActive');
            self.show();
            return false;
        });
    };

    self.setImage = function() {
        self.active.removeClass('qbGaleryActive');
        self.active = $(this);
        self.image.attr('src', self.active.children('a').attr('href'));
        self.active.addClass('qbGaleryActive');
        return false;
    };

    self.prevImage = function() {
        if (self.active.prev().length) {
            self.active.prev().click();
        } else {
            self.active.parent().children('li:last').click();
        }
        return false;
    };

    self.nextImage = function() {
        if (self.active.next().length) {
            self.active.next().click();
        } else {
            self.active.parent().children('li:first').click();
        }
        return false;
    };

    self.hide = function() {
        self.box.fadeOut();
    };

    self.show = function() {
        /* fix this */
        self.items.children().remove();
        self.items.append($(self.list).clone());
        self.items.children().off('click').children().click(self.setImage);
        self.active = self.items.find('.qbGaleryActive');
        self.active.click();
        $(self.list).children().removeClass('qbGaleryActive');
        self.box.fadeIn();
        return false;
    };

    self.init();

}
