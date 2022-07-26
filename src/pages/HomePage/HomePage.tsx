import { CurrentEmployee } from 'components/CurrentEmployee/CurrentEmployee'
import Employee from 'components/Employee/Employee'
import Table from 'components/Table/Table'
import { useStore } from 'effector-react'
import { $isPerson } from 'store/store'
import styles from './HomePage.module.scss'

const HomePage = () => {
  const person = useStore($isPerson)

  return (
    <>
      <div className={styles.tableEmployee__container}>
        <Table />
        {person == null ? <Employee /> : <CurrentEmployee />}
      </div>
    </>
  )
}

export default HomePage
