// //Calcular costo total de productos y/o servicios seleccionados por el usuario
var cantidadProducto = 0;
let compra = [{
    listadoproductos: []
}, {
    listaservicios: []
}]
let prooserv,
    compras,
    carrito = 0;
let termino,
    listado,
    sonProdosonserv,
    finalizarCompra = "";
let quecompre = [];
let listadoCompra = document.getElementById("listadoCompra");
let totalCompra = document.getElementById("totalCompra");
let eligiendo = document.getElementById("elige");
let servproductos = document.getElementById("producservice");
let botonAgregar = document.getElementById("botonAgregar");
let elegir = document.getElementById("elegir");
let agregarproducto = document.getElementById("botonAProduct");
let agregarserv = document.getElementById("botonAServ");
let botonEliminar = document.getElementById("botonEliminar");
let botonComprar = document.getElementById("botonComprar");
let botonVaciar = document.getElementById("botonVaciar");


var obtenerProductos = [];
var obtenerServicio = [];


//RECUPERAR INFORMACIÓN DE LOCALSTORAGE

if (localStorage.getItem("compra") != null) {
    compra = JSON.parse(localStorage.getItem("compra"))
} else {

    fetch("json/producto.json")
        .then(response => response.json())
        .then(data => {


            for (let i = 0; i < data.length; i++) {
                compra[0].listadoproductos.push(data[i]);

            }
            localStorage.setItem("compra", JSON.stringify(compra));
        });

    console.log(compra)

    fetch("json/servicio.json")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                compra[1].listaservicios.push(data[i]);
            }
            localStorage.setItem("compra", JSON.stringify(compra));

        })

}

let [{ listadoproductos }, { listaservicios }] = compra;

function agregarProducto(tipoProducto) {

    this.tipoProducto = tipoProducto;
    let recuperar = localStorage.getItem("compra");
    recuperar = JSON.parse(recuperar);

    if (tipoProducto == 0) {

        let preguntas = [prompt("Ingrese el nombre del producto"),
            prompt("Ingrese una descripción del producto"),
            prompt("Ingrese algunas palabras claves del producto"),
            parseInt(prompt("ingrese el precio del producto"))
        ];

        let nuevoProducto = {
            id: recuperar[tipoProducto].listadoproductos.length + 1,
            titulo: preguntas[0],
            descripcion: preguntas[1],
            claves: preguntas[2],
            precio: preguntas[3],
            tipo: "producto"
        }

        recuperar[tipoProducto].listadoproductos.push(nuevoProducto);
        localStorage.setItem("compra", JSON.stringify(recuperar));

    } else if (tipoProducto == 1) {

        let preguntas2 = [prompt("Ingrese el nombre del servicio"),
            prompt("Ingrese una descripción del servicio"),
            prompt("Ingrese algunas palabras claves del servicio"),
            parseInt(prompt("ingrese el precio del servicio"))
        ];

        let nuevoProducto = {
            id: recuperar[tipoProducto].listaservicios.length + 1,
            titulo: preguntas2[0],
            descripcion: preguntas2[1],
            claves: preguntas2[2],
            precio: preguntas2[3],
            tipo: "servicio"
        }

        recuperar[tipoProducto].listaservicios.push(nuevoProducto);
        localStorage.setItem("compra", JSON.stringify(recuperar));
    }
    return recuperar;
}

//FORMULARIO /////////////////////////////////////////////////////////////////////////////////////

eligiendo.addEventListener("change", () => {

    let option;
    servproductos.removeAttribute('disabled');
    servproductos.remove
    botonAProduct.setAttribute("disabled", "disabled");
    botonAServ.setAttribute("disabled", "disabled");

    for (let i = 0; i < servproductos.length + 10; i++) {
        servproductos.remove(0);

    }

    if (eligiendo.selectedIndex == 1) {

        option = document.createElement('option')
        option.text = "Seleccionar producto";
        option.disabled = true;
        option.selected = true;
        servproductos.add(option);
        sonProdosonserv = 1;

        for (let i = 0; i < listadoproductos.length; i++) {

            option = document.createElement('option')
            option.text = listadoproductos[i].titulo;
            servproductos.add(option);
        }

    } else if (eligiendo.selectedIndex == 2) {
        option = document.createElement('option');
        option.text = "Seleccionar Servicio";
        option.disabled = true;
        option.selected = true;
        servproductos.add(option);
        sonProdosonserv = 2;
        for (let i = 0; i < listaservicios.length; i++) {

            option = document.createElement('option')
            option.text = listaservicios[i].titulo;
            servproductos.add(option);

        }

    }
})

