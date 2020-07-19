<?php
	include('setup/constants.php');
    include('setup/config.php');

    $uri = $_SERVER['REQUEST_URI'];

    $paths = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

    $idUser = $paths[2];
    $idTurno = $paths[3];

    if (!empty($idUser) && !empty($idTurno)) {
        echo json_encode(cancelarTurno($idUser, $idTurno));
    } else {
        echo json_encode(datosInvalidos());
    }

    function cancelarTurno($idUser, $idTurno) {
        $query = "DELETE FROM turno WHERE fk_usuario = '$idUser' AND id = '$idTurno';";
        global $cnx;
        mysqli_query($cnx, $query);
        if (mysqli_affected_rows($cnx) == 1) {
            return array(
                'success' => true,
                'msg' =>  'Se canceló correctamente el turno'
            );
        }
        return array(
            'success' => false,
            'msg' => "No existe un turno con el id $idTurno"
        );
    }

    function datosInvalidos() {
        return array(
            'success' => false, 
            'msg' => 'El request enviado es invalido'
        );
    }
?>