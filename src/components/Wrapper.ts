import styled from "styled-components";
import { StyledWrapperProps } from "../types";

const defaultSize: string = "32px";

// Thanks to @vineethtrv at Codepen for the refresh icon: https://codepen.io/vineethtrv/pen/tmAxy
export const Wrapper = styled.div.attrs((props: StyledWrapperProps) => ({
  id: props.id || "",
  className: props.className || "sweet-color-picker",
}))`
  box-sizing: border-box;
  position: relative;
  max-width: 300px;

  * {
    box-sizing: border-box;
  }

  .swcp__trigger-container {
    position: relative;

    .swcp__reset-button {
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      top: 0;
      width: ${(props: StyledWrapperProps) => props.triggerHeight || defaultSize};
      height: ${(props: StyledWrapperProps) => props.triggerHeight || defaultSize};
      border: 0;
    }
  }

  .swcp__color-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    .swcp__color-preview {
      left: 7px;
      top: 7px;
      width: ${
        (props: StyledWrapperProps) => {
          // 7px here is a 1 side padding of the color preview when inside the color input.
          if ('input' === props.triggerType) {
            const triggerHeight = props.triggerHeight || defaultSize;
            return (parseInt(triggerHeight, 10) - (7 * 2)) + 'px';
          } else {
            const triggerHeight = props.inputHeight || defaultSize;
            return (parseInt(triggerHeight, 10) - (7 * 2)) + 'px';
          }
        }
      };
      height: ${
        (props: StyledWrapperProps) => {
          if ('input' === props.triggerType) {
            const triggerHeight = props.triggerHeight || defaultSize;
            return (parseInt(triggerHeight, 10) - (7 * 2)) + 'px';
          } else {
            const triggerHeight = props.inputHeight || defaultSize;
            return (parseInt(triggerHeight, 10) - (7 * 2)) + 'px';
          }
        }
      };
      border-radius: ${
        (props: StyledWrapperProps) => {
          if ('input' === props.triggerType) {
            return '50%';
          } else {
            return props.inputBorderRadius || '50%';
          }
        }
      };
      z-index: 2;
    }
  }

  .swcp__color-input {
    display: block;
    position: relative;
    padding-left: 27px;
    padding-right: 8px;
    width: 100%;
    height: ${(props: StyledWrapperProps) => props.inputHeight || defaultSize};
    line-height: ${(props: StyledWrapperProps) => props.inputHeight || defaultSize};
    color: #333;
    border: 1px solid #8c8f94;
    border-radius: 4px;
    z-index: 1;

    &::focus,
    &::active {
      box-shadow: 0 0 0 1px #2271b1;
      outline: none;
      border-color: #2271b1;
    }
  }

  .swcp__trigger-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: ${(props: StyledWrapperProps) => props.triggerHeight || defaultSize};
    padding-right: ${(props: StyledWrapperProps) => props.triggerHeight || defaultSize};
    width: ${(props: StyledWrapperProps) => props.triggerWidth || "100%"};
    height: ${(props: StyledWrapperProps) => props.triggerHeight || defaultSize};
    border-radius: ${(props: StyledWrapperProps) => props.triggerBorderRadius || "4px"};
    border: ${(props: StyledWrapperProps) => props.triggerBorderWidth || "1px"} ${(props: StyledWrapperProps) => props.triggerBorderStyle || "solid"} ${(props: StyledWrapperProps) => props.triggerBackgroundColor || "#dedede"};
    cursor: pointer;

    .swcp__color-preview {
      left: 0;
      top: 0;
      width: ${(props: StyledWrapperProps) => props.triggerHeight || defaultSize};
      height: 100%;
      border-radius: ${(props: StyledWrapperProps) => props.triggerBorderRadius || "4px"};
      border-top-right-radius: 0;
      border-bottom-right-radius: 0
    }
  }

  .swcp__reset-button,
  .swcp__color-preview {
    position: absolute;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
  }

  .swcp__reset-button {
    &:hover {
      .swcp__reset-icon {
        transform: rotate(-135deg);
        fill: red;
      }
    }
  }

  .swcp__reset-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    transform: rotate(0deg);
    transition: transform 0.3s;
  }

  .swcp__picker-container {
    position: absolute;
    padding: 17px;
    margin-top: 15px;
    width: 100%;
    max-width: 300px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.09) 0 12px 15px 0;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 10px 20px 10px;
    z-index: 9999;

    opacity: 0;
    transform: scale3d(0, 0, 0);
    transform-origin: center top;
    transition: opacity 0.1s, visibility 0.1s, transform 0.75s;

    &.is-open {
      opacity: 1;
      transform: scale3d(1, 1, 1);
      transition: opacity, visibility, transform 0.2s;
      visibility: visible;
    }

    &::before {
      content: "";
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 9px 10px 9px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }

    &.picker-width-manipulated {
      &::before {
        left: 25%;
      }

      &.picker-is-right-sided {
        &::before {
          left: 75%;
        }
      }
    }

    .swcp__color-input-wrapper {
      margin-top: 17px;
    }

    .swcp__color-input {
      padding-left: ${
        (props: StyledWrapperProps) => {
          // 7px here is a 1 side padding of the color preview when inside the color input.
          // 2px here is input's padding-left + padding-right.
          if ('input' === props.triggerType) {
            const triggerHeight = props.triggerHeight || defaultSize;
            return (7 + (parseInt(triggerHeight, 10) - 14) + (7 - 2)) + 'px';
          } else {
            const triggerHeight = props.inputHeight || defaultSize;
            return (7 + (parseInt(triggerHeight, 10) - 14) + (7 - 2)) + 'px';
          }
        }
      };
      border-color: #ccc;
    }
  }

  .swcp__color-swatches {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 17px;
  }

  .swcp__color-swatch {
    position: relative;
    display: block;
    padding: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #eee;
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.2s;
  }

  .swcp__color-swatch:active,
  .swcp__color-swatch:focus {
    outline: none;
  }

  .swcp__color-swatch:hover {
    transform: scale(1.1, 1.1);
  }

  .react-colorful {
    width: 100%;
    border-radius: 4px;
  }

  .react-colorful__saturation {
    border-radius: 4px 4px 0 0;
  }

  .react-colorful__last-control {
    border-radius: 0 0 4px 4px;
  }

  .react-colorful__pointer {
    width: 18px;
    height: 18px;
  }
`;