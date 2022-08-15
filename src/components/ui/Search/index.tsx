import { useStore } from 'effector-react';
import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import { $inputValue, inputChangeValue, inputClearInputValue } from 'store/fieldSearch';
import closeIcon from './img/close-icon.svg';
import search from './img/search.svg';
import { ButtonSearch, Clearinput, Input, SearchWrapp } from './styled';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const inputValueStore = useStore($inputValue);

  const changeInputValue = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    inputChangeValue(e.target.value);
  }, 300);
  useEffect(() => {
    setInputValue(inputValueStore);
  }, [inputValueStore]);

  return (
    <SearchWrapp>
      <Input
        value={inputValue}
        onChange={(e) => {
          changeInputValue(e);
          setInputValue(e.target.value);
        }}
        placeholder="Entire lastName"
      />
      <ButtonSearch>
        <img src={search} alt="search icon" />
      </ButtonSearch>
      <Clearinput
        onClick={() => {
          inputClearInputValue();
        }}
      >
        <img src={closeIcon} alt="inputClear icon" />
      </Clearinput>
    </SearchWrapp>
  );
};
