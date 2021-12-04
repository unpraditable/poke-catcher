import PokemonCard from "../Components/PokemonCard";
import "./PokemonList.css";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";
import useStore from "../StateManager/UseStore";
import { myPokemonSelector } from "../StateManager/MyPokemon/MyPokemon";

export default function MyPokemonListPage() {
  const myPokemons = useStore(myPokemonSelector.getMyPokemon);

  return (
    <ul className={PokemonDetailStyle.ulClass}>
      {myPokemons.length > 0 &&
        myPokemons.map((pokemon, i) => (
          <PokemonCard key={i} pokemon={pokemon} nickName={pokemon.nickName} />
        ))}
    </ul>
  );
}
