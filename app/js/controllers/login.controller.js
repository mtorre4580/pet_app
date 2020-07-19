angular
    .module('loqueelperrosellevo')
    .controller('LoginController', function($scope, $location, APIService, UserService) {
        
        $scope.request = { email: '', password: '' };

        var usuarioLogueado = UserService.obtenerUsuarioLogueado();

        if (usuarioLogueado) {
            $location.path('/noticias');
        }
        
        $scope.login = function() {
            $scope.loading = true;
            APIService.autenticarUsuario($scope.request).then(function(respuesta) {
                var info = respuesta.data;
                info.password = $scope.request.password;
                if (info.success) {
                    UserService.guardarUsuarioLogueado(info);
                    $location.path('/noticias');
                    $scope.loading = false;
                } else {
                    $scope.loading = false;
                    alert(info.msg);
                }
            }).catch(function(error) {
                $scope.loading = false;
                alert('Ups se produjo un error al autenticar al usuario');
            });
        }

    });


   