<?php

include('database.php');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$modelo = $data['modelo'];
$ano = $data['ano'];
$name = $data['nombre'];
$descripcion = $data['descripcion'];
$id = $data['id'];

$query = "UPDATE car SET nombre = '$name', ano = '$ano', marca = '$descripcion', modelo = '$modelo' WHERE id = '$id'";

$result = mysqli_query($connection, $query);

if(!$result){
    die("resulta fallida");
}
?>