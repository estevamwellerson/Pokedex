const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Carregando...';

  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon)

  if (data){
    pokemonName.innerHTML = data.name;

    pokemonNumber.innerHTML = data.id;

    searchPokemon = data.id;

    pokemonImage.src =data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
  }else{
    pokemonImage.style.display = "none";

    pokemonName.innerHTML = "Não encontrado";

    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) =>{
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  input.value = '';
})

btnPrev.addEventListener("click", () => {
  if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
 searchPokemon +=1
 renderPokemon(searchPokemon)
});
renderPokemon('1')