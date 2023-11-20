<?php

include('database.php');
$query= "SELECT * from car";
$result = mysqli_query($connection, $query);

if(!$result){
    die("Consulta fallida".mysqli_error($connection));
}

$json = array();

while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['nombre'],
        'ano' => $row['ano'],
        'marca' => $row['marca'],
        'modelo' => $row['modelo'],
        'id' => $row['id']
    );
}
$jsonString = json_encode($json);
echo $jsonString
?>