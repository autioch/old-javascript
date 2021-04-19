/* Requires jQuery */
(function($) {
	var l = "left", m = setInterval, o = $(window), p = document;
	if (!p.hasFocus) {
		p.hasFocus = function() {
			return 1
		};
	}
	function c() {
		if ((p.hasFocus()) && (30 > $(".qbs").length)) {
		/* better clone it */
			var d = $('<div class="qbs">*</div>'), e = 15 * Math.random() + 10;
			d.css({position: "absolute", top: 0, color: "#fff", "font-size": e, left: 0.8 * Math.random() * o.width()}).attr("e", e / 10).appendTo("body")
		}
	}
	function d() {
		if (p.hasFocus()) {
			var g = o.height(), h = o.width();
			$(".qbs").each(function() {
				var i = $(this);
				i.css("top", "+=" + parseFloat(i.attr("e")));
				i.css(l, "+=1");
				(parseInt(i.css("top")) + 12 > g || parseInt(i.css(l)) + 12 > h) && i.remove()
			})
		}
	}

	m(c, 1E3);
	m(d, 50)
})(jQuery);