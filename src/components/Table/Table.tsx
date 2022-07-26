import Checkbox from '@mui/material/Checkbox'
import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import Nav from 'shared/ui/Nav/Nav'
import { Search } from 'shared/ui/Search/Search'
import {
  $employees,
  $inputValue,
  $isChecked,
  getEmployeesFx,
  isChecked,
  isPerson,
} from 'store/store'
import { IPerson } from './inteface'
import styles from './Table.module.scss'

const Table = () => {
  const employees = useStore($employees)
  const inputValue = useStore($inputValue)
  const indexElPersonCheck = useStore($isChecked)

  useEffect(() => {
    getEmployeesFx()
  }, [])

  const usersInfo = [
    { inputField: 'Employee' },
    { inputField: 'FirstName' },
    { inputField: 'LastName' },
    { inputField: 'Birthday' },
    { inputField: 'Gender' },
    { inputField: 'Position' },
    { inputField: 'Zeitplan' },
  ]

  const personInfo = (el: IPerson, index: number): void => {
    isChecked(index)
    isPerson(el)
  }

  const bgStyles = (index: number) => {
    return index === indexElPersonCheck
      ? { backgroundColor: 'rgba(100, 149, 237, 0.3)' }
      : { backgroundColor: '' }
  }

  return (
    <>
      <div className={styles.tableEmployee}>
        <Nav />
        <ul className={styles.person__listTitle}>
          <Search />
          {usersInfo.map((el) => (
            <li key={el.inputField}>{el.inputField}</li>
          ))}
        </ul>
        {employees
          .filter((el) =>
            el.LastName.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((el, index) => (
            <label
              key={index}
              onClick={() => personInfo(el, index)}
              className="filter-rowbutton__label"
            >
              <ul style={bgStyles(index)} className={styles.person__wrap}>
                <Checkbox checked={index === indexElPersonCheck} />
                <li>{el.FirstName}</li>
                <li>{el.LastName}</li>
                <li>{el.Birthday}</li>
                <li>{el.Gender}</li>
                <li>{el.Position}</li>
                <li>{el.Zeitplan}</li>
              </ul>
            </label>
          ))}
      </div>
    </>
  )
}

export default Table
