import { css } from "@emotion/css";

export default class PokemonCardStyle {
  static listClass = css`
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

  static anchorClass = css`
    text-decoration: none;
    color: #212529;
  `;

  static cardHeader = css`
    background-color: #92d1b3;
    height: 100px;
    width: 100%;
  `;

  static cardImgContainer = css`
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

  static detailButton = css`
    background-color: #49896f;
  `;

  static releaseButton = css`
    background-color: #cc0000;
  `;

  static button = css`
    font-size: 14px;
    display: block;
    margin: 0 auto;
    width: calc(100% - 48px);
    color: white;
    padding: 6px 16px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: none;
  `;

  static elipsis = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
