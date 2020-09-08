// Constantes que contienen las url
const urlPedidos = "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json";
const urlProductos = "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json";

// Se importa para que funcione en VS Code. 
// Para correr en consola toca quitar la línea de abajo.
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Obtiene el texto de respuesto
function obtenerTexto(url) {

    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            }
            else {
                //Error.
                reject(Error('No cargó correctamente; Código error:' + req.statusText));
            }
        };
        // Error de conexión
        req.onerror = function () {
            reject(Error("Hubo un error de conexión."));
        };
        req.send();


    });
}
// Variables en donde se van a guardar los JSON de los pedidos y productos
let jsonPedidos;
let jsonProductos;
obtenerTexto(urlPedidos).then(function(response)
{
    jsonPedidos = JSON.parse(response);
})
obtenerTexto(urlProductos).then(function(response)
{
    jsonProductos = JSON.parse(response);
})

// También se puede hacer que una promesa llame a la otra promesa. En este caso se espera a que las dos terminen
Promise.all([obtenerTexto(urlPedidos), obtenerTexto(urlProductos)]).then((values) => {
    let numMax = 0;
    let productoMax = 0;
    for (let i = 0; i < jsonProductos.length; i++) {
        let productoActual = jsonProductos[i];
        let numActual = 0;
        for (let j = 0; j < jsonPedidos.length; j++) {
            if(productoActual.idproducto === jsonPedidos[j].idproducto)
            {
                // Coerción del string a number utilizando el operador +
                numActual = numActual + +jsonPedidos[j].cantidad
            }
            
        }
        if (numActual > numMax)
        {
            productoMax = productoActual.nombreProducto
            numMax = numActual
        }
        
    }
    // Imprimir resultados
    console.log("El producto del que se pidió una mayor cantidad fue:", productoMax)
    console.log("Se pidieron:", numMax, "unidades")
})

