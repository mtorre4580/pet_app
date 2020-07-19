<?php
	include('setup/constants.php');
	include('setup/config.php');

	if(isset($_GET['fecha'])) {
		echo obtenerTurnos($_GET['fecha']);
	}

	function obtenerTurnos($fecha) {
		$turnosGuardados = obtenerTodosLosTurnos($fecha);
		$respuesta = array(
			'success' => true,
			'turnos' => cargarTurnosLibres($fecha, $turnosGuardados)
		);
		return json_encode($respuesta);
	}

	function obtenerTodosLosTurnos($fecha) {
		$query = "SELECT t.fecha, t.horario, u.nombre, u.foto FROM turno t JOIN usuario u ON u.id = t.fk_usuario WHERE fecha = '$fecha';";
		global $cnx;
		return fetchAll(mysqli_query($cnx, $query), MYSQLI_ASSOC);
	}

	function fetchAll($res, $mode) {
		$array = array();
		while ($row = mysqli_fetch_array($res, $mode)) {
			$array[] = $row;
		}
		return $array;
	}

	function cargarTurnosLibres($fecha, $turnos) {
		$turnosDisponibles = array();
		foreach(HORARIOS as $horario) {
			$turno = getTurno($horario, $turnos);
			if($turno) {
				$turno['disponible'] = false;
			} else {
				$turno = array(
					'fecha' => $fecha,
					'horario' => $horario,
					'nombre' => null,
					'disponible' => true
				);
			}
			array_push($turnosDisponibles, $turno);
		}
		return $turnosDisponibles;
	}

	function getTurno($horario, $resultados) {
		foreach($resultados as $r) {
			if($r['horario'] === $horario) {
				return $r;
			}
		}
		return null;
	}
?>



