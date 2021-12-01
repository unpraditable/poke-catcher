import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import Pokemon from "../Queries/Pokemon";

export default function PokemonListPage() {
  const { loading, error, data } = useQuery(Pokemon.GET_POKEMONS, {
    variables: Pokemon.gqlVariables,
  });
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    if (loading) console.log('loading')
    if (error) console.log('error')
  
    console.log('Response from server', data);
    // return 'Success!';
    if (data && !loading) {
      setPokemons(data.pokemons.results)
    }
  }, [loading]);

  console.log(pokemons)

  return (
  <div>
    {
      pokemons.length > 0 && pokemons.map((pokemon,i) => 
      <div key={i}>
        <PokemonCard pokemon={pokemon} />
      </div>
      )
    }
  </div>)

}
