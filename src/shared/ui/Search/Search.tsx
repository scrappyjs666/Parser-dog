import { useStore } from 'effector-react'
import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'
import {
  $inputValue,
  inputChangeValue,
  inputClearInputValue,
} from 'store/store'
import closeIcon from './img/close-icon.svg'
import search from './img/search.svg'
import styles from './Search.module.scss'

export const Search = () => {
  const [inputValue, setInputValue] = useState('')

  const changeInputValue = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      inputChangeValue(e.target.value)
    },
    300
  )

  const inputValueStore = useStore($inputValue)

  useEffect(() => {
    setInputValue(inputValueStore)
  }, [inputValueStore])

  const placeholderText = 'Find employee'

  return (
    <div className={styles.search__wrapp}>
      <input
        value={inputValue}
        onChange={(e) => {
          changeInputValue(e)
          setInputValue(e.target.value)
        }}
        placeholder={placeholderText}
        className={styles.search}
      />
      <button className={styles.button__search}>
        <img src={search} alt="search icon" />
      </button>
      <button
        onClick={() => {
          inputClearInputValue()
        }}
        className={styles.clearInput}
      >
        <img src={closeIcon} alt="inputClear icon" />
      </button>
    </div>
  )
}
