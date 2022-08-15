import { IdcardOutlined } from '@ant-design/icons';
import { EmployeeNotSelected } from './styled';

export const Employee = () => {
  return (
    <EmployeeNotSelected>
      <IdcardOutlined style={{ fontSize: '180px', color: '#001529' }} />
      <div>Employee not selected</div>
    </EmployeeNotSelected>
  );
};
