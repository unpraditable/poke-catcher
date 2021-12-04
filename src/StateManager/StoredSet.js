import myPokemonReducer from "./MyPokemon/MyPokemonReducer";
import ownedSpeciesReducer from "./PokemonList/PokemonList";

const storedSet = (set, get) => {
  return {
    ...ownedSpeciesReducer(set, get),
    ...myPokemonReducer(set, get),
  };
};

export default storedSet;
