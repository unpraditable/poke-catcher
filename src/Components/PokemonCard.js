import { cx, css } from "@emotion/css";
import StringUtils from "../Utils/StringUtils";

export default function PokemonCard({
  pokemon,
  nickName,
  release,
  totalOwned,
}) {
  const listClass = css`
    width: calc(25% - 24px);
    display: inline-block;
    box-shadow: 0 1px 6px 0 rgb(0 0 0 / 30%);
    margin: 16px 12px;
    border-radius: 8px;
    overflow: hidden;
    padding-bottom: 16px;

    @media only screen and (max-width: 768px) {
      width: calc(25% - 24px);
    }

    @media only screen and (max-width: 480px) {
      width: calc(50% - 24px);
    }
  `;

  const anchorClass = css`
    text-decoration: none;
    color: #212529;
  `;

  const capitalize = css`
    text-transform: capitalize;
  `;

  const cardHeader = css`
    background-color: #92d1b3;
    height: 100px;
    width: 100%;
  `;

  const cardImgContainer = css`
    width: 96px;
    height: 96px;
    background-color: white;
    border-radius: 100%;
    margin: -48px auto 0;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3);
    img {
      width: 96px;
      height: 96px;
    }
  `;

  const detailButton = css`
    background-color: #49896f;
  `;

  const releaseButton = css`
    background-color: #cc0000;
  `;

  const button = css`
    font-size: 14px;
    display: block;
    margin: 0 auto;
    width: calc(100% - 64px);
    color: white;
    padding: 6px 16px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: none;
  `;

  return (
    <li className={listClass}>
      <div className={cx(anchorClass, capitalize)}>
        <header className={cardHeader}></header>
        <div className={cardImgContainer}>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div>
          {nickName ? (
            <>
              <p>{nickName}</p>
              <button onClick={release} className={cx(releaseButton, button)}>
                Release
              </button>
            </>
          ) : (
            <>
              <p>{StringUtils.removeDash(pokemon.name)}</p>
              <p>Owned: {totalOwned}</p>
              <a href={pokemon.name} className={cx(detailButton, button)}>
                Detail
              </a>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
