
let pagina = 0

// function obtenerPokemon(nombre){
//     return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`,{
//         method:"GET"
//     })
//     .then((res)=>{
//         return res.json()
//     })
//     .catch((error) =>{
//         console.log("Error",error)
//     })
// }            


async function obtenerPokemon(nombre){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`,{
        method:"GET"
    })

    return (await response.json())
    
}

async function obtenerPokemones(){
    const PAGINA_TAMANIO = 20
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGINA_TAMANIO}&offset=${pagina*PAGINA_TAMANIO}`,{
        method:"GET"
    })

    return (await response.json()).results
}

async function paginaAnterior(){
    if(pagina>0){
        pagina--
        await mostrarPokemones()
    }
    else{
        document.getElementById("anterior").style.visibility = "hidden"
    }
}

async function paginaSiguiente(){
    pagina++
    await mostrarPokemones()
    document.getElementById("anterior").style.visibility = "visible"
}

async function mostrarPokemon(pokemon){
    return `
    <div id= "pokemon_${pokemon.name}" style = "display: inline-block">
        <figure>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name} image" style="width:10vw">
            <figcaption>${pokemon.name} image</figcaption>
        </figure>
    </div>`
}




async function mostrarPokemones(){ 
    console.log(pagina)
    const htmlPokemones = await Promise.all((await obtenerPokemones()).map(async (pokemon)=>{
        return await mostrarPokemon(await obtenerPokemon(pokemon.name))
    }))
    document.getElementById("pokemones").innerHTML = htmlPokemones.reduce((anterior,actual)=>{
        return anterior+actual
    },"")
    console.log(htmlPokemones)
}

async function main(){
    console.log((await obtenerPokemones(pagina)))
    await mostrarPokemones()
}


main()




