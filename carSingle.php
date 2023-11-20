<?php

include('database.php');
$id = $_POST['element'];

$query = "SELECT * FROM car WHERE id = $id";

$result = mysqli_query($connection, $query);

if(!$result){
    die("Resulta fallida");
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

$jsonString = json_encode($json[0]);
echo $jsonString;

?>