const searchParams = new URLSearchParams(location.search)
let id = searchParams.get("id")
window.onload = async () => {
    let res = await fetch("https://pokeapi.co/api/v2/ability/" + id)
    let ability = await res.json()
    let h1 = document.querySelector("h1")
    h1.innerHTML = ability.names[7].name
    
}