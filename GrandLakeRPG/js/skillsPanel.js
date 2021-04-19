function skillsPanelClass() {

    this.saveTemplate = null;
    this.panel = $('#skillsPanel');
    this.name = 'skillsPanel';

    this.clearPanel = function() {

        this.panel.show();
    };

    this.printSaveSlot = function(save) {
        var slot = this.saveTemplate.clone(true);
        slot.attr('saveName', save.title);
        slot.find('.savesPanelSlotDate').html(save.time);
        slot.find('.savesPanelSlotTitle').html(save.title);
        slot.find('.savesPanelSlotDescription').html(save.description);
        slot.appendTo('#savesPanelSlotList');
    };

    this.saveGame = function(saveName) {
        system.logActionStart('Saving game "' + saveName + '"', 'savesPanelSaveGame');
        this.setSetting(saveName, 'playerStats', player.stats);
        this.setSetting(saveName, 'playerx', player.x);
        this.setSetting(saveName, 'playery', player.y);
        var loadedMaps = [];
        for (var lm in maps) {
            if (maps[lm].loaded) {
                loadedMaps.push(lm);
                this.setSetting(saveName, 'maps#' + lm, maps[lm]);
            }
        }
        this.setSetting(saveName, 'loadedMaps', loadedMaps);
        this.setSetting(saveName, 'activeMap', system.currentMap);
        this.setSetting(saveName, 'hour', game.hour);
        this.setSetting(saveName, 'day', game.day);
        this.addSlot(saveName);
        system.logActionEnd('savesPanelSaveGame');
    };


    this.formatDate = function() {
        var d = new Date();
        var tmp;
        var date = d.getFullYear() + '.';
        tmp = d.getMonth() + 1;
        date = date + (tmp < 10 ? '0' : '') + tmp + '.';
        tmp = d.getDate();
        date = date + (tmp < 10 ? '0' : '') + tmp + ' ';
        tmp = d.getHours();
        date = date + (tmp < 10 ? '0' : '') + tmp + ':';
        tmp = d.getMinutes();
        date = date + (tmp < 10 ? '0' : '') + tmp + ':';
        tmp = d.getSeconds();
        date = date + (tmp < 10 ? '0' : '') + tmp;
        return date;
    };

    this.addSlot = function(saveName) {
       /* this.savedGames = JSON.parse(localStorage.getItem('savedGames')) || {};
        this.savedGames[saveName] = {
            time: this.formatDate(),
            title: saveName,
            description: 'Map ' + system.currentMap + ', ' + game.day + ' day(s), ' + game.hour + ' hour(s)'
        };
        localStorage.setItem('savedGames', JSON.stringify(this.savedGames));
        this.clearPanel();*/
    };

    this.deleteGame = function(saveName) {
        system.logActionStart('Deleting game "' + saveName + '"', 'savesPanelDeleteGame');
        this.removeSetting(saveName, 'playerStats');

        var loadedMaps = this.getSetting(saveName, 'loadedMaps');
        for (var lm in loadedMaps) {
            this.removeSetting(saveName, 'maps#' + loadedMaps[lm]);
        }
        this.removeSetting(saveName, 'loadedMaps');
        this.removeSetting(saveName, 'activeMap');
        this.removeSetting(saveName, 'hour');
        this.removeSetting(saveName, 'day');
        this.removeSetting(saveName, 'playerx');
        this.removeSetting(saveName, 'playery');
        this.deleteSlot(saveName);
        system.logActionEnd('savesPanelDeleteGame');
    };

    this.deleteSlot = function(saveName) {
        this.savedGames = JSON.parse(localStorage.getItem('savedGames')) || {};
        delete this.savedGames[saveName];
        localStorage.setItem('savedGames', JSON.stringify(this.savedGames));
        this.clearPanel();
    };

    this.loadGame = function(saveName) {
        system.logActionStart('Loading game "' + saveName + '"', 'savesPanelLoadGame');
        player.stats = this.getSetting(saveName, 'playerStats');
        var loadedMaps = this.getSetting(saveName, 'loadedMaps');
        for (var lm in loadedMaps) {
            maps[loadedMaps[lm]] = this.getSetting(saveName, 'maps#' + loadedMaps[lm]);
        }
        system.currentMap = this.getSetting(saveName, 'activeMap');
        game.hour = this.getSetting(saveName, 'hour');
        game.day = this.getSetting(saveName, 'day');
        game.setMap(system.currentMap);
        player.x = this.getSetting(saveName, 'playerx');
        player.y = this.getSetting(saveName, 'playery');
        system.drawMap(activeMap);
        player.init();
        system.logActionEnd('savesPanelLoadGame');
        system.hidePanel('savesPanel');
    };

    this.getSetting = function(saveName, setting) {
        //console.log(setting, localStorage.getItem(saveName + '#' + setting));
        return JSON.parse(localStorage.getItem(saveName + '#' + setting));
    };

    this.setSetting = function(saveName, setting, value) {
        //console.log(saveName + '#' + setting, JSON.stringify(value));
        localStorage.setItem(saveName + '#' + setting, JSON.stringify(value));
    };

    this.removeSetting = function(saveName, setting) {
        localStorage.removeItem(saveName + '#' + setting);
        return this;
    };

    this.init = function() {
        system.logActionStart('Initializing savesPanel', 'savesPanelInit');

        var options = $('<ul class="savesPanelSlotOptions" />');
        $('<li class="savesPanelSlotLoad panelButton">Load</li>').appendTo(options).on('click', function() {
            savesPanel.loadGame($(this).parent().parent().attr('saveName'));
            system.hidePanel('savesPanel');
        });
        $('<li class="savesPanelSlotSave panelButton">Save</li>').appendTo(options).on('click', function() {
            savesPanel.saveGame($(this).parent().parent().attr('saveName'));
            system.hidePanel('savesPanel');
        });
        $('<li class="savesPanelSlotDelete panelButton">Delete</li>').appendTo(options).on('click', function() {
            if (confirm('Really delete "' + $(this).parent().parent().attr('saveName') + '"')) {
                savesPanel.deleteGame($(this).parent().parent().attr('saveName'));
                savesPanel.clearPanel();
            }
        });

        var details = $('<ul class="savesPanelSlotDetails" />');
        details.append('<div class="savesPanelSlotDate" />')
                .append('<div class="savesPanelSlotTitle" />')
                .append('<div class="savesPanelSlotDescription" />')

        this.saveTemplate = $('<div class="savesPanelSlot" />');
        this.saveTemplate
                .append('<div class="savesPanelSlotImage" />')
                .append(details)
                .append(options);

        $('#skillsPanelCloseButton').on('click', function() {
            system.hidePanel('skillsPanel');
        });
/*
        $('#saveSave').on('click', function() {
            var sn = $('#saveNameValue').val();
            if (sn.length < 1) {
                alert('Please specify save name');
                return;
            }
            if (savesPanel.savedGames[sn]) {
                if (confirm('Save already exists. Replace?')) {
                    savesPanel.saveGame(sn);
                }
            } else {
                savesPanel.saveGame(sn);
            }
        });
*/

        system.logActionEnd('savesPanelInit');
    };

    this.init();

}
