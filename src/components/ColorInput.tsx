import { useEffect, useState } from "react";
import { ColorInputProps } from "../types";
import { ResetButton } from "./buttons/ResetButton";
import { ColorPreview } from "./ColorPreview";

export const ColorInput = (props: ColorInputProps) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.onFocus) props.onFocus();
  };

  const handleReset = () => {
    if (props.onReset) props.onReset();
  };

  const handlePreviewClick = () => {
    if (props.onPreviewClick) props.onPreviewClick();
  };

  return (
    <div className="swcp__color-input-wrapper">
      <ColorPreview value={value} onClick={handlePreviewClick} />

      <input
        type="text"
        className="swcp__color-input"
        spellCheck="false"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      {props.showResetButton && <ResetButton onReset={handleReset} />}
    </div>
  );
};
