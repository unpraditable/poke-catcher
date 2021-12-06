import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import Pokemon from "../Queries/Pokemon";
import "./PokemonList.css";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";
import useStore from "../StateManager/UseStore";
import { myPokemonSelector } from "../StateManager/MyPokemon/MyPokemonReducer";

export default function PokemonListPage() {
  const myPokemonList = useStore(myPokemonSelector.getMyPokemon);
  const [pokemons, setPokemons] = useState([]);
  const [gqrVar, setGqrVar] = useState({
    limit: 40,
    offset: 0,
  });

  const ownedList = useRef([]);
  const pokemonsCount = useRef(0);
  const { loading, error, data } = useQuery(Pokemon.GET_POKEMONS, {
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

  function groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, {});
    return newObj;
  }

  useEffect(() => {
    ownedList.current.push(groupBy(myPokemonList, "name"));
  }, []);

  useEffect(() => {
    if (data && !loading) {
      setPokemons((arr) => [...arr, ...data.pokemons.results]);
      if (pokemonsCount.current === 0) {
        pokemonsCount.current = data.pokemons.count;
      }
    }
  }, [loading]);

  return (
    <>
      <h1>Welcome To Venupedia!</h1>
      <ul className={PokemonDetailStyle.ulClass}>
        {pokemons.length > 0 &&
          pokemons.map((pokemon, i) => (
            <PokemonCard
              key={i}
              pokemon={pokemon}
              myPokemonList={myPokemonList}
              totalOwned={getTotalOwned(ownedList.current, pokemon.name)}
            />
          ))}
        {loading && <p>Loading...</p>}
      </ul>
    </>
  );
}
