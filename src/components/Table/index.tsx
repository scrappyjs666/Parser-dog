import Checkbox from '@mui/material/Checkbox';
import { Loader2 } from 'components/ui/Loader2';
import { Search } from 'components/ui/Search';
import { useStore, useUnit } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { $employees, $isChecked, employeeID, getEmployeesFx, isChecked, isPerson } from 'store/employess';
import { $inputValue } from 'store/fieldSearch';
import { NotFoundEmployee } from '../ui/NotFoundEmployee';
import { IPerson } from './inteface';
import { PersonListTitle, PersonWrap, TableContent, TableEmployee, TableLabel } from './styled';

export const Table = () => {
  const employees = useStore($employees);
  const inputValue = useStore($inputValue);
  const indexElPersonCheck = useStore($isChecked);
  const [isEmployee, setIsEmployee] = useState<number>(1);

  useEffect(() => {
    getEmployeesFx();
  }, []);

  useEffect(() => {
    const isUser = employees.filter((el) => el.LastName.toLowerCase().includes(inputValue.toLowerCase()));
    setIsEmployee(isUser.length);
  }, [employees, inputValue]);

  const usersInfo = [
    { inputField: 'Employee' },
    { inputField: 'FirstName' },
    { inputField: 'LastName' },
    { inputField: 'Birthday' },
    { inputField: 'Gender' },
    { inputField: 'Position' },
    { inputField: 'Zeitplan' },
  ];

  const personInfo = (el: IPerson, index: number): void => {
    isChecked(index);
    isPerson(el);
    employeeID(Number(el.id));
  };

  const bgStyles = (index: number) => {
    return index === indexElPersonCheck ? { backgroundColor: 'rgba(100, 149, 237, 0.3)' } : { backgroundColor: '' };
  };

  const [loading] = useUnit([getEmployeesFx.pending]);

  return (
    <TableEmployee>
      <PersonListTitle>
        <Search />
        {usersInfo.map((el) => (
          <li key={el.inputField}>{el.inputField}</li>
        ))}
      </PersonListTitle>
      {loading ? (
        <Loader2 />
      ) : (
        <TableContent>
          {employees
            .sort((a, b) => (a.FirstName > b.FirstName ? 1 : -1))
            .filter((el: IPerson) => el.LastName.toLowerCase().includes(inputValue.toLowerCase()))
            .map((el: IPerson, index: number) => (
              <TableLabel key={el.id} style={bgStyles(index)} onClick={() => personInfo(el, index)}>
                <PersonWrap>
                  <Checkbox checked={index === indexElPersonCheck} />
                  <li>{el.FirstName}</li>
                  <li>{el.LastName}</li>
                  <li>{el.Birthday}</li>
                  <li>{el.Gender}</li>
                  <li>{el.Position}</li>
                  <li>{el.Zeitplan}</li>
                </PersonWrap>
              </TableLabel>
            ))}
          {isEmployee < 1 && inputValue.length > 0 && <NotFoundEmployee />}
        </TableContent>
      )}
    </TableEmployee>
  );
};
