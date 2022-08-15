import styled from '@emotion/styled';

export const PersonWrap = styled.ul`
  display: grid;
  gap: 10px;
  justify-content: center;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
  margin: 0;
  padding: 20px 0;
  text-align: center;
`;

export const TableLabel = styled.label`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #0000004f;
`;

export const PersonListTitle = styled.ul`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(7, 1fr);
  background-color: rgb(100, 149, 237);
  color: #fff;
  justify-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 20px 0;
  margin: 0;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -ms-border-radius: 2px;
  -o-border-radius: 2px;
`;

export const TableEmployee = styled.div`
  display: grid;
  color: #000;
  overflow: auto;
  width: 100%;
  border: 1px solid rgb(163, 154, 154);
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -ms-border-radius: 2px;
  -o-border-radius: 2px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(116, 114, 110);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #001529;
    border-radius: 10px;
  }
`;
export const TableContent = styled.div`
  height: 65vh;
`;

export const ErrorWrap = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;
