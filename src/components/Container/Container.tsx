import React from 'react';
import { Wrapp } from './styled';

interface IContainer {
  children: React.ReactNode;
}

export const Container: React.FC<IContainer> = ({ children }) => {
  return <Wrapp>{children}</Wrapp>;
};
