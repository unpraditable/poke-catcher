import { css } from "@emotion/css";

export default class PokemonDetailStyle {
  static ulClass = css`
    list-style: none;
    padding-left: 0;
  `;

  static pokemonDetailContainer = css`
    display: flex;
    align-items: center;
    border: 1px solid #49896f;
    margin: 0 auto;
    width: 90%;
    border-radius: 8px;
  `;

  static pokemonListContainer = css`
    width: 100%;
    border-left: 1px solid #49896f;
  `;

  static buttonCatch = css`
    font-size: 14px;
    display: block;
    width: 180px;
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: none;
    display: inline-block;
    margin: 24px auto;
    background-color: #49896f;
  `;
}
