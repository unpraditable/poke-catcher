import { css, cx } from "@emotion/css";

export default function Modal({
  show,
  options,
  handleSubmit,
  withInput,
  handleClose,
  danger,
  inputRef,
}) {
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

  const modalShow = css`
    display: block;
  `;

  const modalHide = css`
    display: none;
  `;

  const paragraph = css`
    color: #222222;
  `;

  const buttonModal = css`
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

  const neutralButton = css`
    color: #212529;
    background-color: #dfe5f2;
  `;

  const dangerButton = css`
    background-color: #cc0000;
  `;

  const submitButton = css`
    background-color: #49896f;
  `;

  const formStyle = css`
    margin-bottom: 24px;
    input {
      width: 200px;
      border-radius: 4px;
      border: 1px solid #212529;
      padding: 8px 6px;
    }
  `;

  return (
    <div className={show ? cx(modal, modalShow) : cx(modal, modalHide)}>
      <section className={modalMain}>
        <p className={paragraph}>{options.message}</p>
        {withInput && (
          <form className={formStyle} ref={inputRef}>
            <input
              label={"Nickname"}
              name={"nickName"}
              placeholder="nickname please..."
            />
          </form>
        )}

        <button
          className={cx(buttonModal, neutralButton)}
          type="button"
          onClick={handleClose}
        >
          {options.cancelButton}
        </button>

        {handleSubmit && (
          <button
            className={
              danger
                ? cx(buttonModal, dangerButton)
                : cx(buttonModal, submitButton)
            }
            type="button"
            onClick={handleSubmit}
          >
            {options.submitButton}
          </button>
        )}
      </section>
    </div>
  );
}
