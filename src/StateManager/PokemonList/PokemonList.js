export const initialState = {
  list: [],
  offset: 0,
};

export const pokemonListSelector = {
  getPokemonList: (state) => state.getPokemonList,
  savePokemonList: (state) => state.savePokemonListSaveAction,
};

export default function pokemonListReducer(set, get) {
  return {
    pokemonList: initialState,
    savePokemonListSaveAction: (payload) =>
      set(() => ({
        pokemonList: {
          list: [...get().pokemonList, payload.list],
          offset: payload.offset,
        },
      })),
  };
}
