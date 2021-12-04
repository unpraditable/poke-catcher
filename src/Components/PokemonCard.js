import { cx, css } from "@emotion/css";
import { myPokemonSelector } from "../StateManager/MyPokemon/MyPokemonReducer";
import useStore from "../StateManager/UseStore";
import StringUtils from "../Utils/StringUtils";

export default function PokemonCard({ pokemon, nickName, release }) {
  const listClass = css`
    width: 20%;
    display: inline-block;

    @media screen and (max-width: 768px) {
      width: 25%;
    }

    @media screen and (max-width: 480px) {
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

  // const myPokemonList = useStore(myPokemonSelector.getMyPokemon);

  function countCaughtPokemon(arr, name) {
    return arr.reduce((total, x) => (x.name === name ? total + 1 : total), 0);
  }
  // console.log(myPokemonList);
  return (
    <li className={listClass}>
      <div className={cx(anchorClass, capitalize)}>
        <img src={pokemon.image} />
        {nickName ? (
          <>
            <p>{nickName}</p>
            <button onClick={release}>Release</button>
          </>
        ) : (
          <>
            <p>{StringUtils.removeDash(pokemon.name)}</p>
            <a href={pokemon.name}>Detail</a>
            {/* <p>
              totalCaught: {countCaughtPokemon(myPokemonList, pokemon.name)}
            </p> */}
          </>
        )}
      </div>
    </li>
  );
}
