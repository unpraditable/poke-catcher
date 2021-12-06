import myPokemonReducer from "./MyPokemon/MyPokemonReducer";

const storedSet = (set, get) => {
  return {
    ...myPokemonReducer(set, get),
  };
};

export default storedSet;
