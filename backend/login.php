<?php
	include('setup/constants.php');
    include('setup/config.php');

    $usuario = json_decode(file_get_contents('php://input'), true);

    echo json_encode(loginUsuario($usuario));

    function loginUsuario($usuario) {
        $query = "SELECT * FROM usuario WHERE password = '$usuario[password]' AND  email = '$usuario[email]' LIMIT 1";
        global $cnx;
        $resultados = mysqli_query($cnx, $query);
        $usuario = mysqli_fetch_array($resultados);
        if(mysqli_affected_rows($cnx) > 0) {
            return array(
                'success' => true,
                'msg' => 'Se ha autenticado correctamente!',
                'nombre' => $usuario['nombre'],
                'email' => $usuario['email'],
                'foto' =>  $usuario['foto'],
                'idUser' => $usuario['id']
            );
        }
        return array(
            'success' => false,
            'msg' => 'Los datos ingresados no son correctos'
        );
    }
?>