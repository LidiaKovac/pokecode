let currentPage = 1
const fetchPokemon = async() => {
    
    let res = await fetch("https://pokeapi.co/api/v2/pokemon" + `?offset=${20*(currentPage - 1)}`)
    let pkmns = await res.json()
    let cont = document.querySelector(".container > .row")
    
    
    let pkmnNames = pkmns.results.map((pk) => pk.name)
    cont.innerHTML = ""
    for (const pkmn of pkmnNames) {
        let resDet = await fetch("https://pokeapi.co/api/v2/pokemon/" + pkmn)
        let pkmnDett = await resDet.json()
        cont.innerHTML += ` <div class="col col-3"> <div class="card" >
            <img src="${pkmnDett.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${pkmnDett.forms[0].name}</h5>
              <p class="card-text">This pokemon is present in <span class="badge rounded-pill bg-danger"> ${pkmnDett.game_indices.length} </span> versions of the game.</p>
              <div class="abilities">
              
              
          
                ${pkmnDett.abilities.map(ab => `<div class="single-ab"><button onclick="fillOffCanvas('${ab.ability.url}')" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                aria-controls="offcanvasExample">${ab.ability.name} </button></div>`).join("")}
             
                </div>
            </div>
          </div> </div>`
        }
        return pkmns
}


const fillOffCanvas = async(url) => {
    let res = await fetch(url)
    let ability = await res.json()
    let h5 = document.querySelector(".offcanvas h5")
    h5.innerHTML = ability.name
    let body = document.querySelector(".offcanvas-body div")
    body.innerHTML = ability.flavor_text_entries[0].flavor_text

    let p_num = document.getElementById("p-number")
    p_num.innerText = ability.pokemon.length
    let p_gen = document.getElementById("p-gen")
    p_gen.innerText = ability.generation.name.replaceAll("-", " ")

}
const nextPage = (ev) => {
    ev.stopPropagation()
    currentPage++
    let otherButtons = document.querySelectorAll(".pagination li")
    for (const btn of otherButtons) {
        btn.classList.remove("active")
    }
    ev.target.classList.add("active")
    console.log(ev.target)
    fetchPokemon()
}
window.onload = async () => {
    let pokemons = await fetchPokemon(currentPage)
    let pag_cont = document.querySelector("nav ul.pagination")
    
    for (let i = 0; i < pokemons.count / 20; i++) {
        pag_cont.innerHTML += `
      <li class="page-item page-link ${(i+1 === currentPage) ? "active": ""}" onclick="nextPage(event)"> ${i+1}</li>
      `
    }
    
}