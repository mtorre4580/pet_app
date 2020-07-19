angular
    .module('loqueelperrosellevo')
    .controller('MisReservasController', function($scope, SharedState, APIService, UserService, dateFilter) {

        $scope.fecha = null;
        $scope.mostrarFiltro = false;
        $scope.turnoElegido = null;
        
        SharedState.initialize($scope, 'modalCancelarReserva');
        SharedState.turnOff('modalCancelarReserva');

        var usuario = UserService.obtenerUsuarioLogueado();

        APIService.obtenerTurnosDelUsuario(usuario.idUser).then(function(respuesta) {
            var info = respuesta.data;
            if (info.success) {
                $scope.turnos = info.turnos;
                localStorage.setItem('mis_turnos', JSON.stringify($scope.turnos));
            } else {
                alert(info.msg);
            }
        }).catch(function(error) {
            alert('Ups se produjo un error al obtener los turnos');
        });

        $scope.activarFiltro = function() {
            $scope.mostrarFiltro = $scope.mostrarFiltro ? false : true;
        }

        $scope.cancelar = function(turno) {
            $scope.turnoElegido = turno;
            SharedState.turnOn('modalCancelarReserva');
        }

        $scope.cancelarReserva = function(){
            var idTurno = $scope.turnoElegido.id;
            var idUser = usuario.idUser;
            APIService.cancelarTurno(idUser, idTurno).then(function(respuesta) {
                var info = respuesta.data;
                if (info.success) {
                    $scope.turnos = eliminarTurnoDeLaLista(idTurno);
                    localStorage.setItem('mis_turnos', JSON.stringify($scope.turnos));
                } else {
                    alert(info.msg);
                }
            }).catch(function(error) {
                alert('Ups se produjo un error al cancelar la reserva del turno, intenta más tarde');
            });
        }

        $scope.filtrarReservas = function() {
            var fechaString = dateFilter($scope.fecha, 'dd/MM/yyyy'); 
            var turnosFiltrados = [];
            for (var i in misTurnos) {
                if (misTurnos[i].fecha == fechaString) {
                    turnosFiltrados.push(misTurnos[i]);
                }
            }
            $scope.turnos = turnosFiltrados;
        }

        function eliminarTurnoDeLaLista(idTurno) {
            var turnosFiltrados = [];
            for(var i in $scope.turnos) {
                if ($scope.turnos[i].id !== idTurno) {
                    turnosFiltrados.push($scope.turnos[i]);
                }
            }
            return turnosFiltrados;
        }

});