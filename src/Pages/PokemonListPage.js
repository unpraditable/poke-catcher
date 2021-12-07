import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import Pokemon from "../Queries/Pokemon";
import "./PokemonList.css";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";
import useStore from "../StateManager/UseStore";
import { myPokemonSelector } from "../StateManager/MyPokemon/MyPokemonReducer";
import ArrUtils from "../Utils/ArrUtils";

export default function PokemonListPage() {
  const myPokemonList = useStore(myPokemonSelector.getMyPokemon);
  const [pokemons, setPokemons] = useState([]);
  const [gqrVar, setGqrVar] = useState({
    limit: 40,
    offset: 0,
  });

  const ownedList = useRef([]);
  const pokemonsCount = useRef(0);
  const { loading, data, error } = useQuery(Pokemon.GET_POKEMONS, {
    variables: gqrVar,
  });

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      getNewPokemons();
    }
  };

  function getNewPokemons() {
    if (gqrVar.offset < pokemonsCount.current) {
      setGqrVar({
        limit: 40,
        offset: gqrVar.offset + 40,
      });
    }
  }

  function getTotalOwned(arr, name) {
    return arr[0][name] ? arr[0][name].length : 0;
  }

  useEffect(() => {
    ownedList.current.push(ArrUtils.groupBy(myPokemonList, "name"));
  }, [myPokemonList]);

  useEffect(() => {
    if (data && !loading) {
      setPokemons((arr) => [...arr, ...data.pokemons.results]);
      if (pokemonsCount.current === 0) {
        pokemonsCount.current = data.pokemons.count;
      }
    }
  }, [loading, data]);

  return (
    <>
      <h1>Welcome To Venupedia!</h1>
      <div>
        <span>All Pokemon List</span> |{" "}
        <a href="/MyPokemonList">My Pokemon List</a>
      </div>
      <ul className={PokemonDetailStyle.ulClass}>
        {pokemons.length > 0 &&
          pokemons.map((pokemon, i) => (
            <PokemonCard
              key={i}
              pokemon={pokemon}
              totalOwned={getTotalOwned(ownedList.current, pokemon.name)}
            />
          ))}
        {loading && <p>Loading...</p>}
        {error && <p>Error! Please refresh the page</p>}
      </ul>
    </>
  );
}
