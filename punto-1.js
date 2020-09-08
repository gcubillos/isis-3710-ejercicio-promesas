const urlPedidos = "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json";
const urlProductos = "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json";


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function obtenerJson(url) {

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
        req.onerror = function () {
            reject(Error("There was a network error."));
        };
        req.send();


    });
}
let jsonPedidos;
let jsonProductos;
Promise.all([jsonPedidos = obtenerJson(urlPedidos), jsonProductos = obtenerJson(urlProductos)]).then((values) => {
    console.log(jsonProductos);
})
