var qbLibrary = qbLibrary || {};
qbLibrary.settings = {
    sound: true,
    debug: true,
    mobile: function() {
        /* first time use changes qb.settings.mobile from function into boolean */
        qbLibrary.settings.mobile = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                qbLibrary.settings.mobile = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return qbLibrary.settings.mobile;
    },
    zindex: 10
};
qbLibrary.utils = {
    distance: function(x1, x2, y1, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    },
    random: function(max, min) {
        var m = min || 0;
        return Math.floor(Math.random() * (max - m + 1)) + m;
    },
    dump: function(item, withValue) {
        var d, acc;
        d = item || qbLibrary;
        acc = [];
        $.each(d, function(index, value) {
            acc.push(index + (withValue ? ' : ' + value : ' : ' + typeof value));
        });
        return'<pre>' + acc.join('\n').replace(/\</i, '&lt;').replace(/\>/i, '&gt;') + '</pre>';
    },
    log: function() {
        if (console && qbLibrary.settings.debug) {
            var c = arguments.callee.caller.toString().match(/^function\s*([^\s(]+)/);
            c = (c && c[1]) ? c[1] : '<none>';
            console.log(c + ': ' + Array.prototype.slice(arguments).join(' # '));
        }
    },
    remClassRegEx: function(el, regex) {
        var classes, classArray = [], i, len;
        classes = el.attr('class').split(' ');
        for (i = 0, len = classes.length; i < len; i++) {
            if (!classes[i].match(regex)) {
                classArray.push(classes[i]);
            }
        }
        el.attr('class', classArray.join(' '));
    },
    isset: function(arg) {
        return !(typeof arg === 'undefined');
    },
    dummyFunction: function() {
    },
    inherit: function(from, to, args) {
        /*
         for (var i in from) {
         to[i] = from[i];
         }
         for (var i in from.prototype) {
         to[i] = from.prototype[i];
         }
         */
        from.call(to, args);
        /*
         if (typeof to.init === 'function') {
         to.init(args);
         }
         */
    },
    prepareWindow: function() {
        $('body').css({
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        });
        $('head>link, head>style').first().before('<style type="text/css">.qbGameObject{border:0;margin:0;padding:0;left:0;top:0;position:absolute}</style>');
    },
    fillString: function(string, fill, length) {
        var s = string.toString();
        while (s.length < length) {
            s = fill + s;
        }
        return s;
    }
};

qbLibrary.interfaces = {
    visible: function(container) {

        var x = this;
        function locateRandom() {
            return x.refresh().locate(
                    qbLibrary.utils.random(x.div.parent().height() - x.height),
                    qbLibrary.utils.random(x.div.parent().width() - x.width)
                    );
        }

        function locateRandomWindow() {
            return x.refresh().locate(
                    qbLibrary.utils.random($(window).height() - x.height),
                    qbLibrary.utils.random($(window).width() - x.width)
                    );
        }

        function center() {
            return x.refresh().locate(
                    (x.div.parent().height() - x.height) / 2,
                    (x.div.parent().width() - x.width) / 2
                    );
        }

        function centerWindow() {
            return x.refresh().locate(
                    ($(window).height() - x.height) / 2,
                    ($(window).width() - x.width) / 2
                    );
        }

        x.init = function(container) {
            x.div = $("<div />");
            x.div.appendTo(container || $('body')).css({
                display: 'none',
                'z-index': qbLibrary.settings.zindex,
                'user-select': 'none',
                '-o-user-select': 'none',
                '-moz-user-select': 'none',
                '-khtml-user-select': 'none',
                '-webkit-user-select': 'none'
            });
            x.locateRandom = container ? locateRandom : locateRandomWindow;
            x.center = container ? center : centerWindow;
            x.div.addClass('qbGameObject');
            x.presentSpeed = 400;
            x.disposed = false;
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
            x.div.css({left: leftp, top: topp});
            return x.refresh();
        };
        x.size = function(width, height) {
            x.div.css({height: height, width: width});
            return x.refresh();
        };
        x.parseCss = function(array) {
            x.div.css(array);
            return x.refresh();
        };
        x.dispose = function(recursive) {
            x.div.unbind().remove();
            if (recursive) {
                for (var i in x) {
                    if (x[i].dispose) {
                        x[i].dispose(true);
                    }
                    delete x[i];
                }
            }
            x.disposed = true;
            return x;
        };
        x.present = function(speed, callback) {
            var c;
            switch (typeof speed) {
                case 'undefined':
                    c = undefined;
                    break;
                case 'function':
                    c = speed;
                    break;
                default:
                    x.presentSpeed = speed;
                    c = callback;
            }
            x.div.fadeIn(x.presentSpeed, c);
            return x;
        };
        x.prop = function(name, value) {
            if (value) {
                qbLibrary.utils.remClassRegEx(x.div, name);
                x.div.attr(name, value).addClass(name + value);
                x[name] = value;
            }
            return value ? x : x[name];
        };
        x.appendTo = function(el) {
            x.div.appendTo(el);
            return x;
        };
        x.centerAlways = function() {
            $(window).on('resize', x.center);
            x.div.parent().on('resize', x.center);
            x.div.on('resize', x.center);
            x.centerDispose = x.dispose;
            x.dispose = function(recursive) {
                $(window).off('resize', x.center);
                x.div.parent().off('resize', x.center);
                x.centerDispose(recursive);
            };
            return x.center();
        };
        x.init(container);
    },
    sound: function(dir) {
        var x = this;
        x.init = function(dir) {
            x._dir = dir;
            x._sounds = {};
        };
        x.addSound = function(name, value) {
            try {
                var a = new Audio();
                if (a.canPlayType('audio/' + value.split('.').pop()) !== '') {
                    a.src = x._dir + value;
                    x._sounds[name] = a;
                }
            } catch (e) {
                qbLibrary.utils.log(name, value, e.message);
            }
            return x;
        };
        x.playSound = function(name) {
            if (name in x._sounds) {
                try {
                    if (qbLibrary.settings.sound) {
                        x._sounds[name].pause();
                        x._sounds[name].currentTime = 0;
                        x._sounds[name].play();
                    }
                } catch (e) {
                    qbLibrary.utils.log(name, e.message);
                }
                return x;
            } else {
                qbLibrary.utils.log(name, 'No such sound');
            }
        };
        x.parseSounds = function(array) {
            for (var i in array) {
                x.addSound(i, array[i]);
            }
            return x;
        };
        x.init(dir);
    },
    event: function() {
        var x = this;
        x.on = function(type, listener) {
            x._listeners = x._listeners || {};
            if (!x._listeners[type]) {
                x._listeners[type] = [listener];
            }
            else {
                x._listeners[type].push(listener);
            }
            return x;
        };
        x._hasListener = function(type) {
            return (typeof x._listeners[type] !== 'undefined');
        };
        x.off = function(type, listener) {
            if (!x._hasListener(type)) {
                return false;
            }
            for (var i = 0; i < x._listeners[type].length; i++) {
                if (x._listeners[type][i] === listener) {
                    x._listeners[type].splice(i, 1);
                }
            }
            return x;
        };
        x.trigger = function(type, arg) {
            x._listeners = x._listeners || {};
            if (!x._hasListener(type)) {
                return false;
            }
            for (var f in x._listeners[type]) {
                x._listeners[type][f](arg);
            }
        };
    },
    active: function() {
        var x = this;
        x.init = function() {
            x.paused = false;
            x.started = false;
            qbLibrary.utils.inherit(qbLibrary.interfaces.event, this);
        };
        x.start = function(arg) {
            if (!x.started) {
                x.started = true;
                x.paused = false;
                x.trigger('start', arg);
            }
        };
        x.pause = function(arg) {
            if (x.started) {
                x.started = true;
                x.paused = true;
                x.trigger('pause', arg);
            }
            return x;
        };
        x.resume = function(arg) {
            if (x.started) {
                x.started = true;
                x.paused = false;
                x.trigger('resume', arg);
            }
            return x;
        };
        x.stop = function(arg) {
            if (x.started) {
                x.started = false;
                x.paused = true;
                x.trigger('stop', arg);
            }
            return x;
        };
        x.init();
    },
    keybinds: function(keys) {
        var x = this;
        x.init = function(keys) {
            x.bindKeys(keys);
        };
        x.currentKeys = qbLibrary.utils.dummyFunction;
        x.bindKeys = function(newKeys) {
            x.unbindKeys();
            x.currentKeys = newKeys;
            $(document).on('keydown', newKeys);
            return x;
        };
        x.unbindKeys = function() {
            $(document).off('keydown', x.currentKeys);
            return x;
        };
        x.init(keys);
    },
    cache: function() {

        var x = this;
        function xlocalStorage() {
            var x = this;
            x.getCache = function(key) {
                return localStorage.getItem(key);
            };
            x.setCache = function(key, val) {
                localStorage.setItem(key, val);
                return x;
            };
            x.remCache = function(key) {
                localStorage.removeItem(key);
                return x;
            };
        }

        function xcookie() {
            var x = this;
            x.getCache = function(key) {
                if (!key || !x.hasCookie(key)) {
                    return null;
                }
                return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
            };
            x.setCache = function(key, val) {
                if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                    return x;
                }
                var date = new Date();
                date.setTime(date.getTime() + (168 * 3600000));
                document.cookie = escape(key) + "=" + escape(val) + '; expires=' + date.toGMTString();
                return x;
            };
            x.remCache = function(key) {
                if (!key || !this.has(key)) {
                    return x;
                }
                document.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                return x;
            };
            x.hasCookie = function(key) {
                return(new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            };
        }


        x.init = function() {
            if (window.localStorage) {
                xlocalStorage.call(this);
            } else {
                xcookie.call(this);
            }
        };
        x.init();
    },
    borders: function() {

        var x = this;

        function borderVertical(container) {
            var x = this;
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.addClass('qbBorderVertical');
            x.refresh();
        }

        function borderHorizontal(container) {
            var x = this;
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            this.div.addClass('qbBorderHorizontal');
            x.refresh();
        }

        x.addBorders = function(t, r, b, l, show) {
            x._borders = {};
            x._bw = 0;
            x._bh = 0;
            if (l) {
                x._borders.l = new borderVertical(x.div);
                x._bw = x._borders.l.width / 2;
            }

            if (r) {
                x._borders.r = new borderVertical(x.div);
                x._bw = x._borders.r.width / 2;
            }

            if (b) {
                x._borders.b = new borderHorizontal(x.div);
                x._bh = x._borders.b.height / 2;
            }

            if (t) {
                x._borders.t = new borderHorizontal(x.div);
                x._bh = x._borders.t.height / 2;
            }

            var oldRefresh = x.refresh;
            x.refresh = function() {
                oldRefresh();
                x.resizeBorders();
                return x;
            };
            show && x.showBorders();
            return x.refresh();
        };

        x.resizeBorders = function() {
            x._borders.t && x._borders.t.locate(-x._bh, -x._bh / 2).size(x.width + x._bh, x._bh * 2);
            x._borders.r && x._borders.r.locate(-x._bw / 2, x.width - x._bw).size(x._bw * 2, x.height + x._bw);
            x._borders.b && x._borders.b.locate(x.height - x._bh, -x._bh / 2).size(x.width + x._bh, x._bh * 2);
            x._borders.l && x._borders.l.locate(-x._bw / 2, -x._bw).size(x._bw * 2, x.height + x._bw);
            return x;
        };

        x.hideBorders = function() {
            for (var b in x._borders) {
                x._borders[b].div.hide(0);
            }
            return x;
        };

        x.showBorders = function() {
            for (var b in x._borders) {
                x._borders[b].div.show(0);
            }
            return x;
        };
    }
};
qbLibrary.classes = {
    clock: function(container) {
        var x = this;
        x.format = function(i) {
            return i < 10 ? '0' + i : i;
        };
        x.start = function() {
            var h, m, s, now = new Date();
            h = now.getHours();
            m = x.format(now.getMinutes());
            s = x.format(now.getSeconds());
            x.div.html(h + ':' + m + ':' + s);
            x.timeout = setTimeout(function() {
                if (x && !x.disposed) {
                    x.start();
                }
            }, 500);
        };
        x.onDispose = function() {
            clearTimeout(x.timeout);
            x.start = null;
        };
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.addClass('qbClock');
            x.timeout = 0;
        };
        x.init(container);
    },
    background: function(container) {
        var x = this;
        function coverWindow() {
            x.div.css({height: $(window).height(), width: $(window).width()});
            return x.refresh();
        }

        function cover() {
            x.div.css({height: x.parent().height(), width: x.parent().width()});
            return x.refresh();
        }

        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.addClass('qbBackground').css({
                'z-index': qbLibrary.settings.zindex - 1,
                position: 'absolute', //fixed
                width: '100%',
                height: '100%'
            });
            if (container) {
                x.cover = cover;
                //container.on('resize', x.cover);
            } else {
                x.cover = coverWindow;
                //$(window).on('resize', x.cover);
            }
            return x;
        };
        x.init(container);
    },
    gameArea: function(container) {
        var x = this;
        x.mistHide = function() {
            x.mist.div.hide(0);
            return x;
        };
        x.mistShow = function() {
            x.mist.div.show(0);
            return x;
        };
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            qbLibrary.utils.inherit(qbLibrary.interfaces.active, this);
            x.div.addClass('qbGameArea');
            x.mist = new qbLibrary.classes.background(x.div);
            //x.div.on('resize', x.mist.cover);
            x.on('start', x.mistHide);
            x.on('stop', x.mistHide);
            x.on('pause', x.mistShow);
            x.on('resume', x.mistHide);
        };
        x.init(container);
    },
    box: function(container) {
        var x = this;
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
        };
        x.init(container);
    },
    options: function(container) {

        var x = this;
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.addClass('qbOptions');
        };

        x.parseConfig = function(obj) {
            var a, item;
            for (item in obj) {
                a = obj[item];
                x.addButton(item, a.desc, a.title, a.checked, a.enabled);
                if (a.visible) {
                    x[item].present();
                }
            }
            return x.refresh();
        };

        x.addButton = function(name, desc, title, checked, enabled) {
            x[name] = new qbLibrary.classes.optionButton(x.div);
            x[name].div.attr('id', 'qbOption' + name);
            x[name].title = title;
            x[name].desc = desc;
            x[name].checked = checked || false;
            x[name].enabled = enabled || false;
            return x;
        };

        x.remove = function(name) {
            x[name].dispose();
            delete x[name];
            return x;
        };

        x.init(container);
    },
    optionButton: function(container) {
        var x = this;
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.addClass('qbOptionButton').css({cursor: 'pointer'});
            x.title = '';
            x.desc = '';
            x.checked = false;
            x.enabled = false;
            x.action = qbLibrary.utils.dummyFunction;
        };
        x.enable = function(status) {
            x.enabled = status;
            if (x.enabled) {
                x.div.addClass('enabled');
            } else {
                x.div.removeClass('enabled');
            }
        };
        x.check = function(status) {
            x.checked = status;
            if (x.checked)
            {
                x.div.addClass('checked');
            } else {
                x.div.removeClass('checked');
            }
            return x;
        };
        x.click = function(action) {
            x.action = action;
            x.div.off('mousedown').on('mousedown', x.action);
            return x;
        };
        x.repaint = function() {
            x.div.attr('title', x.title);
            x.div.html(x.desc);
            x.check(x.checked);
            x.enable(x.enabled);
            x.click(x.action);
        };

        x.init(container);
    },
    statField: function(container) {
        var x = this;
        x.val = function(value) {
            if (qbLibrary.utils.isset(value)) {
                x.value = value;
                x._value.html(x.value);
                return x;
            }
            return x.value;
        };
        x.valInc = function(value) {
            x.value += value ? parseInt(value, 10) : 1;
            x._value.html(x.value);
        };
        x.max = function(value) {
            if (qbLibrary.utils.isset(value)) {
                x.maximum = value;
                x._maximum.html(x.maximum);
                return x;
            }
            return x.maximum;
        };
        x.maxInc = function(value) {
            x.maximum += value ? parseInt(value, 10) : 1;
            x._maximumx.html(x.maximum);
        };
        x.repaint = function() {
            x.div.attr('title', x.title);
            x._desc.html(x.desc);
            x._value.html(x.value);
            x._separator.html(x.separator);
            x._maximum.html(x.maximum);
            x.limit(x.limited);
            return x;
        };
        x.parseStatField = function(array) {
            for (var a in array) {
                if (qbLibrary.utils.isset(x[a]) && !(typeof x[a] === 'function')) {
                    //TODO
                    x[a] = array[a];
                }
            }
            x.repaint();
            return x;
        };
        x.limit = function(enabled) {
            if (qbLibrary.utils.isset(enabled)) {
                x.limited = enabled;
                if (enabled) {
                    x._separator.show(0);
                    x._maximum.show(0);
                } else {
                    x._separator.hide(0);
                    x._maximum.hide(0);
                }
                return x;
            } else {
                return (x.limited) && (x.value > x.maximum);
            }
        };
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.addClass('qbStatField');
            x.limited = false;
            x.title = '';
            x.desc = '';
            x._desc = $('<label class="desc" />');
            x.div.append(x._desc);
            x.value = 0;
            x._value = $('<span class="val" />');
            x.div.append(x._value);
            x.separator = '/';
            x._separator = $('<span class="separator">/</span>');
            x.div.append(x._sep);
            x.maximum = 0;
            x._maximum = $('<span class="max" />');
            x.div.append(x._maximum);
        };
        x.init(container);
    },
    statistics: function(container) {
        var x = this;
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.addClass('qbStatistics');
            //x.statCount = 0;
        };
        x.add = function(name, limited, title, desc, value, maximum) {
            x[name] = new qbLibrary.classes.statField(x.div);
            x[name].div.attr('id', 'qbStat' + name);
            x[name].limited = limited;
            x[name].title = title;
            x[name].desc = desc;
            x[name].value = value || 0;
            x[name].maximum = maximum || 0;
            x[name].repaint().present();
            //x.statCount++;
            //x.resizeStats();
            return x;
        };
        x.rem = function(name) {
            x[name].dispose();
            delete x[name];
            //x.statCount--;
            //x.resizeStats();
            return x;
        };
        //x.resizeStats = function() {
        //    x.div.children('div').css('width', x.div.innerWidth() / x.statCount);
        //    return x; }
        x.val = function(name, value) {
            x[name].val(value);
            return x;
        };
        x.parseConfig = function(obj) {
            var a, item;
            for (item in obj) {
                a = obj[item];
                x.add(item, a.limited, a.title, a.desc, a.value, a.maximum);
            }
            return x;
        };
        x.init(container);
    },
    confirmMessage: function(container) {
        var x = this;
        x.text = function(title, content, extra, follow) {
            x._t = (typeof (title) === 'undefined') ? '' : title;
            x._c = (typeof (content) === 'undefined') ? '' : content;
            x._e = (typeof (extra) === 'undefined') ? '' : extra;
            x._f = (typeof (follow) === 'undefined') ? '' : follow;
            x._t.length > 0 ? x._tp.html(x._t).show() : x._tp.hide();
            x._c.length > 0 ? x._cp.html(x._c).show() : x._cp.hide();
            x._e.length > 0 ? x._ep.html(x._e).show() : x._ep.hide();
            x._f.length > 0 ? x._fp.html(x._f).show() : x._fp.hide();
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
            x.text(list[i].title, list[i].content, list[i].extra, list[i].follow).present();
        };
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.css({
                cursor: 'pointer',
                'z-index': qbLibrary.settings.zindex * 3
            }).addClass('qbConfirmMessage');
            x._tp = $('<p class="qbMessageTitle" />');
            x._tp.appendTo(x.div).css('font-weight', 'bold');
            x._cp = $('<p class="qbMessageContent" />');
            x._cp.appendTo(x.div);
            x._ep = $('<p class="qbMessageExtra" />');
            x._ep.appendTo(x.div);
            x._fp = $('<p class="qbMessageFollow" />');
            x._fp.appendTo(x.div).css('font-style', 'italic');
            return x;
        };
        x.init(container);
    },
    splashMessage: function(container) {
        var x = this;

        x.splash = function(content, color, bg) {
            x.div.stop(true, true).html(content).css({
                color: color || '#f00',
                'background-color': bg || x.div.css('background-color')
            })
            x.center().div.show(0).fadeOut(content.length * 60);
        };
        x.init = function(container) {
            qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
            x.div.click(function() {
                $(this).stop(true, true).hide(0);
            }).addClass('qbSplashMessage');
            return x;
        };
        x.init(container);
    }

};
