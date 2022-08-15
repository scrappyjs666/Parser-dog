import styled from '@emotion/styled';

export const SearchWrapp = styled.div`
  display: grid;
  grid-column: 1/-1;
  position: relative;
  width: 300px;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  color: #000;
  width: 300px;
  height: 35px;
  outline: none;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  padding: 0 0 0 35px;
  border: none;
  &::placeholder {
    color: #000;
    font-weight: 600;
  }
`;

export const ButtonSearch = styled.button`
  top: 12%;
  left: 0%;
  border: none;
  background-color: transparent;
  position: absolute;
  cursor: pointer;
`;
export const Clearinput = styled.div`
  top: 12%;
  left: 87%;
  position: absolute;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
