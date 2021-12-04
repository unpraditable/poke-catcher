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
  const pokemonsCount = useRef(0);
  const { loading, error, data } = useQuery(Pokemon.GET_POKEMONS, {
    variables: gqrVar,
  });

  // const speciesList = [
  //   {
  //     pokemonName: myPokemonList[0].name,
  //   },
  // ];
  // console.log(speciesList);

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

  useEffect(() => {
    if (loading) console.log("loading");
    if (error) console.log("error");

    console.log("Response from server", data);
    if (data && !loading) {
      setPokemons((arr) => [...arr, ...data.pokemons.results]);
      if (pokemonsCount.current === 0) {
        pokemonsCount.current = data.pokemons.count;
      }
    }
  }, [loading]);

  return (
    <ul className={PokemonDetailStyle.ulClass}>
      {pokemons.length > 0 &&
        pokemons.map((pokemon, i) => (
          <PokemonCard
            key={i}
            pokemon={pokemon}
            myPokemonList={myPokemonList}
          />
        ))}
      {loading && <p>Loading...</p>}
    </ul>
  );
}
