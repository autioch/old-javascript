var qbLib = qbLib || {};
(function(q) {

    var config = {
        stats: {
            active: {
                desc: '', title: 'Life', limited: true},
            hit: {
                desc: '', title: 'Mana', limited: true},
            points: {
                desc: '', title: 'Experience', limited: true},
            life: {
                desc: '', title: 'Gold', limited: false}
        },
        skills: {
            coptions: {
                'type': 'title',
                'desc': '<div class="icon"></div>',
                'visible': true
            },
            csound: {
                'type': 'button',
                'desc': 'Dźwięk',
                'title': 'Dźwięk',
                'visible': true
            },
            cpause: {
                'type': 'button',
                'desc': 'Pauza',
                'title': 'Pauza',
                'visible': true
            },
            creset: {
                'type': 'button',
                'desc': 'Reset',
                'title': 'Rozpocznij gre od nowa',
                'visible': true
            },
            cexit: {
                'type': 'button',
                'desc': 'Koniec',
                'title': 'Zamyka okno gry',
                'visible': true
            },
            cbordera: {
                'type': 'border',
                'visible': true
            },
            cabout: {
                'type': 'title',
                'desc': '<div class="icon"></div>',
                'visible': true
            },
            cauthor: {
                'type': 'button',
                'desc': 'qb.net.pl',
                'title': 'autioch@gmail.com',
                'visible': true
            },
            cborderb: {
                'type': 'border',
                'visible': true
            },
            ctricks: {
                'type': 'title',
                'desc': '<div class="icon"></div>',
                'visible': true
            },
            cpolice: {
                'type': 'button',
                'desc': '<div class="icon"></div>Mandaty 15',
                'title': 'Zatrzymanie biegaczy na 5 sekund',
                'cost': 15,
                'error': 'Nie ma kasy na dodatkowe patrole!',
                'visible': false
            },
            cschool: {
                'type': 'button',
                'desc': '<div class="icon"></div>Szkoła 5',
                'title': 'Dzieci zbierają małe śmieci',
                'cost': 5,
                'error': 'Za mało kasy na nagrody dla dzieci!',
                'visible': false
            },
            ccomunal: {
                'type': 'button',
                'desc': '<div class="icon"></div>Zakład komunalny 8',
                'title': 'Zakład komunalny sprząta losowy typ śmieci',
                'cost': 8,
                'error': 'Za mało kasy na akcję komunalną!',
                'visible': false
            },
            cgrass: {
                'type': 'button',
                'desc': '<div class="icon"></div>Nowe trawniki 10',
                'title': 'Więcej zieleni',
                'cost': 10,
                'error': 'Miasto wyczerpało budżet na nowe trawniki!',
                'visible': false
            }
        }
    };
    var GC;
    q.initRpg = function() {
        bg = new q.qbBackground();
        bg.present();

        splash = new q.qbMessageScreen();
        splash.message('Rpg', '', '', '').follow(initialize).present();
    }

    function initialize() {
        GC = new q.qbContainer('sgc', true);
        GC.hideBorders().present();
        GC.stats = new q.qbStatistics(GC);
        GC.stats.size(550, 40).locate(410, 0).parseConfig(config.stats).present();
        GC.skills = new q.qbOptions(GC);
        GC.skills.size(550, 40).locate(370, 0).parseConfig(config.skills).present();
    }


}(qbLib))
