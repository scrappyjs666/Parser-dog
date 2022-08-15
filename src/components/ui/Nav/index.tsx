import { Button } from 'antd';
import { ModalAddUser } from 'components/ModalAddUser';
import { useStore } from 'effector-react';
import { $employeeID, $isDisabled, deleteEmployeeFx, getEmployeesFx, unSelect } from 'store/employess';
import React from 'react';
import { Wrapp } from './styled';

export const Nav: React.FC = () => {
  const isDisabled = useStore($isDisabled);
  const employeeID = useStore($employeeID);

  const styleDelete = () => {
    return !isDisabled ? { backgroundColor: '#f23', border: 'none' } : { backgroundColor: '' };
  };

  return (
    <Wrapp>
      <ModalAddUser />
      <Button onClick={() => unSelect()} type="primary" size="large" disabled={isDisabled}>
        Unselect
      </Button>
      <Button
        style={styleDelete()}
        type="primary"
        size="large"
        disabled={isDisabled}
        onClick={() => deleteEmployeeFx(employeeID)}
      >
        Delete
      </Button>
      <Button onClick={() => getEmployeesFx()} type="primary" size="large">
        Refresh
      </Button>
    </Wrapp>
  );
};
