let peliculaContainer = document.getElementById("peliculas");
let modal = new bootstrap.Modal(document.getElementById("nuevaPeliculaModal"), {
  keyboard: false
});
let btnSearch = document.getElementById("submit");
let modalEdit = new bootstrap.Modal(document.getElementById("editarModal"), {
  keyboard: false
});
let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];



btnSearch.addEventListener("click", listarBusqueda)

let listarPeliculas = () => {
  peliculaContainer.innerHTML = '';

  peliculas.forEach((pelicula, id) => {
    peliculaContainer.innerHTML += `<div class="col">
        <div class="card">
          <img src="${pelicula.imagen}" class="card-img-top" alt="..." width:"250px" height: "200px">
          <div class="card-body">
            <h5 class="card-title">${pelicula.titulo}</h5>
            <p class="card-text">Descripcion: ${pelicula.descripcion}</p>
            <p class="card-text">Director: ${pelicula.director}</p>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editarModal"
                onclick="setEdit(${id})">Modificar</button>
                <button type="button" class="btn btn-danger" onclick="eliminarPelicula(${id})">Eliminar</button>
            </div>
          </div>
        </div>
      </div>`;
  });
}

listarPeliculas();

let AgregarPelicula = () => {
  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let director = document.getElementById("director").value;
  let imagen = document.getElementById("imagen").value;

  peliculas.push({
    titulo: titulo,
    descripcion: descripcion,
    director: director,
    imagen: imagen
  });

  localStorage.setItem('peliculas', JSON.stringify(peliculas));
  listarPeliculas();
}

function editarPelicula() {
  let titulo = document.getElementById("tituloEditar").value;
  let descripcion = document.getElementById("descripcionEditar").value;
  let director = document.getElementById("directorEditar").value;
  let imagen = document.getElementById("imagenEditar").value;
  let index = event.target.dataset.id;
    
  peliculas[index] = {
    titulo: titulo,
    descripcion: descripcion,
    director: director,
    imagen: imagen
  }

  localStorage.setItem('peliculas', JSON.stringify(peliculas));
  modalEdit.hide();
  listarPeliculas();
}

function setEdit(index) {
  document.getElementById("tituloEditar").value = peliculas[index].titulo;
  document.getElementById("descripcionEditar").value = peliculas[index].descripcion;
  document.getElementById("directorEditar").value = peliculas[index].director;
  document.getElementById("imagenEditar").value = peliculas[index].imagen;

  let btn = document.getElementById('btnEdit');
  btn.setAttribute("data-id", index);
}

function eliminarPelicula(index) {
  let confirmar = confirm('Desea elminar?');

  if (confirmar) {
    peliculas.splice(index, 1);
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    listarPeliculas();  
  }

}

function listarBusqueda(event) {
  let result = [];
  event.preventDefault();  
  let filtro = document.getElementById("search").value;
  result = peliculas.filter(pelicula => pelicula.titulo == filtro || pelicula.director == filtro)
  
  if(filtro == ""){
    listarPeliculas();
  } 
  else if(result.length == 0){
    peliculaContainer.innerHTML = '<h1>No se encontraron coincidencias</h1>';
  }
  
  else if(filtro != "") {
    console.log('entra');

    peliculaContainer.innerHTML = '';
    result.forEach((item, index) => {
      peliculaContainer.innerHTML += `<div class="col">
        <div class="card">
          <img src="${item.imagen}" class="card-img-top" alt="..." width:"250px" height: "200px">
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">Descripcion: ${item.descripcion}</p>
            <p class="card-text">Director: ${item.director}</p>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editarModal"
                onclick="setEdit(${index})">Modificar</button>
                <button type="button" class="btn btn-danger" onclick="eliminarPelicula(${index})">Eliminar</button>
            </div>
          </div>
        </div>
      </div>`;
    });    
  }
  
}