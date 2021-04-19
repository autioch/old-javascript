var tooltips = {
    endurance: 'Most actions cost endurance. If you have 0 endurance, actions cost life instead.',
    enduranceRegeneration: 'Rate at which your endurance regenerates while resting. Hard to increase.',
    sight: 'Range that your sight reaches. Lowers at night.',
    time: 'Shows current hour and time. Some actions are timed.',
    life: 'Maximum damage that You can survive. Rest or feast to regain life.',
    lifeRegeneration: 'Rate at which your life regenerates while resting. Hard to increase.',
    mana: 'Your magic energy, that you can use to cast magic. Rest or meditate to regain mana.',
    manaRegeneration: 'Rate at which your mana regenerates while resting. Hard to increase.'
};

function tooltipPanelClass() {

    this.panel = $('#tooltipPanel');
    this.content = $('#tooltipPanel>.gamePanelContent');

    this.init = function() {
        system.logActionStart('Initializing tooltipPanel', 'tooltipPanelInit');


        $('.statBox').on('mouseenter', function(e) {
            var s = $(this).attr('id').replace('Description', '');
            tooltipPanel.content.html(tooltips[s] || 'Ops! No tooltip!');
            tooltipPanel.setPosition(e).stop(true, true).show();
        });
        $('.statBox').on('mouseleave', function() {
            tooltipPanel.panel.fadeOut();
        });
        $('.statBox').on('mousemove', function(e) {
            tooltipPanel.setPosition(e);
        });

        system.logActionEnd('tooltipPanelInit');
    };

    this.setPosition = function(e) {
        return tooltipPanel.panel.css({
            left: e.pageX + 3,
            top: e.pageY + 3
        });
    };

    this.init();
}