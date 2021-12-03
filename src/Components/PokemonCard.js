import { cx, css } from "@emotion/css";

export default function PokemonCard({ pokemon }) {
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
  return (
    <li className={listClass}>
      <a href={pokemon.name} className={cx(anchorClass, capitalize)}>
        <img src={pokemon.image} />
        <p>{pokemon.name.replace(/-/g, " ")}</p>
      </a>
    </li>
  );
}
