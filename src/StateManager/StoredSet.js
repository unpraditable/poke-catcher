import myPokemonReducer from "./MyPokemon/MyPokemonReducer";
import ownedSpeciesReducer from "./OwnedSpecies/OwnedSpeciesReducer";

const storedSet = (set, get) => {
  return {
    ...ownedSpeciesReducer(set, get),
    ...myPokemonReducer(set, get),
  };
};

export default storedSet;