// Guardar en LS - Tanto key como value deben ser . Si necesito transformar a string
// usamos el metodo JSON.stringify();
// localStorage.setItem('key', JSON.stringify(value)); 

// localStorage.removeItem('key');

// // Si el elemento esta en string lo transformamos a objeto con JSON.parse()
// let elemento = localStorage.getItem('key')
// elemento = JSON.parse(elemento);

let content = document.querySelector('#noticias');
let del = document.getElementById("delete");
let edit = document.getElementById("edit");
let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

function listarNoticias(){
    content.innerHTML = '';

    noticias.forEach(function(item, id){
        content.innerHTML += `<tr>
            <th scope="row">${id}</th>
            <td>${item.titulo}</td>
            <td>${item.body}</td>
            <td>${item.autor}</td>
            <td><img src="${item.imagen}" width="200" height="150"></td>
            <td><button id="edit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="cargarDatos(${id})">Editar</button> <button id="delete" class="btn btn-danger" onclick="eliminar(${id})">Eliminar</button></td>
            
        </tr>`; 
    })
}

listarNoticias();

function agregarNoticia(){
    let titulo = document.querySelector('#Titulo').value;
    let contenido = document.querySelector('#Contenido').value;
    let autor = document.querySelector('#Autor').value;
    let imagen = document.querySelector('#Imagen').value;
    let formNoticia = document.querySelector('#formNoticia');

    if(titulo!=''){
        if(contenido !=''){
            if(autor!=''){
                if(imagen!=''){
                    noticias.push({
                        titulo: titulo,
                        body: contenido,
                        autor: autor,
                        imagen: imagen
                    });      
                    formNoticia.reset();                
                }
                else{
                    noticias.push({
                        titulo: titulo,
                        body: contenido,
                        autor: autor,
                        imagen: 'https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg'
                    }); 
                    formNoticia.reset();                     
                }
            }
            else{
                alert('Por favor ingrese un Autor')
            }    
        }
        else{
            alert('Por favor ingrese contenido')
        }    
    }
    else{
        alert('Por favor ingrese un Título')
    }    

    localStorage.setItem('noticias', JSON.stringify(noticias));

    listarNoticias();
}

function eliminar(id){
    let flag = confirm("Esta seguro de eliminar?");
    console.log("confirmar", flag);

    if(flag){
        noticias.splice(id, 1);
        
        localStorage.setItem('noticias', JSON.stringify(noticias));
    
        listarNoticias();    
    }
}

function cargarDatos(id){
    let titulo = document.getElementById("editTitulo");
    let contenido = document.getElementById("editContenido");
    let autor = document.getElementById("editAutor");
    let imagen = document.getElementById("editImagen");
    let btnEdit = document.getElementById("btnEdit");
    btnEdit.setAttribute("data-id", id);

    titulo.value = noticias[id].titulo;
    contenido.value = noticias[id].body;
    autor.value = noticias[id].autor;
    imagen.value = noticias[id].imagen;

}

function editar(){
    let titulo = document.getElementById('editTitulo').value;
    let contenido = document.getElementById('editContenido').value;
    let autor = document.getElementById('editAutor').value;
    let imagen = document.getElementById('editImagen').value;

    let id = event.target.dataset.id;
    noticias[id] = {
        titulo: titulo,
        body: contenido,
        autor: autor,
        imagen: imagen
    }

    localStorage.setItem("noticias", JSON.stringify(noticias));
    
    listarNoticias(); 
}