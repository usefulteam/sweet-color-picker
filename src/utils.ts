import { AnyColor, colord } from "colord";
import { ObjectColor } from "./types";

export const equalColorObject = (first: ObjectColor, second: ObjectColor): boolean => {
  if (first === second) return true;

  for (const prop in first) {
    if (first[prop] !== second[prop]) return false;
  }

  return true;
}

export const generateColordMethod = (colorMode: string, colorFormat: string): string => {
  if ('hex' === colorMode) return 'toHex';

  let method =
    "string" === colorFormat ? colorMode.replace('a', '') + "String" : colorMode;

  method = "to" + method.charAt(0).toUpperCase() + method.slice(1);

  return method;
};

export const generateColorInputValue = (color: AnyColor, colorMode: string, adaptiveAlpha?: boolean): string => {
  const method = generateColordMethod(colorMode, "string");

  if (adaptiveAlpha) {
    const rgba = colord(color).toRgb();

    if ( colorMode === 'hex' && rgba.a < 1) {  
      return colord(color).toRgbString();
    }
  }
  
  return colord(color)[method]();
};