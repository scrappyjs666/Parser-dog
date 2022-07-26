import { IdcardOutlined } from '@ant-design/icons'
import styles from './Employee.module.scss'

const Employee = () => {
  return (
    <div className={styles.employeeNotSelected}>
      <IdcardOutlined style={{ fontSize: '180px', color: '#001529' }} />
      <div>Employee not selected</div>
    </div>
  )
}

export default Employee
