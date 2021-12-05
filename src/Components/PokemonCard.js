import { cx, css } from "@emotion/css";
import StringUtils from "../Utils/StringUtils";

export default function PokemonCard({
  pokemon,
  nickName,
  release,
  totalOwned,
}) {
  const listClass = css`
    width: 20%;
    display: inline-block;

    @media only screen and (max-width: 768px) {
      width: 25%;
    }

    @media only screen and (max-width: 480px) {
      width: 50%;
    }
  `;

  const anchorClass = css`
    color: white;
    text-decoration: none;
  `;

  const capitalize = css`
    text-transform: capitalize;
  `;

  return (
    <li className={listClass}>
      <div className={cx(anchorClass, capitalize)}>
        <img src={pokemon.image} alt={pokemon.name} />
        {nickName ? (
          <>
            <p>{nickName}</p>
            <button onClick={release}>Release</button>
          </>
        ) : (
          <>
            <p>{StringUtils.removeDash(pokemon.name)}</p>
            <a href={pokemon.name}>Detail</a>
            <p>totalOwned: {totalOwned}</p>
          </>
        )}
      </div>
    </li>
  );
}
