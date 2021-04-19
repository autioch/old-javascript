function playerClass() {

    this.x = 0;
    this.y = 0;
    this.img = null;
    this.stats = {
        sight: 4,
        sightMax: 4,
        endurance: 10,
        enduranceMax: 10,
        enduranceRegen: 5,
        life: 10,
        lifeMax: 10,
        lifeRegen: 1,
        mana: 5,
        manaMax: 5,
        manaRegen: 1
    };
    this.skills = {};
    this.changeEndurance = function(val) {
        this.stats.endurance = Math.min(this.stats.endurance + val, this.stats.enduranceMax);
        if (this.stats.endurance == 0) {
            system.logNotice('No endurance to move - rest (press space) to regain points.');
        }
        if (this.stats.endurance < 0) {
            system.logError('No endurance to move - life point lost.');
            this.stats.endurance = 0;
            this.changeLife(-1);
        }
        system.updateStat('endurance', this.stats.endurance);
    };
    this.changeEnduranceMax = function(val) {
        this.stats.enduranceMax += val;
        system.updateStatMax('endurance', this.stats.enduranceMax);
    };
    this.changeEnduranceRegen = function(val) {
        this.stats.enduranceRegen += val;
        system.updateStat('enduranceRegen', this.stats.enduranceRegen);
    };
    this.setSight = function(val) {
        this.stats.sight = val;
        system.updateStat('sight', this.stats.sight);
    };
    this.changeSight = function(val) {
        this.stats.sight += val;
        system.updateStat('sight', this.stats.sight);
    };
    this.changeSightMax = function(val) {
        this.stats.sightMax += val;
        system.updateStatMax('sight', this.stats.sightMax);
    };
    this.changeLife = function(val) {
        this.stats.life += val;
        system.updateStat('life', this.stats.life);
        if (this.stats.life < 1) {
            alert('Game over!');
            location.reload();
        }
    };
    this.changeLifeMax = function(val) {
        this.stats.lifeMax += val;
        system.updateStatMax('life', this.stats.lifeMax);
    };
    this.changeLifeRegen = function(val) {
        this.stats.lifeRegen += val;
        system.updateStat('lifeRegen', this.stats.lifeRegen);
    };
    this.changeMana = function(val) {
        this.stats.mana = Math.min(this.stats.mana + val, this.stats.manaMax);
        system.updateStat('mana', this.stats.mana);
    };
    this.changeManaMax = function(val) {
        this.stats.manaMax += val;
        system.updateStatMax('mana', this.stats.manaMax);
    };
    this.changeManaRegen = function(val) {
        this.stats.manaRegen += val;
        system.updateStat('manaRegen', this.stats.manaRegen);
    };
    this.rest = function() {
        if (activeTile.color == 19) {
            system.logWarning('Cannot rest in water.');
            return;
        }
        if (activeMap.safe) {
            system.logPositive('Resting an hour in a safe area.');
            this.changeEndurance(this.stats.enduranceRegen * 2);
            if (this.stats.life < this.stats.lifeMax) {
                this.changeLife(this.stats.lifeRegen * 2);
            }
        } else {
            system.logPositive('Resting an hour.');
            this.changeEndurance(this.stats.enduranceRegen);
            if (this.stats.life < this.stats.lifeMax) {
                this.changeLife(this.stats.lifeRegen);
            }
        }
        game.nextHour();
    };

    this.setLocation = function(x, y) {
        if ((x > -1) && (y > -1) && (x < activeMap.width) && (y < activeMap.height)) {
            if (!activeMap.tiles[y][x].obstacle) {
                this.x = x;
                this.y = y;
                activeTile = activeMap.tiles[y][x];
                if (this.stats.endurance < 1) {
                    system.logError('Tired (0 endurance), losing life instead.');
                    this.changeLife(-1);
                } else {
                    this.changeEndurance(-activeMap.moveCost);
                }
                system.performAction(activeTile);
            } else {
                system.performAction(activeMap.tiles[y][x]);
            }
            this.checkLocation(activeTile);
        }
    };
    this.checkLocation = function(tile) {
        switch (tile.color) {
            case 19:
                system.logWarning('Cold water, losing 1 endurance.');
                this.changeEndurance(-1);
                break;
        }
        if (tile.object && tile.object.action) {
            system.performAction(tile.object.action);
        }
    };
    this.inRange = function(x, y) {
        return ((sqr(x - this.x) + sqr(y - this.y)) < sqr(this.stats.sight));
    };
    this.init = function() {
        this.changeEndurance(0);
        this.changeEnduranceMax(0);
        this.changeEnduranceRegen(0);
        this.changeSight(0);
        this.changeSightMax(0);
        this.changeLife(0);
        this.changeLifeMax(0);
        this.changeLifeRegen(0);
        this.changeMana(0);
        this.changeManaMax(0);
        this.changeManaRegen(0);
    };
    this.init();
    this.castSpell = function(id) {

    };
}