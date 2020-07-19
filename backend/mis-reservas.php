<?php
	include('setup/constants.php');
    include('setup/config.php');

    $id = $_GET['id'];

    echo json_encode(obtenerLasReservasDelUsuario($id));

    function obtenerLasReservasDelUsuario($idUser) {
        $query = "SELECT id, DATE_FORMAT(fecha,'%d/%m/%Y') as fecha , horario FROM turno WHERE fk_usuario = '$idUser';";
        global $cnx;
        $turnos = fetchAll(mysqli_query($cnx, $query), MYSQLI_ASSOC);
        if($turnos > 0) {
            return array(
                'success' => true,
                'turnos' =>  $turnos
            );
        }
        return array(
            'success' => true,
            'msg' => 'No posee ningún turno'
        );
    }
    
	function fetchAll($res, $mode) {
		$array = array();
		while ($row = mysqli_fetch_array($res, $mode)) {
			$array[] = $row;
		}
		return $array;
	}
?>