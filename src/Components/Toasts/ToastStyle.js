import { css } from "@emotion/css";

export default class ToastStyle {
  static toast = css`
    position: fixed;
    top: 0;
    left: calc(50% - 150px);
    background-color: #212529;
    width: 300px;
    -webkit-transition: opacity 2s ease-in;
    -moz-transition: opacity 2s ease-in;
    -o-transition: opacity 2s ease-in;
    -ms-transition: opacity 2s ease-in;
    transition: opacity 2s ease-in;
    p {
      color: white;
      margin: 8px 0;
    }
  `;

  static shown = css`
    display: block;
  `;

  static hidden = css`
    display: none;
  `;
}