servproductos.addEventListener("change", () => {
    let seleccion;
    botonAgregar.removeAttribute('disabled');

    if (sonProdosonserv == 1) {
        seleccion = listadoproductos.find((el) => el.id === servproductos.selectedIndex)
        document.querySelector('.precio').textContent = "$" + seleccion.precio;

    } else if (sonProdosonserv == 2) {
        seleccion = listaservicios.find((el) => el.id === servproductos.selectedIndex)
        document.querySelector('.precio').textContent = "$" + seleccion.precio;
    }

})

// INTERACCION CON LOS BOTONES  /////////////////////////////////////////////////////////////////////////////////////////////////

agregarproducto.addEventListener("click", () => {
    compra = agregarProducto(0);
    [{ listadoproductos }, { listaservicios }] = compra;
});
agregarserv.addEventListener("click", () => {
    compra = agregarProducto(1);
    [{ listadoproductos }, { listaservicios }] = compra;
});

botonAgregar.addEventListener("click", () => {
    botonComprar.removeAttribute('disabled');
    botonVaciar.removeAttribute('disabled');

    if (sonProdosonserv == 1) {
        seleccion = listadoproductos.find((el) => el.id === servproductos.selectedIndex)
        quecompre.push(listadoproductos[seleccion.id - 1]);
        carrito = repaso();
        cantidadProducto++;


    } else if (sonProdosonserv == 2) {
        seleccion = listaservicios.find((el) => el.id === servproductos.selectedIndex)
        quecompre.push(listaservicios[seleccion.id - 1]);
        carrito = repaso();
        cantidadProducto++;
    }



    desactivaroactivar();
    listamos();

})

function repaso() {

    let acumulador = 0;

    for (let i = 0; i < quecompre.length; i++) {
        acumulador = acumulador + quecompre[i].precio;
    }

    console.log(acumulador)

    return acumulador;
}

botonEliminar.addEventListener("click", () => {
    if (sonProdosonserv == 1) {
        quecompre.pop();
        carrito = repaso();
        cantidadProducto--;
    } else if (sonProdosonserv == 2) {
        quecompre.pop();
        carrito = repaso();
        cantidadProducto--;
    }
    desactivaroactivar();
    listamos();
})

botonComprar.addEventListener("click", () => {
    swal("Gracias por comprar en Welcome Compratodo", "El código de compra es: " + Math.round((Math.random()) * 8585858), "success");
    vaciamos();
    Toastify({
        text: "La compra fue realizada",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
})

botonVaciar.addEventListener("click", () => { vaciamos(); });

// FUNCIONES /////////////////////////////////////////////////////////////////////////////////////////////////


function vaciamos() {


    for (let i = 0; i < cantidadProducto; i++) {
        quecompre.pop();
    }
    carrito = 0;
    cantidadProducto = 0;
    botonEliminar.setAttribute('disabled', 'disabled');
    botonComprar.setAttribute('disabled', 'disabled');
    botonVaciar.setAttribute('disabled', 'disabled');
    botonAgregar.setAttribute('disabled', 'disabled');
    botonAProduct.removeAttribute('disabled');
    botonAServ.removeAttribute('disabled');
    document.querySelector('.precio').textContent = "$0"
    eligiendo.value = "0";

    for (let i = 0; i < servproductos.length + 10; i++) {
        servproductos.remove(0);

    }
    listamos();
}

function desactivaroactivar() {

    if (cantidadProducto > 0) {
        botonEliminar.removeAttribute('disabled');
    } else {
        botonEliminar.setAttribute('disabled', 'disabled');
        botonComprar.setAttribute('disabled', 'disabled');
        botonVaciar.setAttribute('disabled', 'disabled');
    }
}

function listamos() {


    listado = "";
    quecompre.forEach(ele => {
        listado = `${listado} \n${ele.titulo} : $${ele.precio}`;
    });

    listadoCompra.innerText = listado;
    totalCompra.innerText = carrito;
}

function listar(productoservice) {

    let lista = "";
    this.productoservice = productoservice;

    if (productoservice == 1) {

        for (let i = 0; i < listadoproductos.length; i++) {
            lista = lista + " " + listadoproductos[i].id + ". " + listadoproductos[i].titulo;
        }

    } else if (productoservice == 2) {
        for (let i = 0; i < listaservicios.length; i++) {
            lista = lista + " " + listaservicios[i].id + ". " + listaservicios[i].titulo;
        }
    }

    return lista;
}