export const initialState = [];

export const ownedSpeciesSelector = {
  getOwnedSpecies: (state) => state.ownedSpecies,
  saveOwnedSpecies: (state) => state.ownedSpeciesSaveAction,
};

export default function ownedSpeciesReducer(set, get) {
  return {
    ownedSpecies: initialState,
    ownedSpeciesSaveAction: (payload) =>
      set(() => ({
        ownedSpecies: [...get().ownedSpecies, payload],
      })),
  };
}
