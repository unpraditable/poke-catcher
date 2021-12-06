import { cx } from "@emotion/css";
import GeneralStyle from "../StyleClasses/GeneralStyle";
import StringUtils from "../Utils/StringUtils";
import PokemonCardStyle from "./PokemonCardStyle";

export default function PokemonCard({
  pokemon,
  nickName,
  release,
  totalOwned,
}) {
  return (
    <li className={PokemonCardStyle.listClass}>
      <div className={PokemonCardStyle.anchorClass}>
        <header className={PokemonCardStyle.cardHeader}></header>
        <div className={PokemonCardStyle.cardImgContainer}>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div>
          {nickName ? (
            <>
              <p className={PokemonCardStyle.elipsis}>{nickName}</p>
              <button
                onClick={release}
                className={cx(
                  PokemonCardStyle.releaseButton,
                  PokemonCardStyle.button
                )}
              >
                Release
              </button>
            </>
          ) : (
            <>
              <p
                className={cx(
                  GeneralStyle.capitalize,
                  PokemonCardStyle.elipsis
                )}
              >
                {StringUtils.removeDash(pokemon.name)}
              </p>
              <p>Owned: {totalOwned}</p>
              <a
                href={pokemon.name}
                className={cx(
                  PokemonCardStyle.detailButton,
                  PokemonCardStyle.button
                )}
              >
                Detail
              </a>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
