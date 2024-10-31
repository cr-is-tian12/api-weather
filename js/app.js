import config from './../config.js';

const appID = config.APP_ID;

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e){
    e.preventDefault();

    console.log('Buscando clima..')

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad ==='' || pais===''){
 
        mostrarError('Los campos son obligatorios')
    }

    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje){
    console.log(mensaje)

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        //Scripting del mensaje
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 
        'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-2', 'text-center');

        alerta.innerHTML =`
            <strong class="font-bold">ERROR!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }

}


function consultarAPI(ciudad, pais){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

    // console.log(url)

    Spinner();

    fetch(url)
        .then(respuesta =>{
            return respuesta.json();
        })
        .then(resultadoDatos => {
            limpiarHtml()
            if(resultadoDatos.cod === '404'){
                mostrarError('Ciudad no encontrada')
                return;
            }
            //Imprimir respuesta en el html
            mostrarClima(resultadoDatos)
            console.log(resultadoDatos)
        })
}

function mostrarClima(resultadoDatos){
    const {name, main: { temp, temp_max, temp_min}} = resultadoDatos;
    
    const centigrados = Math.round(temp - 273.15);
    const max = Math.round(temp_max - 273.15);
    const min = Math.round(temp_min - 273.15);
    const city = name

    // const centigrados = temperaturaRedondeada(temp);
    // console.log(Math.round( temp - 272.15))

    const temperaturaActual = document.createElement('p');
    temperaturaActual.innerHTML = `${centigrados} &#8451;`;
    temperaturaActual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451; `;
    tempMaxima.classList.add('text-xl');

    const tempMin = document.createElement('p')
    tempMin.innerHTML = `Min: ${min} &#8451; `;
    tempMin.classList.add('text-xl');

    //Nombre de ciudad    
    const nombre = document.createElement('p')
    nombre.innerHTML = `Clima en ${city}`;
    nombre.classList.add('font-bold', 'text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(temperaturaActual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMin);
    resultadoDiv.appendChild(nombre);

    resultado.appendChild(resultadoDiv)
}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// function temperaturaRedondeada(grados){
//     return Math.round(grados - 273.15);
// }

function Spinner(){
    limpiarHtml()

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);

}