import { css, cx } from "@emotion/css";
import GeneralStyle from "../StyleClasses/GeneralStyle";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";
import StringUtils from "../Utils/StringUtils";

export default function MoveList({ pokemon }) {
  const moveList = css`
    max-height: 68px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  `;

  const moveListContainer = css`
    border-top: 1px solid #49896f;
  `;
  return (
    <div className={moveListContainer}>
      <h3 className={cx(GeneralStyle.alignLeft, GeneralStyle.m8)}>Moves:</h3>
      <ul
        className={cx(
          GeneralStyle.alignLeft,
          PokemonDetailStyle.ulClass,
          moveList,
          GeneralStyle.m8
        )}
      >
        {pokemon.moves.map(({ move }, i) => (
          <li className={cx(GeneralStyle.capitalize, GeneralStyle.commaList)}>
            {StringUtils.removeDash(move.name)}
            {i + 1 !== pokemon.moves.length ? "," : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
