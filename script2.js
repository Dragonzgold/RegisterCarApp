fetchCar();

//Apartado de busqueda de la pagina
$('#datosResult').hide();
let edit = false;

$('#search').keyup(function () {
    if ($('#search').val()) {
        let search = $('#search').val();

        var objt = new XMLHttpRequest();
        objt.open('POST', 'taskSearch.php', true);
        objt.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        objt.onreadystatechange = function () {
            if (objt.readyState == 4 && objt.status == 200) {
                let datos = JSON.parse(objt.response);
                let template = '';
                datos.forEach(dato => {
                    template += `<li>
                    ${datos[0].nombre}
                    </li>`
                });
                document.querySelector('#container').innerHTML = template;
                $('#datosResult').show();
            }
        }
        var data = 'search=' + encodeURIComponent(search);
        objt.send(data);
    }
});

//Apartado de ingresar datos a la base de datos

$('#carForm').submit(function (e) {
    e.preventDefault();

    var nombreCar = document.getElementById('name').value;
    var nombreCarS = nombreCar.replace(/ /g, "");
    var descripcionCar = document.getElementById('mark').value;
    var descripcionCarS = descripcionCar.replace(/ /g, "");
    var modeloCar = document.getElementById('carModelo').value;
    var modeloCarS = modeloCar.replace(/ /g, "");

    let urlAddEdit = edit === false ? 'carAdd.php' : 'carEdit.php';

    if (nombreCarS == "") {
        alert("El nombre del registro esta vacio")
    } else if (descripcionCarS == "") {
        alert("La descripcion esta vacia")
    } else if(modeloCarS == ""){
        alert('El apartado del modelo del carro esta vacio')
    } else {
        postDate = {
            nombre: nombreCarS,
            descripcion: descripcionCarS,
            ano : document.getElementById('carAno').value,
            modelo : modeloCarS,
            id: document.getElementById('carId').value
        }

        const xhr = new XMLHttpRequest();
        const url = urlAddEdit;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    fetchCar();
                    document.getElementById('name').value = "";
                    document.getElementById('mark').value = "";
                    document.getElementById('carAno').value = "";
                    document.getElementById('carModelo').value = "";
                } else {
                    console.error('Hubo un error en la solicitud:', xhr.status);
                }
            }
        };
        xhr.send(JSON.stringify(postDate));
    }
});

//Funcion para traer los datos a la pagina

function fetchCar() {

    const carList = new XMLHttpRequest();
    const url = 'carList.php';
    carList.open('GET', url, true);
    carList.onreadystatechange = function () {
        if (carList.readyState === XMLHttpRequest.DONE) {
            if (carList.status === 200) {
                let carListBody = JSON.parse(carList.response);
                let template = '';

                carListBody.forEach(carListBody => {
                    template += `<tr>
                    <td>${carListBody.id}</td>
                    
                    <td>
                        <a href="#" onclick="clickCar(${carListBody.id})">${carListBody.name}</a>
                    </td>
                    <td>${carListBody.ano}</td>
                    <td>${carListBody.marca}</td>
                    <td>${carListBody.modelo}</td>
                    <td>
                        <button class="btn btn-danger" onclick="prueba(${carListBody.id})">
                         Delete
                        </button>
                    </td>
                    </tr>`
                });
                document.querySelector('#carBody').innerHTML = template;
            } else {
                console.error('Hubo un error en la solicitud:', carList.status);
            }
        }
    };
    carList.send();
};

//funcion para eliminar

function prueba(id){
    if(confirm("Estas seguro que quieres eliminar la tarea?")){
        $.post('carDelete.php', {id}, function(response){
            fetchCar()
        });
    };
};

//Funcion para darle al nombre y modificar

function clickCar(id){
    let element = id;
    $.post('carSingle.php', {element}, function(response){
        const car = JSON.parse(response);
        document.getElementById('name').value = `${car.name}`;
        document.getElementById('mark').value = `${car.marca}`;
        document.getElementById('carAno').value = `${car.ano}`;
        document.getElementById('carModelo').value = `${car.modelo}`;
        document.getElementById('carId').value = `${car.id}`;
        edit = true;
    });
}