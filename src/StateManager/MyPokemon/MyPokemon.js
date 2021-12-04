export const initialState = [];

export const myPokemonSelector = {
  getMyPokemon: (state) => state.myPokemon,
  saveMyPokemon: (state) => state.myPokemonSaveAction,
};

export default function myPokemonReducer(set, get) {
  return {
    myPokemon: initialState,
    myPokemonSaveAction: (payload) =>
      set(() => ({
        myPokemon: [...get().myPokemon, payload],
      })),
  };
}
