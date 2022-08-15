import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

export const spin = keyframes`
 0% {transform: rotate(0deg);}
 100% {transform: rotate(360deg);}
`;

export const Wrapp = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const Spinner = styled.div`
  position: absolute;
    height: 120px;
    width: 120px;
    border: 3px solid transparent;
    border-top-color: #A04668;
    top: 50%;
    left: 50%;
    margin: -30px;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;

    &:before, &:after{
      content:'';
      position: absolute;
      border: 3px solid transparent;
      border-radius: 50%;
    }

    &:before{
      border-top-color: #254E70;
      top: -12px;
      left: -12px;
      right: -12px;
      bottom: -12px;
      animation: spin 3s linear infinite;
    }

    &:after{
      border-top-color: #FFFBFE;
      top: 6px;
      left: 6px;
      right: 6px;
      bottom: 6px;
      animation: spin 4s linear infinite;
`;
