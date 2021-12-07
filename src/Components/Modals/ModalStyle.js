import { css } from "@emotion/css";

export default class ModalStyle {
  static modal = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  `;

  static modalMain = css`
    position: fixed;
    border-radius: 16px;
    background: white;
    width: 80%;
    max-width: 480px;
    padding: 32px 16px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  `;

  static modalShow = css`
    display: block;
  `;

  static modalHide = css`
    display: none;
  `;

  static paragraph = css`
    color: #222222;
  `;

  static buttonModal = css`
    font-size: 14px;
    display: block;
    margin: 0 auto;
    width: 100px;
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: none;
    display: inline-block;
    margin: 0 6px;
  `;

  static neutralButton = css`
    color: #212529;
    background-color: #dfe5f2;
    label: neutral-button;
  `;

  static dangerButton = css`
    background-color: #cc0000;
  `;

  static submitButton = css`
    background-color: #49896f;
    label: submit-button;
  `;

  static formStyle = css`
    margin-bottom: 12px;
    input {
      width: 200px;
      border-radius: 4px;
      border: 1px solid #212529;
      padding: 8px 6px;
    }
  `;

  static errorMessage = css`
    color: #cc0000;
    font-size: 11px;
    margin: 4px 0;
  `;
}
