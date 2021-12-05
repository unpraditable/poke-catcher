import { css, cx } from "@emotion/css";

export default function Modal({ message, show, handleSubmit, handleClose }) {
  const modal = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  `;

  const modalMain = css`
    position: fixed;
    background: white;
    width: 80%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  const modalShow = css`
    display: block;
  `;

  const modalHide = css`
    display: none;
  `;

  const paragraph = css`
    color: #222222;
  `;

  return (
    <div className={show ? cx(modal, modalShow) : cx(modal, modalHide)}>
      <section className={modalMain}>
        <p className={paragraph}>{message}</p>
        <button type="button" onClick={handleClose}>
          Close
        </button>
        {handleSubmit && (
          <button type="button" onClick={handleSubmit}>
            Confirm
          </button>
        )}
      </section>
    </div>
  );
}
