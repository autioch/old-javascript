;
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {

        define(['jquery', 'lodash'], factory);

    } else {

        root.Recount = factory(root.jQuery, root._);

    }

}(this, function ($, _) {

    var defaults = {
        log: true,
        global: true
    };

    var Recount = {
        config: {},
        objs: {},
        init: function (options) {
            _.bindAll(this);
            _.extend(this.config, defaults, options);
            if (this.config.global) {
                window.Recount = this;
            }
            return this;
        },
        wrap: function (obj, label) {

            var list = {};
            _.each(obj, function (func, key) {
                if (!obj.hasOwnProperty(key) || !$.isFunction(func)) {
                    return;
                }
                list[key] = {log: []};
                if (this.config.log) {
                    obj[key] = function () {
                        var t = new Date().getTime();
                        console.log('Recount:', label, key);
                        func.apply(obj, arguments);
                        list[key].log.push(new Date().getTime() - t);
                    };
                } else {
                    obj[key] = function () {
                        var t = new Date().getTime();
                        func.apply(obj, arguments);
                        list[key].log.push(new Date().getTime() - t);
                    };
                }
            }, this);
            this.objs[label] = list;
        },
        showConsole: function () {
            _.each(this.objs, function (obj, objName) {
                console.group('Recount for: ' + objName);
                _.each(obj, function (times, funcName) {
                    times = times.sort();
                    console.group(funcName);
                    console.log('Calls:   ' + times.length);
                    console.log('Fastest: ' + _.first(times) + 'ms');
                    console.log('Slowest: ' + _.last(times) + 'ms');
                    var average = _.reduce(times, function (a, v) {
                        return a + v;
                    }) / times.length;
                    console.log('Average: ' + average.toFixed(2) + 'ms');
                    console.groupEnd();
                });
                console.groupEnd();
            });
        },
        summarize: function () {

            _.each(this.objs, function (obj, objName) {
                _.each(obj, function (func, funcName) {
                    func.sorted = func.log.slice(0).sort(this.sortNumbers);
                    func.calls = func.log.length;
                    func.fastest = _.first(func.sorted);
                    func.slowest = _.last(func.sorted);
                    func.total = _.reduce(func.log, function (a, v) {
                        return a + v;
                    });
                    func.average = func.total / func.log.length;
                }, this);
            }, this);

        },
        sortNumbers: function (a, b) {
            return a - b;
        }
    };

    return Recount.init();

}));
