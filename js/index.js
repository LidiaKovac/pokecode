// "https://pokeapi.co/api/v2/pokemon"

//GOAL: 
//homepage, con pokemon + paginazione
//pagina dettagli, con i dettagli del singolo pokemon
//ricerca => cerco per nome



//vogliamo lavorare per classi
class Pokemon {
    constructor(name, abilities, img, imgShiny) {
        this.name = name
        this.abilities = abilities
        this.img = img //string
        this.imgShiny = imgShiny //string
    }
}

class Pokedex {
    constructor() {
        this.allPkmn = []
    }
    getAll = async () => {
        //! HOMEPAGE:
        //*STRUTTURA TRYCATCH:
        // try {
            //fetch
        // } catch (error) {
            //crea error sul DOM
        // }

        try {
            //fetch => OPERAZIONE LUNGA, non sappiamo quanto ci metterà
            //per gestire le operazione lunghe, usiamo le Promise
            /* 
                Promise {
                    pending () {...} //work in progress
                    resolve () { risultato }
                    reject  () { errore } 
                }
                Promise<risultato>
                Promise.then() => SOLO se resolve
                Promise.catch() => SOLO se ci sono errori
                Promise.finally() => A PRESCINDERE!
            */
            // await Promise<risultato> => risultato
            // await => ferma l'esecuzione del codice finchè la promise non ha completato, l'operazione
            //                                                          (è pending)
            //    CRUD => Create, Read, Update, Delete   
            //    GET => Read
            //    POST => Create
            //    PUT, PATCH => Update
            //    DELETE => Delete

            //*STATUS CODES:

            //200-299 => OK 
            //400-499 => CLIENT ERROR, wrong body, not authorized, (404 not found)
            //500-599 => SERVER ERROR

            let res = await fetch("https://pokeapi.co/api/v2/pokemon", {
                //fetch = funzione con valore di ritorno => Promise<Response>
                method: "GET",
                // headers: {
                //     Authorization: "API KEY, TOKEN etc..."
                // }
                // body: {...}
            })
            let pkmn = await res.json() // NON JASON

            console.log(pkmn)
            //pkmn => OGGETTO
            //pkmn.results => ARRAY

            // for => pkmn.results[i]
            //fetch ogni pokemon
            pkmn.results.forEach((singlePokemon) => {
            //for(const singlePokemon of pkmn.results)
                //.forEach() => no return
                //.filter()
                //.map()
                fetch(singlePokemon.url)
                    .then((raw) => {
                        return raw.json()
                    })
                    .then((single) => {
                        //qui abbiamo i dati del pokemon
                        let nuovoPokemon = new Pokemon(
                            single.name, 
                            single.abilities, 
                            single.sprites.other.front_default, 
                            single.sprites.other.front_shiny
                        )
                        this.allPkmn.push(nuovoPokemon)
                        
                    })
                    .catch((err) => {
                        //dom traversing => creare un errore sull'HTML
                    })
                // .finally(()=> {})
            })
            
            //qui non abbiamo i dettagli del pokemon!
            
        } catch (error) {
            console.log(error)
        }

    }
    renderAll() {
        //domani!
    }
}


window.onload = () => {
    let pokedex = new Pokedex()
    pokedex.getAll()
}

//*STRUTTURA FUNZIONE ESEMPIO:

// const funzioneAsincrona = async () => {
//     try {
        
//     } catch (error) {

//     }
// }