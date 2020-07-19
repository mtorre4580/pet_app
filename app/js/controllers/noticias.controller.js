angular
    .module('loqueelperrosellevo')
    .controller('NoticiasController', function($scope, APIService) {

        var noticias = localStorage.getItem('noticias') ? JSON.parse(localStorage.getItem('noticias')) : null;

        if (noticias) {
            $scope.noticias = noticias;
        } else {
            obtenerNoticias();
        }
        
        function obtenerNoticias() {
            $scope.loading = true;
            APIService.obtenerNoticias().then(function(respuesta) {
                $scope.loading = false;
                var info = respuesta.data;
                if (info.success) {
                    $scope.noticias = info.noticias;
                    localStorage.setItem('noticias', JSON.stringify($scope.noticias));
                } else {
                    alert(info.msg);
                }
            }).catch(function(error) {
                $scope.loading = false;
                alert('Ups se produjo un error al obtener las noticias');
            });
        }

});