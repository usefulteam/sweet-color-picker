import React from "react";
import { ColorPreviewProps } from "../types";

export const ColorPreview = (props: ColorPreviewProps) => {
  const colorPreviewStyle = {
    backgroundColor: props.value,
  };

  const handleClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <span
      className="swcp__color-preview"
      onClick={handleClick}
      style={colorPreviewStyle}
    ></span>
  );
};
