// llamando a los valores para desarrollar la calculadora
const btn = document.querySelectorAll(".button"); // obteniendo el valor de todos los botones
const operation = document.getElementById("text"); // mostrar los valores desarrollados al usuario
const del = document.getElementById("delete"); // boton para borrar
const igl = document.getElementById("igl"); // valor del boton igual
const message = document.getElementById("message"); // para mostrar texto de mensaje
const par = document.getElementById("par"); // obtener el parentesis

// llamando elementos para el elemento de los temas
const theme = document.querySelector(".type-theme");  // color del contenedor de boton superior
const title = document.querySelector(".title"); // color del titulo
const textTheme = document.querySelector(".text-theme"); // color del texto
const ctnCalculator = document.querySelector(".container-calculator"); // color del contenedor de la calculadora
const body = document.querySelector(".body"); // color del bg del body
const btns = document.querySelectorAll(".buttons"); // color de los botones
const circle = document.querySelector(".circle"); // color del circulo del boton superior

// obteniendo el valor de la tabla
const infoTable = document.getElementById("content-history");
const ctnTable = document.querySelector(".content-history");
const history = document.querySelector(".history");

// funcion para cambiar el color de los elementos cada vez que da click
theme.addEventListener("click", () => {
    btns.forEach(element => {
        element.classList.toggle("dark");
    }); // funcion de cambiar de color a los botones
    circle.classList.toggle("dark"); // funcion de cambiar de color al circulo
    body.classList.toggle("dark"); // funcion de cambiar de color al body
    title.classList.toggle("dark"); // funcion de cambiar de color al titulo
    textTheme.classList.toggle("dark"); // funcion de cambiar de color al texto
    ctnCalculator.classList.toggle("dark"); // funcion de cambiar de color al contenido de la calculadora
    ctnTable.classList.toggle("dark"); // funcion de cambiar de color de la tabla
    history.classList.toggle("dark"); // funcion de cambiar de color a las historias
    infoTable.classList.toggle("dark"); // funcion de cambiar de color al info de la tabla
    message.classList.toggle("dark"); // funcion de cambiar de color al mensaje
});

// declarando variables
var getButton;
var result;
var conteo;
var delResult;

// almacenamiento del historial
var historyDate = [];

// funcionamiento de la calculadora
btn.forEach(btns => {
    btns.addEventListener("click", () => {
        getButton = btns.value; // obtener el valor de los botones
        // el signo += ayuda a que podemos tener el valor de los botones varias veces
        operation.value += getButton;
        result = operation.value; // guardamos el operation.value dentro de una variable
        conteo = result.length; // contamos cuantos caracteres estan dentro de result
    });
});

// funcionamiento para eliminar los elementos
del.addEventListener("click", () => {
    delResult = result.substring(conteo - 1, -1); // es para recortar la cadena y mostrar el nuevo resultado de la cadena
    result = delResult; // la variable result va a guardar el el nuevo resultado que fue recortado
    conteo = delResult.length; // va a contar cuantos caracteres hay
    operation.value = delResult; // guarda el valor  del nuevo resultado
});

// numero de cuenta de la tabla
var numero = 0;

// funcion para mostrar despues por medio de setTimeOut
function timeMessage() {
    message.innerHTML = ""; // convertir una cadena vacia
    message.style.display = "none"; // ocultar el contenedor del mensaje
}

// funcion para dar mensajes
function showMessage(text){
    message.innerHTML = text; // se almacenara un valor
    message.style.display = "flex"; // lo vuelve visible al contenedor de mensaje
    setTimeout(timeMessage, 3000); // llama una funcion que oculta el contendor de mensaje
}

let vlrPar = false; // declarar una variable
// evento cuando da click
par.addEventListener("click", ()=>{
    // comprueba si el valor es verdadero o false y se ejecuta tal codigo
    if (vlrPar == false){
        par.value = ")";
        vlrPar = true;
    }else{
        par.value = "(";
        vlrPar = false;
    }
})

