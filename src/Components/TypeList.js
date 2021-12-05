import { css, cx } from "@emotion/css";
import GeneralStyle from "../StyleClasses/GeneralStyle";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";

export default function TypeList({ pokemon }) {
  return (
    <div>
      <h3 className={cx(GeneralStyle.alignLeft, GeneralStyle.m8)}>Types:</h3>
      <ul
        className={cx(
          GeneralStyle.alignLeft,
          PokemonDetailStyle.ulClass,
          GeneralStyle.m8
        )}
      >
        {pokemon.types.map(({ type }) => (
          <li className={cx(GeneralStyle.capitalize, GeneralStyle.commaList)}>
            {type.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
