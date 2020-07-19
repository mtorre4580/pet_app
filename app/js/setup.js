angular
	.module('loqueelperrosellevo', ['ngRoute', 'ngAnimate', 'mobile-angular-ui', 'naif.base64']) 
	.config(function($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController',
			reloadOnSearch: false
		});
		$routeProvider.when('/registrarse', {
			templateUrl: 'views/registro.html', 
			controller: 'RegistroController', 
			reloadOnSearch: false,
        });
        $routeProvider.when('/reservar-turno', {
			templateUrl: 'views/reservar-turno.html', 
			controller: 'ReservarTurnoController', 
			reloadOnSearch: false,
		});
		$routeProvider.when('/mis-reservas', {
			templateUrl: 'views/mis-reservas.html', 
			controller: 'MisReservasController', 
			reloadOnSearch: false,
		});
		$routeProvider.when('/noticias', {
			templateUrl: 'views/noticias.html', 
			controller: 'NoticiasController', 
			reloadOnSearch: false,
		});
		$routeProvider.when('/perfil', {
			templateUrl: 'views/perfil.html', 
			controller: 'PerfilController', 
			reloadOnSearch: false,
		});
		$routeProvider.when('/cerrar-sesion', {
			template:'',
			controller: 'CerrarSesionController', 
		});
		$routeProvider.otherwise({
			redirectTo: '/'
		});
	})
	.controller('NavbarController', function($scope, $location, UserService) {
		$scope.$on('$locationChangeSuccess', function(event) {
			var url = $location.path();
			$scope.mostrarNavbar = url !== '/' ? true : false;
			$scope.tituloSeccion = url.slice(1, url.length);
			$scope.infoUser = UserService.obtenerUsuarioLogueado();
		});
	});