// evento para la asignación de igual
igl.addEventListener("click", () => {
    try {
        if (operation.value != "") {
            if (result[0] != "0" || result.includes(".") == true) {
                // declaramos la variable para obterner los valores del historial
                var getHistory;
                // condicion para remplazar el caracter de x por *
                if (result.includes("x") == true) {
                    result = result.replace(/x/g, "*");
                }
                // condicion para remplazar el caracter de ÷ por /
                if (result.includes("÷") == true) {
                    result = result.replace(/÷/g, "/");
                }
                var resultOperator = eval(result); // Aqui se realiza las operaciones
                operation.value = resultOperator; // mostrar el resultado en pantalla
                historyDate.push(resultOperator); // mostrar el resultado en el historial
                // funcionamiento del operador %
                let rslPorc = result.includes("%"); // busca si hay un caracter "%"
                if (rslPorc == true) {
                    let n = result; // capturamos el valor que tiene el textfield
                    // verificando si al realizar la operación de porcentaje se ha presionado otro cualquier operador
                    if (n.includes("+") == true || n.includes("-") == true || n.includes("*") == true || n.includes("/") == true) {
                        operation.value = "operación no valida"; // devolvera este mensaje dentro del textfield
                        historyDate.push("sin resultado"); // devolvera este mensaje dentro del historial
                    }
                    else {
                        // cada vez que halla el valor "%" y hara una separacion y o agregara en una array
                        let porVlr = n.split("%"); // divide la cadena en array cada vez que encuentre %
                        let countPorVlr = porVlr.length // cuenta cuantos elementos hay porVlr
                        // resultado de la operación
                        let p = 1; // valor que mas adelante incrementaremos
                        let resultPorc = porVlr[0]; // valor de la primer valor
                        // bucle para desarrollar el porcentaje las veces que se pueda
                        while (p < countPorVlr) {
                            resultPorc *= porVlr[p];
                            resultPorc /= 100;
                            p++
                            if (p == countPorVlr) { // cuenta cuantos elementos hay y si es igual dara finalizara el bucle
                                break
                            }
                        }
                        operation.value = resultPorc; // mostrando el resultado de la operacion
                        historyDate.push(resultPorc); // mostrando el resultado en el historial
                    }
                }
                // obtener la fecha
                date_one = new Date();
                hour = date_one.getHours(); // obtener la hora
                minute = date_one.getMinutes(); // obtener los minutos
                second = date_one.getSeconds(); // obtener los segundos
                // si la hora, minutos y segundos es menor que 10, se le agregara un 0
                hour = (hour < 10) ? `${0}${hour}` : hour;
                minute = (minute < 10) ? `${0}${minute}` : minute;
                second = (second < 10) ? `${0}${second}` : second;
                // funcionamiento del registro de historial
                historyDate.forEach(elementHistory => {
                    getHistory = elementHistory;
                });
                // si el resultado es undefinido se realizaran estas instrucciones
                if (resultOperator == undefined) {
                    operation.value = "";
                    getHistory = "Sin resultado";
                }
                tr = document.createElement("tr"); // creando un elemento
                numero++; // incrementando
                // añadiendo el contenido al tr
                tr.innerHTML = `<td>${numero}</td><td>${hour}:${minute}:${second}</td><td>${getHistory}</td>`;
                infoTable.appendChild(tr); // aqui se añade el tr
            }else{
                operation.value = "";
                showMessage("operación invalida"); // llamando a la función showMessage
            }
        }
        else {
            // mensaje si no hay ningun dato
            showMessage("No hay ningún dato"); // llamando a la función showMessage
        }

    } catch (error) {
        // instrucciones si en todo caso hay un error en las operaciones;
        showMessage("Operación Invalida")
        operation.value = ""; // vuelve vacio al texfield
        // mensaje a la consola
        window.console.log(`El error que ha ocurrido es: ${error}`);
    }
});
