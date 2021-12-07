import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Modal from "./Modal";

describe("Modal", () => {
  const mockSubmit = jest.fn();
  const mockHandleClose = jest.fn();
  const renderModal = ({
    show = true,
    options = {
      message: "stub-message",
      cancelButton: "stub-cancel",
    },
    handleSubmit = null,
    withInput = false,
    handleClose = mockHandleClose,
    inputRef = null,
    inputError = null,
  }) => {
    return render(
      <Modal
        show={show}
        options={options}
        handleSubmit={handleSubmit}
        withInput={withInput}
        handleClose={handleClose}
        inputRef={inputRef}
        inputError={inputError}
      />
    );
  };
  it("renders Modal without customized props", () => {
    const { container, debug } = renderModal({
      show: true,
    });

    const button = container.querySelector("button");

    expect(container.querySelector("p").textContent).toEqual("stub-message");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("renders Modal with input, submit button, and error message", () => {
    const { container, debug } = renderModal({
      show: true,
      handleSubmit: mockSubmit,
      withInput: true,
      inputError: "stub-error",
    });

    const closeButton = container.querySelector("button:nth-of-type(1)");

    const submitButton = container.querySelector("button:nth-of-type(2)");

    expect(container.querySelector("p").textContent).toEqual("stub-message");
    expect(container.querySelector("form input")).toBeVisible();
    expect(container.querySelector("form p").textContent).toEqual("stub-error");
    act(() => {
      closeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockHandleClose).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalled();
  });
});
