var activeMap, activeTile, activePanel; //bresenham

var keys = {
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    SPACE: 32,
    S: 83,
    L: 76,
    G: 71,
    ESCAPE: 27
};
var images = {
};

var colors = {
    0: '#000000',
    1: '#808080',
    2: '#C0C0C0',
    3: '#FFFFFF',
    4: '#800000',
    5: '#FF0000',
    6: '#808000',
    7: '#FFFF00',
    8: '#008000',
    9: '#00FF00',
    10: '#008080',
    11: '#00FFFF',
    12: '#000080',
    13: '#0000FF',
    14: '#800080',
    15: '#FF00FF',
    16: '#7F3300',
    17: '#0094FF',
    18: '#4C3C32',
    19: '#82CDFF',
    20: '#000000',
    21: '#000000',
    22: '#000000',
    23: '#000000'
};

//var panels = ['game'];
/*
 var patterns = {
 };
 */
function sqr(x) {
    return Math.pow(x, 2);
}

function systemClass() {

    var self = this;
    this.canvas = document.getElementById('gameCanvas');
    this.context = this.canvas.getContext('2d');
    this.minimap = document.getElementById('minimap');
    this.con = this.minimap.getContext('2d');
    this.tileSize = 20;
    this.logMax = 20;
    this.logDiv = $('#gameLog');
    this.currentMap = 'start';
    this.viewport = {
        w: Math.ceil(this.canvas.getAttribute('width') / this.tileSize),
        h: Math.ceil(this.canvas.getAttribute('height') / this.tileSize)
    };
    this.loadMap = function(map) {
        var x, y, tile, item;
        map.width = map.tiles[0].length;
        map.height = map.tiles.length;
        for (x = 0; x < map.width; x++) {
            for (y = 0; y < map.height; y++) {
                tile = map.tiles[y][x];
                map.tiles[y][x] = {
                    color: tile,
                    obstacle: translations[tile].obstacle,
                    opacity: translations[tile].opacity,
                    object: null,
                    action: null,
                    //image: images[tile],
                    visited: false
                };
            }
        }
        //przypisanie obiektów do pól
        for (x = 0; x < map.objects.length; x++) {
            item = map.objects[x];
            map.tiles[item.y][item.x].object = item.type;
            //console.log(map.tiles[item.y][item.x].object);
        }
        //przypisanie akcji do pól
        for (x = 0; x < map.actions.length; x++) {
            item = map.actions[x];
            map.tiles[item.y][item.x].action = map.actions[x].action;
        }
        map.loaded = true;
    };
    this.drawMap = function(map) {
        this.setVisited();
        var x, y, mx, my, tile;
        this.canvas.width = this.canvas.width + 0; //move after player movement
        var s = new Date().getTime();
        for (x = 0; x < this.viewport.w; x++) {
            for (y = 0; y < this.viewport.h; y++) {
                mx = player.x + x - Math.ceil(this.viewport.w / 2);
                my = player.y + y - Math.ceil(this.viewport.h / 2);
                if ((my < 0) || ((my + 1) > map.height) || (mx < 0) || ((mx + 1) > map.width)) {
                    this.context.fillStyle = '#000000';
                    this.context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                } else {
                    //try {
                    tile = map.tiles[my][mx];
                    //} catch (err) {
                    //    console.log(map.height, map.width);
                    //    console.log(my, mx);
                    //}
                    if (!tile.visited) {
                        this.context.fillStyle = '#000000';
                        this.context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                    } else {
                        this.context.drawImage(images[tile.color], x * this.tileSize, y * this.tileSize);
                        if (player.inRange(mx, my)) {
                            if (tile.object !== null) {
                                //console.log(tile.object);
                                this.context.drawImage(images[tile.object], x * this.tileSize, y * this.tileSize);
                            }
                        } else {
                            this.context.fillStyle = "rgba(0, 0, 0, 0.8)";
                            this.context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        }
                    }
                    //debug
                    //this.context.fillStyle = '#fff';
                    //this.context.fillText(map.tiles[my][mx].visited ? '1' : '0', x * this.tileSize + 10, y * this.tileSize + 10)
                }
            }
        }

        this.context.fillStyle = '#444';
        this.context.font = "8pt Verdana";
        this.context.drawImage(player.img, Math.ceil(this.viewport.w / 2) * this.tileSize, Math.ceil(this.viewport.h / 2) * this.tileSize);

        var st = new Date().getTime();
        this.context.fillText((st - s) / 1000, 4, 12);
        $('#posx').html(player.x);
        $('#posy').html(player.y);
        this.drawMinimap(map);
    };

    this.drawMinimap = function(map) {
        var w, h, tile;
        var s = new Date().getTime();

        this.minimap.width = this.minimap.width + 0; //move after player movement

        //todo przeniesc to do setmap i poprawic
        var sc, sx, sy, tx, ty;
        sx = ($('#minimap').width() / map.width) / 2;
        sy = ($('#minimap').height() / map.height) / 2;
        sc = (sx > sy) ? sy : sx;
        sc = Math.min(Math.floor(sc), 4);

        ty = ($('#minimap').height() - map.height * 2 * sc) / 2;
        tx = ($('#minimap').width() - map.width * 2 * sc) / 2;

        this.con.save();
        this.con.translate(tx, ty);
        this.con.scale(sc, sc);

        for (w = 0; w < map.width; w++) {
            for (h = 0; h < map.height; h++) {
                tile = map.tiles[h][w];
                if (tile.visited) {
                    this.con.fillStyle = colors[tile.color];
                    this.con.fillRect(w * 2, h * 2, 2, 2);
                }
                //debug
                //this.context.fillStyle = '#fff';
                //this.context.fillText(map.tiles[my][mx].visited ? '1' : '0', x * this.tileSize + 10, y * this.tileSize + 10)
            }
        }

        this.con.fillStyle = "#E14930";
        this.con.fillRect(player.x * 2 - 0.5, player.y * 2 - 0.5, 3, 3);
        var st = new Date().getTime();
        this.con.restore();
        this.con.fillStyle = '#444';
        this.con.font = "8pt Verdana";
        this.con.fillText((st - s) / 1000, 4, 12);
    }

    this.setVisited = function() {
        fx = player.x - player.stats.sight;
        tx = player.x + player.stats.sight;
        fy = player.y - player.stats.sight;
        ty = player.y + player.stats.sight;
        for (var i = fx; i < tx; i++) {
            for (var j = fy; j < ty; j++) {
                if ((j > -1) && (j < activeMap.height) && (i > -1) && (i < activeMap.width)) {
                    if (player.inRange(i, j)) {
                        activeMap.tiles[j][i].visited = true;
                    }
                }
            }
        }
    };

    this.checkAction = function(e) {
        var a = false;
        //console.log(e.which);
        if (activePanel == 'game') {
            switch (e.which) {
                case keys.ARROW_LEFT:
                    player.setLocation(player.x - 1, player.y);
                    game.nextHour();
                    a = true;
                    break;
                case keys.ARROW_RIGHT:
                    player.setLocation(player.x + 1, player.y);
                    game.nextHour();
                    a = true;
                    break;
                case keys.ARROW_UP:
                    player.setLocation(player.x, player.y - 1);
                    game.nextHour();
                    a = true;
                    break;
                case keys.ARROW_DOWN:
                    player.setLocation(player.x, player.y + 1);
                    game.nextHour();
                    a = true;
                    break;
                case keys.SPACE:
                    player.rest();
                    break;
                case keys.S:
                    system.showPanel('skillsPanel');
                    break;
                case keys.G:
                    system.showPanel('savesPanel');
                    break;
            }
            self.drawMap(activeMap);
        } else {
            if (activePanel == 'savesPanel') {
                switch (e.which) {
                    case keys.ESCAPE:
                        system.hidePanel('savesPanel');
                        a = true;
                        break;
                    case keys.G:
                        system.hidePanel('savesPanel');
                        a = true;
                        break;
                }
            } else {
                if (activePanel == 'skillsPanel') {
                    switch (e.which) {
                        case keys.ESCAPE:
                            system.hidePanel('skillsPanel');
                            a = true;
                            break;
                        case keys.S:
                            system.hidePanel('skillsPanel');
                            a = true;
                            break;
                    }
                }
            }
        }
        return !a;
    }

    this.performAction = function(tile) {
        if (tile.action) {
            var n, f;
            n = tile.action.split('#');
            f = game[n[0]];
            //this.log('Performing action "' + n[0] + '".');
            f.apply(this, Array.prototype.slice.call(n, 1));
        }
    };
    this.log = function(message, type) {
        var css = type || 'text';
        this.logDiv.append('<div class="' + css + '">' + message + '</div>').prop('scrollTop', this.logDiv[0].scrollHeight);
        if (this.logDiv.children().length > this.logMax) {
            this.logDiv.children(":first").remove();
        }
    };
    this.logError = function(message) {
        this.log(message, 'error');
    };
    this.logWarning = function(message) {
        this.log(message, 'warning');
    };
    this.logCaution = function(message) {
        this.log(message, 'caution');
    };
    this.logNotice = function(message) {
        this.log(message, 'notice');
    };
    this.logPositive = function(message) {
        this.log(message, 'positive');
    };
    this.clearLog = function() {
        this.logDiv.children().remove();
    };
    this.loadImages = function(callback) {
        var img = [0, 4, 6, 8, 9, 16, 17, 18, 19, 'home', 'door', 'bed', 'chicken'];
        var count = 0;
        var l = img.length;
        //var con = this.context;
        this.log('Loading images... ( <span id="loadImagesCounter">0</span> / ' + l + ')');
        for (var i in img) {
            images[img[i]] = new Image();
            $(images[img[i]]).on('load', function() {
                count++;
                $('#loadImagesCounter').html(count);
                // patterns[img[i]] = con.createPattern(this, 'repeat');
                if (count === l) {
                    callback();
                }
            });
            images[img[i]].src = 'images/' + img[i] + '.png';
        }
    };
    this.updateStat = function(name, val) {
        $('#' + name + 'Value').html(val);
    };
    this.updateStatMax = function(name, val) {
        $('#' + name + 'MaxValue').html(val);
    };
    this.updateClock = function(hour, day) {
        $('#hourValue').html(hour);
        $('#dayValue').html(day);
    };

    this.showPanel = function(panelName) {
        //todo fix namesapce
        activePanel = panelName;
        window[panelName].clearPanel();
    };

    this.hidePanel = function(panelName) {
        //todo fix namesapce
        window[panelName].panel.hide();
        $('#panelBackground').hide();
        activePanel = 'game';
    }

    this.logActionStart = function(message, id) {
        this.logNotice(message + '... <span id="' + id + '"></span>');
    };

    this.logActionEnd = function(id) {
        $('#' + id).html('Done.').removeAttr('id');
    };

}
