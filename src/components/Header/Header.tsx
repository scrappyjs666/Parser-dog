import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header__wrap}>
      <header className={styles.header}>
        <Link to={'/'}><div>MEM</div></Link>
      </header>
    </div>
  )
}
