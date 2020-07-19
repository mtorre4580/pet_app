angular
    .module('loqueelperrosellevo')
    .controller('ReservarTurnoController', function($scope, SharedState, APIService, UserService) {
        
        $scope.fecha = new Date();
        $scope.turnoElegido = null;
        SharedState.initialize($scope, 'modalConfirmarReserva');
        SharedState.turnOff('modalConfirmarReserva');

        $scope.buscarTurnos = function() {
            $scope.loading = true;
            APIService.buscarTurnos($scope.fecha).then(function(respuesta) {
                $scope.loading = false;
                var info = respuesta.data;
                if (info.success) {
                    $scope.turnos = info.turnos;
                    localStorage.setItem('turnos', JSON.stringify($scope.turnos));
                } else {
                    alert(info.msg);
                }
            }).catch(function(error) {
                $scope.loading = false;
                alert('Ups se produjo un error al obtener los turnos');
            });
        }

        $scope.reservar = function(turno) {
            $scope.turnoElegido = turno;
            SharedState.turnOn('modalConfirmarReserva');
        }

        $scope.confirmarReserva = function(){
            var usuario = UserService.obtenerUsuarioLogueado();
            var request = {
                horario: $scope.turnoElegido.horario,
                fecha: $scope.fecha,
                idUser: usuario.idUser
            };
            APIService.confirmarTurno(request).then(function(respuesta) {
                var info = respuesta.data;
                if (info.success) {
                    actualizarListadoTurnos($scope.turnos, request, usuario);
                } else {
                    alert(info.msg);
                }
            }).catch(function(error) {
                alert('Ups se produjo un error al confirmar el turno, intenta mas tarde');
            });
        }

        function actualizarListadoTurnos(turnos, turno, usuario) {
            for(var i in turnos) {
                if(turnos[i].horario === turno.horario){
                    turnos[i] = {
                        disponible : false,
                        nombre: usuario.nombre,
                        horario: turno.horario,
                        foto: usuario.foto
                    }
                }
            }
            localStorage.setItem('turnos', JSON.stringify($scope.turnos));
        }

        var turnosCacheados = localStorage.getItem('turnos') ? JSON.parse(localStorage.getItem('turnos')) : null;

        if (turnosCacheados) {
            $scope.turnos = turnosCacheados;
        } else {
            $scope.buscarTurnos();
        }
        
    });