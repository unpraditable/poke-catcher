import { cx } from "@emotion/css";
import ModalStyle from "./ModalStyle";

export default function Modal({
  show,
  options,
  handleSubmit,
  withInput,
  handleClose,
  danger,
  inputRef,
}) {
  return (
    <div
      className={
        show
          ? cx(ModalStyle.modal, ModalStyle.modalShow)
          : cx(ModalStyle.modal, ModalStyle.modalHide)
      }
    >
      <section className={ModalStyle.modalMain}>
        <p className={ModalStyle.paragraph}>{options.message}</p>
        {withInput && (
          <form className={ModalStyle.formStyle} ref={inputRef}>
            <input
              label={"Nickname"}
              name={"nickName"}
              placeholder="nickname please..."
            />
          </form>
        )}

        <button
          className={cx(ModalStyle.buttonModal, ModalStyle.neutralButton)}
          type="button"
          onClick={handleClose}
        >
          {options.cancelButton}
        </button>

        {handleSubmit && (
          <button
            className={
              danger
                ? cx(ModalStyle.buttonModal, ModalStyle.dangerButton)
                : cx(ModalStyle.buttonModal, ModalStyle.submitButton)
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
