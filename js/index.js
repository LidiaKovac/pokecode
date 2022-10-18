// "https://pokeapi.co/api/v2/pokemon"

//GOAL:
//homepage, con pokemon + paginazione
//pagina dettagli, con i dettagli del singolo pokemon
//ricerca => cerco per nome

//vogliamo lavorare per classi
class Pokemon {
  constructor(name, abilities, img, imgShiny) {
    this.name = name;
    this.abilities = abilities;
    this.img = img; //string
    this.imgShiny = imgShiny; //string
  }
}

class Pokedex {
  constructor() {
    this.allPkmn = [];
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
      });
      let pkmn = await res.json(); // NON JASON

      console.log(pkmn);
      //pkmn => OGGETTO
      //pkmn.results => ARRAY

      // for => pkmn.results[i]
      //fetch ogni pokemon
      //   pkmn.results.forEach((singlePokemon) => {
      for (const singlePokemon of pkmn.results) {
        //.forEach() => no return
        //.filter()
        //.map()
        let resDet = await fetch(singlePokemon.url);
        let single = await resDet.json();

        //qui abbiamo i dati del pokemon
        let nuovoPokemon = new Pokemon(single.name, single.abilities, single.sprites.other.home.front_default, single.sprites.other.home.front_shiny);
        this.allPkmn.push(nuovoPokemon);
      }
      // .finally(()=> {})
      //   })

      //qui non abbiamo i dettagli del pokemon!
    } catch (error) {
      console.log(error);
    }
  };
  renderAll() {
    let row = document.querySelector(".container .row");
    console.log(this.allPkmn);
    /* 
            let arrayDiPokemon = [{name: "Bulby"},{name: "Ivy"},{name: "Veny"}]
            arrayDiPokemon.join() // "[Object Object], [Object Object], [Object Object]"
            let arrayDiNome = arrayDiPokemon.map((singlePokemon)=> {
                //...
                return singlePokemon.name // "Bulby" etc..
            })
            console.log(arrayDiNome) // ["Bulby", "Ivy", "Veny"]
            arrayDiNome.join() // "Bulby, Ivy, Veny"

        */
    let cards = this.allPkmn.map((pkmn) => {
      return `<div class="col col-3">
                    <div class="card" >
                        <img src="${pkmn.img}" class="card-img-top" alt="pokemon image ${pkmn.name}">
                        <div class="card-body">
                        <h5 class="card-title">${pkmn.name}</h5>
                        <div class="abilities">
                            ${pkmn.abilities
                              .map((ab) => {
                                return `<div class='single-ab'> ${ab.ability.name} </div>`;
                              })
                              .join("")}
                        </div>
                        </div>
                    </div>
                </div>`;
    });
    let cardsString = cards.join("");
    row.innerHTML = cardsString;

    // this.allPkmn.forEach((pkmn)=> {
    //     row.innerHTML += `<div class="col col-3">
    //                      <div class="card" >
    //                          <img src="${pkmn.img}" class="card-img-top" alt="pokemon image ${pkmn.name}">
    //                          <div class="card-body">
    //                          <h5 class="card-title">${pkmn.name}</h5>
    //                          <div class="abilities">
    //                              ${pkmn.abilities
    //                                .map((ab) => {
    //                                  return `<div class='single-ab'> ${ab.ability.name} </div>`;
    //                                })
    //                                .join("")}
    //                          </div>
    //                          </div>
    //                      </div>
    //                  </div>`
    // })

    // this.allPkmn.forEach((pkmn) => {
    //   row.innerHTML += `<div class="col col-3">
    //                      <div class="card" >
    //                          <img src="${pkmn.img}" class="card-img-top" alt="pokemon image ${pkmn.name}">
    //                          <div class="card-body">
    //                          <h5 class="card-title">${pkmn.name}</h5>
    //                          <div class="abilities">
    //                          <div class='single-ab'> ${pkmn.abilities[0].ability.name} </div>
    //                          <div class='single-ab'> ${pkmn.abilities[1]?.ability?.name || ""} </div>

    //                          </div>
    //                          </div>
    //                      </div>
    //                  </div>`;
    // });
  }
}

window.onload = async () => {
  let pokedex = new Pokedex();
  await pokedex.getAll();
  await pokedex.renderAll();
  // pagina dettagli del pokemon
  // search
};

//*STRUTTURA FUNZIONE ESEMPIO:

// const funzioneAsincrona = async () => {
//     try {

//     } catch (error) {

//     }
// }
