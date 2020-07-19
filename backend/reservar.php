<?php
	include('setup/constants.php');
    include('setup/config.php');

    $reserva = json_decode(file_get_contents('php://input'), true);

    echo json_encode(realizarReserva($reserva));

    function realizarReserva($reserva) {
        $query = "INSERT INTO turno SET fecha = '$reserva[fecha]', horario = '$reserva[horario]', fk_usuario = '$reserva[idUser]' ;";
        global $cnx;
        $success = mysqli_query($cnx, $query);
        if($success) {
            return array(
                'success' => true,
                'msg' => 'Se registro la reserva correctamente',
            );
        }
        return array(
            'success' => false,
            'msg' => 'Se produjo un error al confirmar la reserva'
        );
    }
?>