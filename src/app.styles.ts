import styled from "styled-components";
import { SIZE } from "./constants";

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(${SIZE}, 1fr);
`;

export const Controls = styled.div`
  margin-bottom: 12px;
`;

export const GameButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 10px 15px;
  font-size: 24px;
`;
