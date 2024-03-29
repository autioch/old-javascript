var qbLib = qbLib || {};
(function(q) {
    "use strict";
    var $ = jQuery;
    q.distance = function(x1, x2, y1, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
    q.random = function(max, min) {
        var m = min || 0;
        return Math.floor(Math.random() * (max - m + 1)) + m;
    };
    q.dump = function(item, withValue) {
        var d, acc;
        d = item || q;
        acc = [];
        $.each(d, function(index, value) {
            acc.push(index + (withValue ? ' : ' + value : ' : ' + typeof value));
        });
        return'<pre>' + acc.join('\n').replace(/\</i, '&lt;').replace(/\>/i, '&gt;') + '</pre>';
    };
    q.sounds = function(location) {
        var x = this;
        x._l = location || '';
        x.addSound = function(name, value) {
            x[name] = function() {
                return x;
            };
            try {
                var a = new Audio();
                if (a.canPlayType('audio/' + value.split('.').pop()) !== '') {
                    a.src = x._l + value;
                    x['_' + name] = a;
                    x[name] = function() {
                        if (q.sound) {
                            x['_' + name].pause();
                            x['_' + name].currentTime = 0;
                            x['_' + name].play();
                        }
                        ;
                        return x;
                    };
                }
                ;
            } catch (e) {
            }
            ;
            return x;
        };
        x.parseSounds = function(arr) {
            for (var i in arr) {
                x.addSound(i, arr[i]);
            }
            ;
            return x;
        };
    };
    q.loader = function(jsprefix, cssprefix) {
        var x = this;
        x._css = cssprefix || '';
        x.cssprefix = function(p) {
            if (p !== null) {
                x._css = p;
                return x;
            }
            ;
            return x._css;
        };
        x.loadCss = function(arr) {
            for (var i in arr) {
                $('<link rel="stylesheet" type="text/css" href="' + x._css + arr[i] + '" >').appendTo("head");
            }
            ;
            return x;
        };
        x._js = jsprefix || '';
        x.jsprefix = function(p) {
            if (p !== null) {
                x._js = p;
                return x;
            }
            ;
            return x._js;
        };
        x.loadJs = function(scriptList, i, callback) {
            if ((scriptList.length - 1) === i) {
                $.getScript(x._p + scriptList[i], callback);
            } else {
                $.getScript(x._p + scriptList[i], function() {
                    x.loadJs(scriptList, ++i, callback);
                });
            }
        };
    };
    q.mobile = function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    q.install = function(location, log, success, error, notice) {
        if (window.navigator.mozApps) {
            log.click(function() {
                var request = window.navigator.mozApps.install(location);
                request.onsuccess = function() {
                    log.html(success);
                };
                request.onerror = function() {
                    log.html(error + this.error.name);
                };
            });
        } else {
            log.html(notice);
        }
    };
    function b(qbc) {
        var x = this;
        x.tl = qbc ? false : true;
        x.div = $("<div />");
        x.div.addClass('qbGameObject ' + x.constructor.toString().match(/^function\s*([^\s(]+)/)[1]);
        x.container = qbc || $('body');
        x.div.appendTo(qbc ? x.container.div : $('body'));
        x.presentSpeed = 0;
        x.disposed = false;
        x.setDiv = function(newDiv, clear) {
            x.div.children().detach().appendTo(newDiv);
            if (clear) {
                x.div.remove();
            }
            x.div = newDiv;
            x.container = x.div.parent();
            x.refresh();
        };
        x.refresh = function() {
            x.left = parseInt(x.div.css('left'), 10);
            x.top = parseInt(x.div.css('top'), 10);
            x.width = x.div.outerWidth();
            x.height = x.div.outerHeight();
            return x;
        };
        x.locate = function(topp, leftp) {
            x.div.css({left: leftp + 'px', top: topp + 'px'});
            return x.refresh();
        };
        function locateRandom() {
            x.refresh();
            return x.locate(q.random(x.container.height - x.height), q.random(x.container.width - x.width));
        }
        ;
        function locateRandomBody() {
            x.refresh();
            return x.locate(q.random($(window).height() - x.height), q.random($(window).width() - x.width));
        }
        ;
        x.locateRandom = x.tl ? locateRandomBody : locateRandom;
        function center(addTop, addLeft) {
            x.refresh();
            var w, h;
            w = addLeft ? (x.width - parseInt(addLeft, 10)) : x.width;
            h = addLeft ? (x.height - parseInt(addTop, 10)) : x.height;
            return x.locate((x.container.height - h) / 2, (x.container.width - w) / 2);
        }
        ;
        function centerBody(addTop, addLeft) {
            x.refresh();
            var w, h;
            w = addLeft ? (x.width - parseInt(addLeft, 10)) : x.width;
            h = addLeft ? (x.height - parseInt(addTop, 10)) : x.height;
            return x.locate(($(window).height() - h) / 2, ($(window).width() - w) / 2);
        }
        ;
        x.center = x.tl ? centerBody : center;
        x.centerAlways = function(addTop, addLeft) {
            $(window).resize(function() {
                x.center(addTop, addLeft);
            });
            x.centerDispose = x.dispose;
            x.dispose = function(recursive) {
                $(window).unbind('resize');
                x.centerDispose(recursive);
            };
            return x.center(addTop, addLeft);
        };
        x.prop = function(name, value) {
            if (value) {
                x._remClassRegEx(name).div.addClass(name + value);
                x[name] = value;
            }
            ;
            return value ? x : x[name];
        };
        x._remClassRegEx = function(regex) {
            var classes, classArray, i, len;
            classArray = [];
            classes = x.div.attr('class').split(' ');
            for (i = 0, len = classes.length; i < len; i++) {
                if (!classes[i].match(regex)) {
                    classArray.push(classes[i]);
                }
                ;
            }
            ;
            x.div.attr('class', classArray.join(' '));
            return x;
        };
        x.size = function(width, height, center) {
            x.div.css({'height': height, 'width': width});
            return center ? x.center() : x.refresh();
        };
        x.parseCss = function(array, center) {
            x.div.css(array);
            return center ? x.center() : x.refresh();
        };
        x.dispose = function(recursive) {
            x.div.unbind().remove();
            delete x.container;
            if (recursive) {
                for (var i in x) {
                    if (x[i].dispose) {
                        x[i].dispose(true);
                    }
                    ;
                    delete x[i];
                }
                ;
            }
            ;
            x.disposed = true;
            return x;
        };
        x.present = function(speed, callback) {
            var c;
            switch (typeof speed) {
                case'undefined':
                    c = undefined;
                    break;
                case'function':
                    c = speed;
                    break;
                default:
                    x.presentSpeed = speed;
                    c = callback;
            }
            ;
            x.div.fadeIn(x.presentSpeed, c);
            return x;
        };
        x.show = function() {
            x.div.show(0);
            return x;
        };
        x.hide = function() {
            x.div.hide(0);
            return x;
        };
        x.log = function(s) {
            $('body').append('<div>' + s + '</div>');
        };
        x.addBorders = function(t, r, b, l) {
            bb.call(x, t, r, b, l);
            return x;
        };
        x.refresh();
    }
    ;
    function a() {
        var x = this;
        x.paused = false;
        x.started = false;
        x.onStart = function() {
        };
        x.onStop = function() {
        };
        x.onPause = function() {
        };
        x.onResume = function() {
        };
        x.start = function(arg) {
            x.started = true;
            x.paused = false;
            x.onStart(typeof arg === 'undefined' ? x : arg);
        };
        x.pause = function(arg) {
            if (x.started) {
                x.started = true;
                x.paused = true;
                x.onPause(typeof arg === 'undefined' ? x : arg);
            }
            ;
            return x;
        };
        x.resume = function(arg) {
            if (x.started) {
                x.started = true;
                x.paused = false;
                x.onResume(typeof arg === 'undefined' ? x : arg);
            }
            ;
            return x;
        };
        x.stop = function(arg) {
            x.started = false;
            x.paused = true;
            x.onStop(typeof arg === 'undefined' ? x : arg);
            return x;
        };
    }
    ;

    ;
    function bb(t, r, b, l) {
        var x = this;
        x.addBorders = function(t, r, b, l) {
            x._borders = {};
            x._bw = 0;
            x._bh = 0;
            if (l) {
                x._borders.l = new qbBorderVertical(x, 0, 0, 0);
                x._bw = x._borders.l.width / 2;
                x._borders.l.present();
            }
            ;
            if (r) {
                x._borders.r = new qbBorderVertical(x, 0, 0, 0);
                x._bw = x._borders.r.width / 2;
                x._borders.r.present();
            }
            ;
            if (b) {
                x._borders.b = new qbBorderHorizontal(x, 0, 0, 0);
                x._bh = x._borders.b.height / 2;
                x._borders.b.present();
            }
            ;
            if (t) {
                x._borders.t = new qbBorderHorizontal(x, 0, 0, 0);
                x._bh = x._borders.t.height / 2;
                x._borders.t.present();
            }
            ;
            x.borderRefresh = x.refresh;
            x.refresh = function() {
                x.borderRefresh();
                x.resizeBorders();
                return x;
            };
            return x.resizeBorders();
        };
        x.resizeBorders = function() {
            if (x._borders.t) {
                x._borders.t.locate(-x._bh, -x._bh / 2).size(x.width + x._bh, x._bh * 2);
            }
            ;
            if (x._borders.r) {
                x._borders.r.locate(-x._bw / 2, x.width - x._bw).size(x._bw * 2, x.height + x._bw);
            }
            ;
            if (x._borders.b) {
                x._borders.b.locate(x.height - x._bh, -x._bh / 2).size(x.width + x._bh, x._bh * 2);
            }
            ;
            if (x._borders.l) {
                x._borders.l.locate(-x._bw / 2, -x._bw).size(x._bw * 2, x.height + x._bw);
            }
            ;
            return x;
        };
        x.hideBorders = function() {
            if (x._borders.t) {
                x._borders.t.hide();
            }
            ;
            if (x._borders.r) {
                x._borders.r.hide();
            }
            ;
            if (x._borders.b) {
                x._borders.b.hide();
            }
            ;
            if (x._borders.l) {
                x._borders.l.hide();
            }
            ;
            return x;
        };
        x.showBorders = function() {
            if (x._borders.t) {
                x._borders.t.show();
            }
            ;
            if (x._borders.r) {
                x._borders.r.show();
            }
            ;
            if (x._borders.b) {
                x._borders.b.show();
            }
            ;
            if (x._borders.l) {
                x._borders.l.show();
            }
            ;
            return x;
        };
        x.addBorders(t, r, b, l);
    }
    ;
    function qbClock(qbc) {
        b.call(this, qbc);
        var x = this;
        x.timeout = 0;
        x._f = function(i) {
            return i < 10 ? '0' + i : i;
        };
        x.start = function() {
            var now, h, m, s;
            now = new Date();
            h = now.getHours();
            m = x._f(now.getMinutes());
            s = x._f(now.getSeconds());
            x.div.html(h + ':' + m + ':' + s);
            x.timeout = setTimeout(x.start, 500);
        };
        x.oldDispose = x.dispose;
        x.dispose = function() {
            clearTimeout(x.timeout);
            x.start = null;
            x.oldDispose();
        };
        x.start();
    }
    ;
    function qbStatField(qbc, id, desc, title, max, val) {
        b.call(this, qbc);
        var x = this;
        x._ddiv = $('<div class="desc" />');
        x.div.append(x._ddiv);
        x._v = 0;
        x._vdiv = $('<div class="val" />');
        x.div.append(x._vdiv);
        x._sdiv = $('<div class="separator"> / </div>');
        x.div.append(x._sdiv);
        x._m = 0;
        x._mdiv = $('<div class="max" />');
        x.div.append(x._mdiv);
        x.val = function(num) {
            if ($.isNumeric(num)) {
                x._v = num;
                x._vdiv.html(x._v);
                return x;
            }
            ;
            return x._v;
        };
        x.max = function(num) {
            if ($.isNumeric(num)) {
                x._m = num;
                x._mdiv.html(x._m);
                return x;
            }
            ;
            return x._m;
        };
        x.valInc = function(num) {
            x._v += $.isNumeric(num) ? num : 1;
            x._vdiv.html(x._v);
            return x;
        };
        x.maxInc = function(num) {
            x._m += $.isNumeric(num) ? num : 1;
            x._mdiv.html(x._m);
            return x;
        };
        x.valDec = function(num) {
            x._v -= $.isNumeric(num) ? num : 1;
            x._vdiv.html(x._v);
            return x;
        };
        x.maxDec = function(num) {
            x._m -= $.isNumeric(num) ? num : 1;
            x._mdiv.html(x._m);
            return x;
        };
        x.maxHide = function() {
            x._sdiv.hide(0);
            x._mdiv.hide(0);
            return x;
        };
        x.maxShow = function() {
            x._sdiv.show(0);
            x._mdiv.show(0);
        };
        x.desc = function(desc) {
            if (desc !== null) {
                x._ddiv.html(desc);
                return x;
            }
            ;
            return x._ddiv.html();
        };
        x.title = function(title) {
            if (title !== null) {
                x.div.attr('title', title);
                return x;
            }
            ;
            return x.div.attr('title');
        };
        x.desc(desc || '').title(title || '').val(val || 0).max(max || 0).div.attr('id', 'qbStat' + id);
    }
    ;
    function qbStatistics(qbc) {
        b.call(this, qbc);
        var x = this;
        x.statCount = 0;
        x.parseConfig = function(obj) {
            var a, item;
            for (item in obj) {
                a = obj[item];
                x.add(item, a.desc, a.title, a.max, a.val);
                if (!a.limited) {
                    x[item].maxHide();
                }
                ;
            }
            ;
            return x;
        };
        x.add = function(name, desc, title, max, value) {
            x[name] = new qbStatField(x, name, desc, title, max, value);
            x[name].present();
            x.statCount++;
            return x;
        };
        x.rem = function(name) {
            x[name].dispose();
            delete x[name];
            x.statCount--;
            x.resizeStats();
            return x;
        };
        x.resizeStats = function() {
            x.div.children('div').css('width', x.div.innerWidth() / x.statCount);
            return x;
        };
        x.val = function(name, value) {
            x[name].val(value);
            return x;
        };
    }
    ;
    function qbBackground() {
        b.call(this);
        var x = this;
        x.cover = function() {
            x.div.css({'height': $(window).height(), 'width': $(window).width()});
            x.refresh();
        };
        $(window).resize(x.cover);
        x.cover();
    }
    ;
    function qbMessageScreen(qbc) {
        b.call(this, qbc);
        bb.call(this, true, true, true, true);
        var x = this;
        x._tdiv = $('<div class="qbMessageTitle" />');
        x.div.append(x._tdiv);
        x._cdiv = $('<div class="qbMessageContent" />');
        x.div.append(x._cdiv);
        x._ediv = $('<div class="qbMessageExtra" />');
        x.div.append(x._ediv);
        x._fdiv = $('<div class="qbMessageFollow" />');
        x.div.append(x._fdiv);
        x.message = function(title, content, extra, follow) {
            x._t = (typeof (title) === 'undefined') ? '' : title;
            x._c = (typeof (content) === 'undefined') ? '' : content;
            x._e = (typeof (extra) === 'undefined') ? '' : extra;
            x._f = (typeof (follow) === 'undefined') ? '' : follow;
            x._t.length > 0 ? x._tdiv.html(x._t).show() : x._tdiv.hide();
            x._c.length > 0 ? x._cdiv.html(x._c).show() : x._cdiv.hide();
            x._e.length > 0 ? x._ediv.html(x._e).show() : x._ediv.hide();
            x._f.length > 0 ? x._fdiv.html(x._f).show() : x._fdiv.hide();
            x.center();
            return x;
        };
        x.follow = function(callback) {
            x.div.unbind('click').click(function() {
                x.div.unbind('click').stop().hide(0);
                callback();
            });
            return x;
        };
        x.chain = function(list, func, i) {
            i = i || 0;
            if ((list.length - 1) === i) {
                x.follow(func);
            } else {
                x.follow(function() {
                    x.chain(list, func, i + 1);
                });
            }
            ;
            x.message(list[i].title, list[i].content, list[i].extra, list[i].follow).present();
        };
        x.centerAlways();
    }
    ;
    function qbSplashAlert(qbc) {
        b.call(this, qbc);
        var x = this;
        x.div.click(function() {
            $(this).stop(true, true).hide(0);
        });
        x.splash = function(message, color, bg) {
            x.div.stop(true, true).show(0).css({'color': color || '#f00', 'background-color': bg || 'transparent'}).html(message);
            x.center().div.fadeOut(message.length * 50);
        };
    }
    ;
    function qbOptionSpace(qbc, id, height) {
        b.call(this, qbc);
        this.div.attr('id', 'qbOption' + id).css('height', height);
    }
    ;
    function qbOptionTitle(qbc, id, desc) {
        b.call(this, qbc);
        this.div.attr('id', 'qbOption' + id).html(desc);
    }
    ;
    function qbOptionButton(qbc, id, desc, title) {
        b.call(this, qbc);
        var x = this;
        x._e = true;
        x.action = function(action) {
            x.div.unbind('mousedown').mousedown(action);
            return x;
        };
        x.desc = function(desc) {
            if (desc !== null) {
                x.div.html(desc);
                return x;
            }
            ;
            return x.div.html();
        };
        x.title = function(title) {
            if (title !== null) {
                x.div.attr('title', title);
                return x;
            }
            ;
            return x.div.attr('title');
        };
        x.desc(desc || '').title(title || '').div.attr('id', 'qbOption' + id);
        x.pressed = function(bool) {
            if (bool !== null) {
                x._e = bool;
                x._e ? x.div.addClass('pressed') : x.div.removeClass('pressed');
                return x;
            }
            ;
            return x._e;
        };
    }
    ;
    function qbOptionBorder(qbc, id) {
        b.call(this, qbc);
        this.div.attr('id', 'qbOption' + id);
    }
    ;
    function qbOptions(qbc) {
        b.call(this, qbc);
        var x = this;
        x.parseConfig = function(obj) {
            var a, item;
            for (item in obj) {
                a = obj[item];
                switch (a.type) {
                    case'space':
                        x.addSpace(item, a.height);
                        break;
                    case'title':
                        x.addTitle(item, a.desc);
                        break;
                    case'button':
                        x.addButton(item, a.desc, a.title);
                        break;
                    case'border':
                        x.addBorder(item);
                        break;
                }
                ;
                if (a.visible) {
                    x[item].present();
                }
                ;
            }
            ;
            return x;
        };
        x.addSpace = function(id, height) {
            x[id] = new qbOptionSpace(x, id, height);
            return x;
        };
        x.addButton = function(id, desc, title) {
            x[id] = new qbOptionButton(x, id, desc, title);
            return x;
        };
        x.addTitle = function(id, desc) {
            x[id] = new qbOptionTitle(x, id, desc);
            return x;
        };
        x.addBorder = function(id) {
            x[id] = new qbOptionBorder(x, id);
            return x;
        };
        x.remove = function(name) {
            x[name].dispose();
            delete x[name];
            return x;
        };
    }
    ;
    function qbContainer(id, centerA) {
        b.call(this);
        var x = this;
        x.div.attr('id', id);
        bb.call(this, true, true, true, true);
        centerA && x.centerAlways();
        x.bindKeys = function(func) {
            $(document).bind('keydown', func);
            x.oldDispose = x.dispose;
            x.dispose = function(recursive) {
                $(document).unbind('keydown', func);
                x.oldDispose(recursive);
            };
            return x;
        };
    }
    ;
    function qbGameArea(qbc) {
        b.call(this, qbc);
        a.call(this);
        var x = this;
        x._mist = $('<div class="qbGameObject qbMistDiv"></div>');
        x.div.append(x._mist);
        x.oldStart = x.start;
        x.start = function() {
            x._mist.hide();
            return x.oldStart();
        };
        x.oldStop = x.stop;
        x.stop = function() {
            x._mist.show();
            return x.oldStop();
        };
        x.oldPause = x.pause;
        x.pause = function(mist) {
            if (x.started) {
                if (mist) {
                    x._mist.show();
                }
                ;
                x.oldPause();
            }
            ;
            return x;
        };
        x.oldResume = x.resume;
        x.resume = function() {
            if (x.started) {
                x._mist.hide();
                x.oldResume();
            }
            ;
            return x;
        };
        x.resizeMist = function() {
            x._mist.css({height: x.height, width: x.width});
            return x;
        };
        x.div.resize(x.resizeMist);
        x.resizeMist();
    }
    ;
    function qbLocalStorage() {
        var x = this;
        x.get = function(key) {
            return localStorage.getItem(key);
        };
        x.set = function(key, val) {
            localStorage.setItem(key, val);
            return x;
        };
        x.rem = function(key) {
            localStorage.removeItem(key);
            return x;
        };
    }
    ;
    function qbCookieStorage() {
        var x = this;
        x.get = function(key) {
            if (!key || !this.has(key)) {
                return null;
            }
            ;
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        };
        x.set = function(key, val) {
            if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                return x;
            }
            ;
            var date = new Date();
            date.setTime(date.getTime() + (168 * 3600000));
            document.cookie = escape(key) + "=" + escape(val) + '; expires=' + date.toGMTString();
            return x;
        };
        x.rem = function(key) {
            if (!key || !this.has(key)) {
                return x;
            }
            ;
            document.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            return x;
        };
        x.has = function(key) {
            return(new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        };
    }
    ;
    q.cache = window.localStorage ? qbLocalStorage : qbCookieStorage;
    q.qbBackground = qbBackground;
    q.qbClock = qbClock;
    q.qbGameArea = qbGameArea;
    q.qbMessageScreen = qbMessageScreen;
    q.qbOptions = qbOptions;
    q.qbContainer = qbContainer;
    q.qbSplashAlert = qbSplashAlert;
    q.qbStatistics = qbStatistics;
    q.qbGameObject = b;
    q.qbBorderObject = bb;
    q.qbActiveObject = a;
    q.sound = true;
}(qbLib));