export const initialState = [];

export const myPokemonSelector = {
  getMyPokemon: (state) => state.myPokemon,
  saveMyPokemon: (state) => state.myPokemonSaveAction,
  releaseMyPokemon: (state) => state.myPokemonReleaseAction,
};

export default function myPokemonReducer(set, get) {
  return {
    myPokemon: initialState,
    myPokemonSaveAction: (payload) =>
      set(() => ({
        myPokemon: [...get().myPokemon, payload],
      })),
    myPokemonReleaseAction: (index) => {
      get().myPokemon.splice(index, 1);
      set(() => ({
        myPokemon: [...get().myPokemon],
      }));
    },
  };
}
