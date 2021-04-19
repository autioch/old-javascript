function gameClass() {

    this.hour = 7;
    this.day = 1;
    this.daytime = true;
    this.nextHour = function() {
        this.hour++;
        if (this.hour > 23) {
            this.day++;
            this.hour = 0;
        }
        system.updateClock(this.hour, this.day);
        if ((this.hour < 7) || (this.hour > 21)) {
            if (this.daytime) {
                player.setSight(Math.floor(player.stats.sightMax / 2));
                system.logCaution('Nightfall, sight reduced.');
                this.daytime = false;
            }
        } else {
            if (!this.daytime) {
                player.setSight(player.stats.sightMax);
                system.logCaution('Sunrise, sight restored.');
                this.daytime = true;
            }
        }
        if (player.stats.life > player.stats.lifeMax) {
            player.changeLife(-1);
        }
    };

    this.setMap = function(mapName, startx, starty) {
        var message = 'Entering ';
        activeMap = maps[mapName];
        system.currentMap = mapName;
        if (activeMap.safe) {
            message += 'safe';
        }
        system.logNotice(message + ' area "' + mapName + '".');
        if (!activeMap.loaded) {
            system.loadMap(activeMap);
        }
        player.setLocation(parseInt(startx) || activeMap.entrance.x, parseInt(starty) || activeMap.entrance.y);
        system.drawMap(activeMap);
    };

    this.speak = function(message, type) {
        system.log(message, type);
    };
    
    
}