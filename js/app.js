
const contadorCarrito = document.getElementById('contadorCarrito')

const contenedorCarrito = document.getElementById("carritoContenedor");


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

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        imprimirCarrito()
    }
})




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
                            <p>${producto.descripcion}</p>
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
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se agrego el producto al carrito',
            showConfirmButton: false,
            timer: 1500
        })
    }


    imprimirCarrito(); //actualiza el carrito
    console.log(carrito);

}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento y da el indice

    carrito.splice(indice, 1) //a traves del indice se elimina el elemento
    imprimirCarrito()
    console.log(carrito)

}
//chequeo de carrito de usuario
function checkUserCarrito() {
    const userCarrito = (sessionStorage.getItem(`userCarrito`));
    let carritotemp = JSON.parse(localStorage.getItem(userCarrito))
    if (carritotemp) {
        carrito.push(...carritotemp)
    }
    console.log(carrito);
    imprimirCarrito();
}


const imprimirCarrito = () => {
    // carrito en modal
    contenedorCarrito.innerHTML = ""
    carrito.forEach((producto) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
              <p>${producto.nombre}</p>
              <p>Precio: $ ${producto.precio}</p>
              <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
              <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    //mod contador del carrito
    contadorCarrito.innerText = carrito.length;
    console.log(carrito)
    //mod precioTotal
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
    //se almacena el carrito y se usa como clave el correo del usuario para recuperar los prod seleccionados
    localStorage.setItem(sessionStorage.userCarrito, JSON.stringify(carrito))
}



const vaciarCarrito = document.getElementById('vaciarCarrito')
//boton vaciar carrito
vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    imprimirCarrito()
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: `vaciaste tu carrito`,
        showConfirmButton: false,
        timer: 1500
    })
})


//funcion simul. de pago en boton realizar compra
const realizarCompra = document.getElementById("procesar-pedido");
realizarCompra.addEventListener("click", e => pagar());

const pagar = () => {
    if (carrito.length !== 0) {
        vaciarCarrito.click()
Swal.fire({
    position: 'center',
    icon: 'success',
    title: `Ya recibimos tu pedido!
    Acércate a una de nuestras sucursales`,
    showConfirmButton: false,
    timer: 1500
})
    } else {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `No hay nada agregado en tu carrito`,
            showConfirmButton: false,
            timer: 1500
        })
    }

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













