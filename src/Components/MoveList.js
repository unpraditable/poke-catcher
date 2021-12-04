import GeneralStyle from "../StyleClasses/GeneralStyle";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";
import StringUtils from "../Utils/StringUtils";

export default function MoveList({ pokemon }) {
  return (
    <>
      <h2>Moves:</h2>
      <ul className={PokemonDetailStyle.ulClass}>
        {pokemon.moves.map(({ move }) => (
          <li className={GeneralStyle.capitalize}>
            {StringUtils.removeDash(move.name)}
          </li>
        ))}
      </ul>
    </>
  );
}
