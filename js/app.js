const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

//totales de carrito
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


let carrito = [];
let productos = [];
//empieza declaracion de clases y funciones -------------------------
class Producto {
    constructor(id, nombre, img, precio, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = 0;
    }
}

const cargarProductos = async () => {
    let listaProductos = [];
    try {
        const response = await fetch("./stock.json");
        let responseProductos = await response.json();
        productos = responseProductos;
        console.log(responseProductos);
        responseProductos.forEach(p => {
            listaProductos.push(new Producto(p.id, p.nombre, p.img, p.precio, p.descripcion))
        }
        )
    } catch (error) {
        console.log(error);
    }
    return listaProductos;
}

const imprimirProductos = async (listaP) => {
    const contenedorProductos = document.getElementById('producto-contenedor');
    try {
        listaP.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
                <div class="card" id="productos">
                <div class="image-product">
                    <img src="${producto.img}" alt="">
                </div>
                <div class="content"> 
                    <div class="productName">
                    <h3>${producto.nombre}</h3>
                </div>
                        <div class="price"> $ ${producto.precio}</div>
                        <div class="descripcion">
                            <p>${producto.descr}</p>
                        </div>
                            
                        <button id="agregar${producto.id}" class="boton-agregar modal-carrito-show">Agregar <i class="fas fa-shopping-cart open-carrito"></i></button>
                    </div>
                    `
            contenedorProductos.append(div);
            //boton para cada producto que se agregue al carrito
            const boton = document.getElementById(`agregar${producto.id}`)
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto.id);
            })
            return productos;
        })
    } catch (error) {
        console.log(error);
    }
}
// traerProductos(productos);

//funcion para agregar el producto seleccionado al carrito mediante el id
const agregarAlCarrito = (prodId) => {
    const itemExistente = carrito.some(prod => prod.id === prodId)
    if (itemExistente) { //se valida que exista el item en el carrito
        const temp = carrito.map(prod => {
            prod.id === prodId && prod.cantidad++ //se le suma uno a la cantidad que hay
        })
    } else { //si no existe en el carrito
        const item = productos.find((prod) => prod.id === prodId);
        if (item) {
            const temp = productos.map(prod => {
                if (prod.id === prodId) {
                    prod.cantidad = 1
                }
            })
        }
        carrito.push(item);// se carga al carrito
    }
    
    imprimirCarrito(carrito); //actualiza el carrito
    console.log(carrito);
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    // un elemento 
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
    console.log(carrito)
}
const imprimirCarrito = (c) => {
    // carrito en modal
    const contenedorCarrito = document.getElementById("carritoContenedor");
    contenedorCarrito.innerHTML = "";
        c.forEach((producto) => {
            const div = document.createElement('div')
            div.className = ('productoEnCarrito')
            div.innerHTML = `
              <p>${producto.nombre}</p>
              <p>Precio: $ ${producto.precio}</p>
              <p>Cantidad:<span id="cantidad">${producto.cantidad}</span></p>
              <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
            contenedorCarrito.append(div)
        })
    }


// funcion global de procesos asincronos 
const global = async () => {
    await cargarProductos();
    imprimirProductos(productos);
    // agregarAlCarrito(); 
}
//termina declaracion de clases y funciones ----------------------

//Que se hace en la ejecuccion: -------------------------------------------------

global();
// cargarEventosEnBotones()

export { eliminarDelCarrito };



















// let main = function(){
//     datosRegistro();
// }

// let datosRegistro = function(){
//     document.querySelector("botonRegistro").setAttribute("onclick", "dataRead()");
// }


// let dataRead = function(){
//     console.log("Registrando datos del formulario");
//     console.log(
//         document.querySelector("#nombre").value,
//         document.querySelector("#apellido").value,
//         document.querySelector("#email").value,
//         document.querySelector("#pass").value,
//     );

//     let usuarioCreado = {
//         nombre : document.querySelector("#nombre").value,
//         apellido : document.querySelector("#apellido").value,
//         email : document.querySelector("#email").value,
//         password : document.querySelector("#pass").value,
//     };

//     console.log(usuarioCreado);
//     //JSON (paso objeto(usuarioCreado) a string)
//     console.log(JSON.stringify(usuarioCreado));
//     //Guardo datos del form en Localstorage
//     save_localStorage(usuarioCreado);
// }

// let save_localStorage= function(usuarioOk){
//     localStorage.setItem("datosCargados", JSON.stringify(usuarioOk));
// }
// let read_localStorage = function(){
//     let usuarioOk = localStorage.getItem("datosCargados");
//     console.log(datosCargados);
//     let usuarioCreado = JSON.parse(datosCargados);
//     console.log(usuarioCreado);

// }

