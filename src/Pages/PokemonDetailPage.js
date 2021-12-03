import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Pokemon from "../Queries/Pokemon";
import { cx, css } from "@emotion/css";

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState();
  const { name } = useParams();

  const gqrVar = {
    name,
  };

  const ulClass = css`
    list-style: none;
    padding-left: 0;
  `;

  const capitalize = css`
    text-transform: capitalize;
  `;
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
          <h1 className={capitalize}>{pokemon.name.replace(/-/g, " ")}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          />
          <h2>Types:</h2>
          <ul className={ulClass}>
            {pokemon.types.map(({ type }) => (
              <li className={capitalize}>{type.name}</li>
            ))}
          </ul>
          <h2>Moves:</h2>
          <ul className={ulClass}>
            {pokemon.moves.map(({ move }) => (
              <li className={capitalize}>{move.name.replace(/-/g, " ")}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
