import { AnyColor } from "colord";
import React from "react";
import ReactDOM from "react-dom";
import { SweetColorPicker } from "./src/components/SweetColorPicker";

const onColorPicker1Change = (color: AnyColor) => {};

const ColorPicker1 = (
  <SweetColorPicker
    triggerType="button"
    colorMode="rgba"
    color="rgb(222, 223, 250)"
    onChange={onColorPicker1Change}
  />
);

const onColorPicker2Change = (color: AnyColor) => {};

const ColorPicker2 = (
  <SweetColorPicker
    triggerType="button"
    colorMode="hsl"
    color="#00ff00"
    onChange={onColorPicker2Change}
  />
);

const onColorPicker3Change = (color: AnyColor) => {};

const ColorPicker3 = (
  <SweetColorPicker
    triggerType="input"
    colorMode="hex"
    color="#f00"
    adaptiveAlpha={true}
    onChange={onColorPicker3Change}
  />
);

ReactDOM.render(
  ColorPicker1,
  document.querySelector(".control-1 .control-component")
);
ReactDOM.render(
  ColorPicker2,
  document.querySelector(".control-2 .control-component")
);
ReactDOM.render(
  ColorPicker3,
  document.querySelector(".control-3 .control-component")
);
