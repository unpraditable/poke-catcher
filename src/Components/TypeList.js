import GeneralStyle from "../StyleClasses/GeneralStyle";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";

export default function TypeList({ pokemon }) {
  return (
    <>
      <h2>Types:</h2>
      <ul className={PokemonDetailStyle.ulClass}>
        {pokemon.types.map(({ type }) => (
          <li className={GeneralStyle.capitalize}>{type.name}</li>
        ))}
      </ul>
    </>
  );
}
