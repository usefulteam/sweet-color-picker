import React from "react";

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface RgbaColor extends RgbColor {
  a: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HslaColor extends HslColor {
  a: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface HsvaColor extends HsvColor {
  a: number;
}

export type ObjectColor = RgbColor | RgbaColor | HslColor | HslaColor | HsvColor | HsvaColor;

export type AnyColor = string | ObjectColor;

type ColorPickerHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id" | "className" | "color" | "colorMode" | "colorFormat" | "adaptiveAlpha" | "disableAlpha" | "triggerIsRightSided" | "triggerType" | "triggerShape" | "triggerWidth" | "triggerHeight" | "triggerBorderRadius" | "triggerBorderWidth" | "triggerBorderStyle" | "triggerBorderColor" | "triggerBackgroundColor" | "inputWidth" | "inputHeight" | "inputBorderRadius" | "inputBorderWidth" | "inputBorderStyle" | "inputBorderColor" | "inputBackgroundColor" | "swatchColors" | "onChange" | "onReset"
>;

export interface ColorPickerProps<T extends AnyColor> extends ColorPickerHTMLAttributes {
  id?: string;
  className?: string;
  color?: T;
  colorMode?: string;
  colorFormat?: string;
  adaptiveAlpha?: boolean; // If alpha opacity value is 1, then format the `newColor` to hex.
  disableAlpha?: boolean; // Only for hex colorMode.
  triggerType?: string;
  triggerIsRightSided?: boolean;
  swatchColors?: string[];
  onChange?: (newColor: T) => void;
};

type StyledWrapperHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id" | "className" | "triggerType" | "triggerWidth" | "triggerHeight" | "triggerBorderRadius" | "triggerBorderWidth" | "triggerBorderStyle" | "triggerBorderColor" | "triggerBackgroundColor" | "inputWidth" | "inputHeight" | "inputBorderRadius" | "inputBorderWidth" | "inputBorderStyle" | "inputBorderColor" | "inputBackgroundColor"
>;

export interface StyledWrapperProps extends StyledWrapperHTMLAttributes {
  id?: string;
  className?: string;
  triggerType?: string;

  triggerWidth?: string;
  triggerHeight?: string;
  triggerBorderRadius?: string;
  triggerBorderWidth?: string;
  triggerBorderStyle?: string;
  triggerBorderColor?: string;
  triggerBackgroundColor?: string;

  inputWidth?: string;
  inputHeight?: string;
  inputBorderRadius?: string;
  inputBorderWidth?: string;
  inputBorderStyle?: string;
  inputBorderColor?: string;
  inputBackgroundColor?: string;
};

type ColorButtonHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "value" | "text" | "isPickerOpen" | "onClick" | "onReset"
>;

export interface ColorButtonProps extends ColorButtonHTMLAttributes {
  value: string;
  text?: string;
  isPickerOpen: boolean;
  onClick: () => void;
  onReset: () => void;
};

type ResetButtonHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "initialValue" | "onReset"
>;

export interface ResetButtonProps extends ResetButtonHTMLAttributes {
  onReset: () => void;
};

type ColorPreviewHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "value"
>;

export interface ColorPreviewProps extends ColorPreviewHTMLAttributes {
  value?: string;
  onClick?: () => void;
};

type ColorInputHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  "value" | "showResetButton" | "onChange" | "onFocus" | "onReset" | "onPreviewClick"
>;

export interface ColorInputProps extends ColorInputHTMLAttributes {
  value?: string;
  showResetButton?: boolean;
  onReset?: () => void;
  onFocus?: () => void;
  onChange: (newColor: string) => void;
  onPreviewClick?: () => void;
};

type ColorSwatchesHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  "value" | "onClick"
>;

export interface ColorSwatchesProps extends ColorSwatchesHTMLAttributes {
  colors: string[];
  onClick: (color: string) => void;
};
