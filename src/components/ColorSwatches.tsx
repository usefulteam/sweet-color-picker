import React from "react";
import { ColorSwatchesProps } from "../types";

export const ColorSwatches = (props: ColorSwatchesProps) => {
  return (
    <div className="swcp__color-swatches">
      {props.colors.map((color, index) => (
        <button
          type="button"
          key={"swcp__swatch" + index.toString()}
          className="swcp__color-swatch"
          onClick={(e) => props.onClick(color)}
          style={{ backgroundColor: color }}
        ></button>
      ))}
    </div>
  );
};
