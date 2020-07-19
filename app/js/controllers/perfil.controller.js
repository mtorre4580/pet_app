angular
    .module('loqueelperrosellevo')
    .controller('PerfilController', function($scope, APIService, UserService) {

        $scope.usuario = UserService.obtenerUsuarioLogueado();
        $scope.activarModificacion = false;
        $scope.request = { idUser: $scope.usuario.idUser, password: '', newPassword: '' };

        $scope.habilitarEdicion = function() {
            $scope.activarModificacion = $scope.activarModificacion ? false :  true;
        }

        $scope.modificarPassword = function() {
            $scope.loading = true;
            APIService.modificarPassword($scope.request).then(function(respuesta) {
                var info = respuesta.data;
                if (info.success) {
                    $scope.usuario.password = $scope.request.newPassword;
                    $scope.request.password = $scope.request.newPassword;
                    UserService.guardarUsuarioLogueado($scope.usuario);
                    $scope.loading = false;
                    alert('Se modifico su contraseña!');
                    $scope.activarModificacion = false;
                } else {
                    $scope.loading = false;
                    alert(info.msg);
                }
            }).catch(function(error) {
                $scope.loading = false;
                alert('Ups se produjo un error al modificar la contraseña');
            });
        }

    });


   