import { render } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
  const renderToast = ({ message = "", isToastShown = false }) => {
    return render(<Toast message={message} isToastShown={isToastShown} />);
  };
  it.each`
    isToastShown
    ${false}
    ${true}
  `("render Toast", ({ isToastShown }) => {
    const { container } = renderToast({ message: "pesan", isToastShown });
    expect(container.querySelector("p").textContent).toEqual("pesan");

    if (isToastShown) {
      expect(container.querySelector("p")).toBeVisible();
    } else {
      expect(container.querySelector("p")).not.toBeVisible();
    }
  });
});
