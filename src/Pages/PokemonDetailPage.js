import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Pokemon from "../Queries/Pokemon";
import StringUtils from "../Utils/StringUtils";
import MoveList from "../Components/MoveList";
import GeneralStyle from "../StyleClasses/GeneralStyle";
import TypeList from "../Components/TypeList";

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState();
  const { name } = useParams();

  const gqrVar = {
    name,
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
          <h1 className={GeneralStyle.capitalize}>
            {StringUtils.removeDash(pokemon.name)}
          </h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          />
          <TypeList pokemon={pokemon} />
          <MoveList pokemon={pokemon} />
        </>
      )}
    </div>
  );
}
