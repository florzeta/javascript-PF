const openModal = document.querySelector('.open-modal');

const modal = document.querySelector('.modal');

const closeModal = document.querySelector('.modal_close');

const openCarrito = document.querySelector('.open-carrito');

const modalCarrito= document.querySelector('.modal-container-carrito');

const cerrarCarrito = document.querySelector('.closeCarrito');


openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal-show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal-show');
});

openCarrito.addEventListener('click', (e)=>{
    e.preventDefault();
    modalCarrito.classList.add('modal-carrito-show');
});

cerrarCarrito.addEventListener('click', (e)=>{
    e.preventDefault();
    modalCarrito.classList.remove('modal-carrito-show');
});