import { css, cx } from "@emotion/css";
import ToastStyle from "./ToastStyle";

export default function Toast({ message, isToastShown }) {
  return (
    <div
      className={
        isToastShown
          ? cx(ToastStyle.toast, ToastStyle.shown)
          : cx(ToastStyle.toast, ToastStyle.hidden)
      }
    >
      <p>{message}</p>
    </div>
  );
}
