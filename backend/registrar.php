<?php
	include('setup/constants.php');
    include('setup/config.php');

    $usuario = json_decode(file_get_contents('php://input'), true);

    echo json_encode(registrarUsuario($usuario));

    function registrarUsuario($usuario) {
        $query = "SELECT * FROM usuario WHERE password = '$usuario[password]' AND  email = '$usuario[email]' LIMIT 1; ";
        global $cnx;
        mysqli_query($cnx, $query);
        if(mysqli_affected_rows($cnx) == 0) {
            $query = "INSERT INTO usuario SET email = '$usuario[email]', password = '$usuario[password]', nombre = '$usuario[nombre]', foto = '$usuario[foto]'; ";
            $success = mysqli_query($cnx, $query);
            if($success) {
                return array(
                    'success' => true,
                    'msg' => 'Se registro correctamente',
                    'idUser' => mysqli_insert_id($cnx)
                );
            }
            return array(
                'success' => false,
                'msg' => 'Se produjo un error al registrar el usuario'
            );
        }
        return array(
            'success' => false,
            'msg' => 'Ya existe un usuario con ese email'
        );
    }
?>