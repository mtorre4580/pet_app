<?php
	include('setup/constants.php');
    include('setup/config.php');
    
    echo json_encode(obtenerTodasLasNoticias());

    function obtenerTodasLasNoticias() {
        $query = "SELECT DATE_FORMAT(fecha,'%d/%m/%Y') as fecha, LEFT(descripcion, 100) as descripcion, foto , titulo FROM noticias LIMIT 10;";
        global $cnx;
        $noticias = fetchAll(mysqli_query($cnx, $query), MYSQLI_ASSOC);
        if ($noticias > 0) {
           foreach ($noticias as $key => $noticia) {
                $noticia['foto'] = convertirFotoBase64($noticia['foto']);
                $noticias[$key] = $noticia;
           }
            return array(
                'success' => true,
                'noticias' =>  $noticias
            );
        }
        return array(
            'success' => true,
            'msg' => 'No se encontraron noticias'
        );
    }

    function convertirFotoBase64($foto) {
        $path = "uploads/$foto";
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        return 'data:image/' . $type . ';base64,' . base64_encode($data);
    }
    function fetchAll($res, $mode) {
		$array = array();
		while ($row = mysqli_fetch_array($res, $mode)) {
			$array[] = $row;
		}
		return $array;
	}
?>