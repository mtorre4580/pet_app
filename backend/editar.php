<?php
	include('setup/constants.php');
    include('setup/config.php');

    $usuario = json_decode(file_get_contents('php://input'), true);

    echo json_encode(modificarUsuario($usuario));

    function modificarUsuario($usuario) {
        $query = "UPDATE usuario SET password = '$usuario[newPassword]' WHERE id = '$usuario[idUser]' AND password='$usuario[password]';";
        global $cnx;
        $success = mysqli_query($cnx, $query);
        if($success) {
            return array(
                'success' => true,
                'msg' => 'Se modificó su contraseña',
            );
        }
        return array(
            'success' => false,
            'msg' => 'Se produjo un error al modificar la contraseña'
        );
    }
?>