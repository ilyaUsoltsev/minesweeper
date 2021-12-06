import styled from "styled-components";

export const Cover = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isOpen ? "transparent" : "rgb(188,188,188)"};
  box-shadow: ${(props) =>
    props.isOpen
      ? "none"
      : "inset -2px -2px 4px #111, inset 2px 2px 4px #ffffff"};
`;

const colorsConfig: Record<number, string> = {
  1: "blue",
  2: "green",
  3: "red",
  4: "darkblue",
  5: "yellow",
  6: "darkred",
  7: "brown",
  8: "black",
};

export const Container = styled.div<{
  isOpen: boolean;
  isExploded: boolean;
  value: number;
}>`
  width: 50px;
  height: 50px;
  border: ${(props) =>
    !props.isOpen ? "1px solid transparent" : "1px solid #aaaaaa"};
  display: flex;
  background-color: ${(props) =>
    props.isExploded ? "rgba(255,0,0,0.9)" : "rgb(188, 188, 188)"};
  justify-content: center;
  position: relative;
  align-items: center;
  font-size: 20px;
  color: ${(props) => colorsConfig[props.value]};
  font-weight: bold;
`;
