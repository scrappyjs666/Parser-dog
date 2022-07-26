import { Button } from 'antd'
import { ModalAddUser } from 'components/ModalAddUser/ModalAddUser'
import { useStore } from 'effector-react'
import React from 'react'
import { $isChecked, $isDisabled, deleteEmployeeFx, unSelect } from 'store/store'
import styles from './Nav.module.scss'

const Nav: React.FC = () => {
  const isDisabled = useStore($isDisabled)
  const indexPerson = useStore($isChecked)

  const styleDelete = () => {
    return !isDisabled
      ? { backgroundColor: '#f23', border: 'none' }
      : { backgroundColor: '' }
  }

  return (
    <div className={styles.nav__wrap}>
      <ModalAddUser />
      <Button
        onClick={() => unSelect()}
        type="primary"
        size="large"
        disabled={isDisabled}
      >
        Unselect
      </Button>
      <Button
        style={styleDelete()}
        type="primary"
        size="large"
        disabled={isDisabled}
        onClick={() => deleteEmployeeFx(indexPerson)}
      >
        Delete
      </Button>
      <Button type="primary" size="large" disabled={isDisabled}>
        Save
      </Button>
    </div>
  )
}

export default Nav
