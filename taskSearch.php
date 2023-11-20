<?php
    include('database.php');
    $search = $_POST['search'];

    if(!empty($search)){
        $query = "SELECT * FROM car WHERE nombre LIKE '$search%'";
        $result = mysqli_query($connection, $query);

        if(!$result){
            die('error de consulta'. mysqli_error($connection));
        } else {
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    'nombre' => $row['nombre'],
                    'marca' => $row['marca'],
                    'ano' => $row['ano'],
                    'modelo' => $row['modelo'],
                    'id' => $row['id']
                );
            }
            $jsonString = json_encode($json);
            echo $jsonString;
        }
    }

?>