import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Wrapp = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 65vh;
`;

export const Spinner = styled.div`
  width: 148px;
  height: 148px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;

  content: '';
  box-sizing: border-box;
  width: 116px;
  height: 116px;
  border-radius: 50%;
  border: 3px solid rgb(100, 149, 237);
  border-bottom-color: #ff3d00;
`;
