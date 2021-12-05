import { css } from "@emotion/css";

export default class GeneralStyle {
  static capitalize = css`
    text-transform: capitalize;
  `;

  static commaList = css`
    display: inline-block;
    margin-right: 4px;
  `;

  static alignLeft = css`
    text-align: left;
  `;

  static m8 = css`
    margin: 8px;
  `;
}
