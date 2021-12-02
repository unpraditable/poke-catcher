import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import Pokemon from "../Queries/Pokemon";
import "./PokemonList.css";

export default function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [gqrVar, setGqrVar] = useState({
    limit: 100,
    offset: 0,
  });

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
    if (gqrVar.offset <= data.pokemons.count) {
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
    }
  }, [loading]);

  return (
    <ul>
      {pokemons.length > 0 &&
        pokemons.map((pokemon, i) => (
          <li key={i}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      {loading && <p>Loading...</p>}
    </ul>
  );
}
