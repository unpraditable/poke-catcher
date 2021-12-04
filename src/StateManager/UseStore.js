import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import storedSet from "./StoredSet";

const useStore = create(
  devtools(persist(storedSet, { name: "pokemon-catcher" }))
);

export default useStore;
