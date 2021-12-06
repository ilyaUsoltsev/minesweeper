import styled from "styled-components";
import { SIZE } from "./constants";

export const Container = styled.div`
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
