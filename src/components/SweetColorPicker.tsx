import { AnyColor, ColorPickerProps, RgbColor, RgbaColor } from "../types";

import React, { useRef, useState } from "react";
import { colord } from "colord";

import { RgbColorPicker } from "react-colorful";
import { RgbaColorPicker } from "react-colorful";

import { Wrapper } from "./Wrapper";
import { FullButton } from "./buttons/FullButton";
import { ColorSwatches } from "./ColorSwatches";
import { ColorInput } from "./ColorInput";

import useClickOutside from "../hooks/useClickOutside";
import useFocusOutside from "../hooks/useFocusOutside";

import { generateColorInputValue, generateColordMethod } from "../utils";

export const SweetColorPicker = (
  props: Partial<ColorPickerProps<AnyColor>>
): JSX.Element => {
  const {
    id = "",
    className = "",
    color = { r: 0, g: 0, b: 0, a: 1 },
    colorMode = "hex",
    colorFormat = "string",
    disableAlpha = false,
    adaptiveAlpha = false,
    triggerType = "button",
    triggerIsRightSided = false,
    swatchColors = [
      "#000000",
      "#ffffff",
      "#ff0000",
      "#008000",
      "#0000ff",
      "#2196F3",
      "#808080",
      "#dddddd",
    ],
    onChange = () => {},
  } = props;

  const initialInputValue = generateColorInputValue(color, colorMode);

  const alphaEnabledModes = ["hex", "rgba", "hsla", "hsva"];
  let alphaEnabled = alphaEnabledModes.includes(colorMode);
  alphaEnabled = "hex" === colorMode && disableAlpha ? false : alphaEnabled;

  const [pickerValue, setPickerValue] = useState(() => {
    return colord(color).toRgb();
  });

  const [inputValue, setInputValue] = useState(() => {
    return generateColorInputValue(color, colorMode, adaptiveAlpha);
  });

  const handleRgbColorPickerChange = (clr: RgbColor) => {
    setInputValue(generateColorInputValue(clr, colorMode));
    const method = generateColordMethod(colorMode, colorFormat);
    onChange(colord(clr)[method]());
  };

  const handleRgbaColorPickerChange = (clr: RgbaColor) => {
    setInputValue(generateColorInputValue(clr, colorMode, adaptiveAlpha));

    const method = adaptiveAlpha
      ? generateColordMethod("rgba", colorFormat)
      : generateColordMethod(colorMode, colorFormat);
    let newColor: AnyColor;

    if (adaptiveAlpha && 1 === clr.a) {
      newColor = colord(clr).toHex();
    } else {
      newColor = colord(clr)[method]();
    }

    onChange(newColor);
  };

  const handleInputChange = (clr: string) => {
    setPickerValue(colord(clr).toRgb());
    if ("input" !== triggerType) setInputValue(clr);
  };

  const handleColorReset = () => {
    setPickerValue(colord(color).toRgb());
    setInputValue(initialInputValue);
  };

  const handleSwatchesClick = (color: string) => {
    setPickerValue(colord(color).toRgb());
    setInputValue(color);
  };

  const wrapperRef = useRef<HTMLDivElement>(null); // Reference to the StyledWrapper.
  const pickerRef = useRef<HTMLDivElement>(null); // Reference to the picker container / popup.

  const [widthManipulatedClass, setWidthManipulatedClass] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const togglePicker = () => {
    if (isPickerOpen) {
      closePicker();
    } else {
      openPicker();
    }
  };

  const openPicker = () => {
    if (!wrapperRef || !wrapperRef.current) return;
    if (!pickerRef || !pickerRef.current) return;

    if (!isPickerOpen) {
      if (wrapperRef.current.clientWidth < 250) {
        const wrapperParent = wrapperRef.current.parentNode as HTMLElement;
        if (!wrapperParent) return;

        pickerRef.current.style.width =
          wrapperParent.firstElementChild!.clientWidth + "px";

        if ("picker-width-manipulated" !== widthManipulatedClass)
          setWidthManipulatedClass(" picker-width-manipulated");

        if (triggerIsRightSided) {
          let padding = window
            .getComputedStyle(wrapperParent)
            .getPropertyValue("padding-left");
          const number = parseInt(padding, 10);
          const unit = padding.replace(number.toString(), "");

          padding = (number / 2).toString() + unit;

          pickerRef.current.style.left = "calc(-100% - " + padding + ")";
        }
      } else {
        if ("" !== widthManipulatedClass) setWidthManipulatedClass("");
        pickerRef.current.removeAttribute("style");
      }

      setIsPickerOpen(true);
    }
  };

  const closePicker = () => {
    if (isPickerOpen) setIsPickerOpen(false);
  };

  // Handle outside focus to close the picker popup.
  useFocusOutside(wrapperRef, closePicker);

  // Handle outside click to close the picker popup.
  useClickOutside(wrapperRef, closePicker);

  const pickerContainerClass =
    "swcp__picker-container" +
    widthManipulatedClass +
    (isPickerOpen ? " is-open" : "");

  const wrapperId = id ? id : "swc__" + Math.random().toString(36).substr(2, 7);

  return (
    <Wrapper ref={wrapperRef} className={className} id={wrapperId}>
      {"button" === triggerType ? (
        <FullButton
          value={inputValue}
          text="Select a Color"
          isPickerOpen={isPickerOpen}
          onClick={togglePicker}
          onReset={handleColorReset}
        />
      ) : "input" === triggerType ? (
        <ColorInput
          value={inputValue}
          onChange={handleInputChange}
          onFocus={openPicker}
          onReset={handleColorReset}
          showResetButton={true}
          onPreviewClick={togglePicker}
        />
      ) : (
        ""
      )}
      <div className={pickerContainerClass} ref={pickerRef}>
        <ColorSwatches colors={swatchColors} onClick={handleSwatchesClick} />

        <div className="swcp__react-colorful-container">
          {alphaEnabled ? (
            <RgbaColorPicker
              color={pickerValue}
              onChange={handleRgbaColorPickerChange}
            />
          ) : (
            <RgbColorPicker
              color={pickerValue}
              onChange={handleRgbColorPickerChange}
            />
          )}
        </div>

        {"input" !== triggerType && (
          <ColorInput value={inputValue} onChange={handleInputChange} />
        )}
      </div>
    </Wrapper>
  );
};
