import { CurrentEmployee } from 'components/CurrentEmployee';
import { Employee } from 'components/Employee';
import { Table } from 'components/Table';
import { useStore } from 'effector-react';
import { $isPerson } from 'store/employess';
import { TableEmployeeContainer } from './styled';

const HomePage = () => {
  const person = useStore($isPerson);

  return (
    <TableEmployeeContainer>
      <Table />
      {!person ? <Employee /> : <CurrentEmployee />}
    </TableEmployeeContainer>
  );
};

// eslint-disable-next-line import/no-default-export
export default HomePage;
