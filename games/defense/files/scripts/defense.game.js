var qbLib = qbLib || {};
(function(q) {

    q.initDefense = function() {
        bg = new q.qbBackground();
        bg.present();

        splash = new q.qbMessageScreen();
        splash.message('Defense', '', '', '').follow(initialize).present();
    }
    
    function initialize(){
        alert('Defense dziala ');

    }


}(qbLib))
