fmp.firefoxOs = (function(document, location, navigator){
    'use strict';

    var setUpInstallButton = function(){

        if (!navigator.mozApps) {
            return;
        }

        var manifest_url = location.href + 'manifest.webapp';
        var button = document.getElementById( 'install-btn' );
        var installCheck = navigator.mozApps.checkInstalled( manifest_url );

        function install( ev ){
            ev.preventDefault();
            // define the manifest URL install the app
            var installLocFind = navigator.mozApps.install( manifest_url );
            installLocFind.onsuccess = function( data ){
                // App is installed, do something
            };
            installLocFind.onerror = function(){
                // App wasn't installed, info is in installapp.error.name
            };
        }

        installCheck.onsuccess = function(){
            if( installCheck.result ){
                button.classList.remove('show');
                button.classList.add('hide');
            } else {
                button.classList.remove('hide');
                button.classList.add('show');
                button.addEventListener( 'click', install, false );
            }
        };
    };

    var init = function(){
        setUpInstallButton();
    };

    return {
        init: init
    };

})(document, location, navigator);