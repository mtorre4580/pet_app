angular
    .module('loqueelperrosellevo')
    .service('APIService', function($http, dateFilter) {

        this.autenticarUsuario = function(request) {
            return $http.post('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/login.php', JSON.stringify(request));
        }

        this.registrarUsuario = function(request) {
            return $http.post('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/registrar.php', JSON.stringify(request));
        }

        this.buscarTurnos = function(fecha) {
            var formatFecha = dateFilter(fecha, 'yyyy-MM-dd'); 
            return $http.get('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/turnos.php', { params: { fecha: formatFecha } });
        }

        this.obtenerTurnosDelUsuario = function(idUser) {
            return $http.get('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/mis-reservas.php', { params: { id: idUser } });
        }

        this.confirmarTurno = function(request) {
            var requestNormalizado = request;
            requestNormalizado.fecha = dateFilter(requestNormalizado.fecha, 'yyyy-MM-dd'); 
            return $http.post('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/reservar.php', JSON.stringify(requestNormalizado));
        }

        this.cancelarTurno = function(idUser, idTurno) {
            return $http.delete('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/cancelar-turno.php/' + idUser + '/' + idTurno);
        }

        this.obtenerNoticias = function() {
            return $http.get('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/noticias.php');
        }

        this.modificarPassword = function(request) {
            return $http.post('http://f21-preview.runhosting.com/loqueelperrosellevo.atwebpages.com/editar.php', JSON.stringify(request));
        }

    });