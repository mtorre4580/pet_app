angular
    .module('loqueelperrosellevo')
    .controller('RegistroController', function($scope, $location, APIService, UserService) {

        $scope.request = { email: '', password: '', nombre: '', foto: '' };

        $scope.registrarse = function() {
            $scope.request.foto = obtenerImagenBase64($scope.request);
            $scope.loading = true;
            APIService.registrarUsuario($scope.request).then(function(respuesta) {
                var info = respuesta.data;
                if (info.success) {
                    var user = $scope.request;
                    user.idUser = info.idUser;
                    UserService.guardarUsuarioLogueado(user);
                    $location.path('/reservar-turno');
                    $scope.loading = false;
                } else {
                    $scope.loading = false;
                    alert(info.msg);
                }
            }).catch(function(error) {
                $scope.loading = false;
                alert('Ups se produjo un error al registrar al usuario');
            });
        }

        function obtenerImagenBase64(request) {
            if (request.foto) {
                return request.foto.base64;
            } 
            return 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ4SURBVHhe7ZpZixRXGIarjruCy4VxNDfuZjRGJREhigg6iuKGEmQU9CIxo6hXXkWjEBLEuKAXIoqC6C9QRBAhAXHD7UbiRCGJEYzgCFFMjDvx+eqcnqX9dLp7us/prvaFh66ps3zvW1VdXTVV0XuFUR8YBmMdsizrUqveUWQW87mPz6vQBC/iyPwvyLJbR1vSR/oypvI1GLYT6K9M2FyRMYzdAUNkokpTFwJsgkdauHyQOWCznbMyVBtF8UUtTEdgzkvMPdqWKFvF09lbD7QAxYC5H1JjhitWdsKYeaYZLybUeE6tOluyfDQGYx3+vucKtf6h5se2dHj1wNB1zWgpoWajrR1e2zWDPqD2TmshnD5iT7zUzPlAalsP4XRYM+YTPByxVvyrhj3wn2bKJ3h4gpeB1pJXmdWaoRDgZa0z5VXHNTMhwMsJa8mfurPV877BKRV4uYsnrz+Jwyka7OyfDV5e4WmkteZFnaZqRkLCPcI0Z86HzFzNREjwNN+Z8yGzUDMREjwtcuZ8KK7TTIQETzOdOS/6RDMREjyNt9b8qC+H3N+akRDg5SGe+llr3hSf08yEAC8XnCmv+k4zEwK8fG8t+dVYzUwI8DLOWvKu+LRmyCd4OOPMhFA8SzPlE06As52ZYDqpGfMBtU9ZC2E1lL3wr2awlEhNastD1XJQXK+ZLCXUXOaKl4vMBs1oKTCR+dYVLTeZjZrhYkL4Ta5YuSpeXopzAnM+Zu4VrkjZaBAcgh+Tv1o0Bn7SghQCc/0M2Y/CtoLU/jD5y7/M19DUyuRB6JY0NSuuh8utw+QD819h/FI3WUZd4UCrPvehwTb50QA42tpoi5n4Mm2fJr3aKHmkLa++3IC3/i9R2mwf6RtrT4AnsP6SPjY6BjVJrxJqMgZvawYy0C6Pr7fBB8mItjIwkg+u3uKVnNDWC7LMujm0jXJ9stUfOOTNc61mBtpv029KMqL4ksPZPNUKa9C3iUFboDYZXpjkud8PzHVPq6FB32d4zf7adFSmQSuWC4x9wQScxMw3fMrekcM0hmzJOmmjT9JXxjS/SZYvjF0lkxZB8ZdagULBmLz0dJN5zzO5XMuDLMu64r5kwbxfJREKl5mnTVxJkGGBC5O3+N31f5NTbMjABVTyNmpe6snARm3CSoQsv9pMuWu/NlElQ6YDNlq7imdoE6QBsrX7el3nNB362ZBNrjLf9cqtWaMNTBNkXOfCviE58d3RBqUJMspb6L1s5DYq/Gqv0iDrahe6WVyGmmta5zRC1l9s5hZ9rnVMM2Ruc9e4R+uUZsi810ZPZH7TOqUZMv9B8ORrMFTrUA2QfYRshC+0xmqA7EvkCNilNVYDZN8tR8BZrbEaIPs5NkDu/+dLG5JdNsDvWmM1QPZbbIBoIgt/ah3SjGQm+yTZACK5OZD37NgY0WcpRzJKVu2GqNoURa8BbmZkW28TugUAAAAASUVORK5CYII=';
        }

    });