import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import Pokemon from "../Queries/Pokemon";
import "./PokemonList.css";
import { cx, css } from "@emotion/css";

export default function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [gqrVar, setGqrVar] = useState({
    limit: 100,
    offset: 0,
  });
  const pokemonsCount = useRef(0);

  const ulClass = css`
    list-style: none;
    padding-left: 0;
  `;
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
        limit: 100,
        offset: gqrVar.offset + 100,
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
    <ul className={ulClass}>
      {pokemons.length > 0 &&
        pokemons.map((pokemon, i) => <PokemonCard key={i} pokemon={pokemon} />)}
      {loading && <p>Loading...</p>}
    </ul>
  );
}
