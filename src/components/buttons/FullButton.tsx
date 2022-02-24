import { ColorButtonProps } from "../../types";
import { ColorPreview } from "../ColorPreview";
import { ResetButton } from "./ResetButton";

export const FullButton = (props: ColorButtonProps): JSX.Element => {
  const handleClick = () => {
    props.onClick();
  };

  const handleReset = () => {
    props.onReset();
  };

  return (
    <div className="swcp__trigger-container">
      <button
        type="button"
        className="swcp__trigger-button"
        onClick={handleClick}
      >
        <ColorPreview value={props.value} />
        <span className="swcp__button-text">{props.text}</span>
      </button>

      {props.isPickerOpen && <ResetButton onReset={handleReset} />}
    </div>
  );
};
