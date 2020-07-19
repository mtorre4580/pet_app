angular
    .module('loqueelperrosellevo')
    .service('UserService', function() {

        this.obtenerUsuarioLogueado = function() {
            return localStorage.getItem('usuario_logueado') ? JSON.parse(localStorage.getItem('usuario_logueado')) : null;
        }

        this.guardarUsuarioLogueado = function(user) {
            localStorage.setItem('usuario_logueado', JSON.stringify(user));
        }

    });