window.onload = async() => {
    let queryString = new URLSearchParams(window.location.search)
    // for(const [key, value] of queryString.entries()) {
    //     console.log(key, value)
    // }
    let id = queryString.get("pokemon")
    // let res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let details = await res.json()
    //nome
    let h1 = document.querySelector("h1")
    h1.innerHTML = details.name
    //foto
    let img = document.querySelector("#foto_pokemon")
    img.src = details.sprites.other.home.front_default
    //foto shiny
    let img_shiny = document.querySelector("#foto_pokemon--shiny")
    img_shiny.src = details.sprites.other.home.front_shiny
    
    //prime 5 mosse
    let ul = document.querySelector("ul.list--moves")
    details.moves.slice(0,10).forEach(singleMove => {
        let li = document.createElement("li")
        li.classList.add('list-group-item')
        li.innerHTML = singleMove.move.name
        ul.appendChild(li)
    })
    
    let ulAb = document.querySelector("ul.list--abilities")
    details.abilities.forEach(ab => {
        let li = document.createElement("li")
        li.classList.add('list-group-item')
        li.innerHTML = ab.ability.name
        ulAb.appendChild(li)
    })


    //abilita' + dettagli
}