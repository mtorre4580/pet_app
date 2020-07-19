angular
    .module('loqueelperrosellevo')
    .controller('CerrarSesionController', function($location) {
        localStorage.clear();
        $location.path('/');
    });


   