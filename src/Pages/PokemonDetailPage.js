import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Pokemon from "../Queries/Pokemon";

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState();
  const gqrVar = {
    name: "sobble",
  };
  const { loading, error, data } = useQuery(Pokemon.GET_POKEMON_DETAIL, {
    variables: gqrVar,
  });

  useEffect(() => {
    if (data && !loading) {
      setPokemon(data.pokemon);
    }
  }, [loading]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {pokemon && (
        <>
          <h1>{pokemon.name}</h1>
          <h2>Moves:</h2>
          <ol>
            {pokemon.moves.map(({ move }) => (
              <li>{move.name}</li>
            ))}
          </ol>
          <h2>Abilities:</h2>
          <ol>
            {pokemon.abilities.map(({ ability }) => (
              <li>{ability.name}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
