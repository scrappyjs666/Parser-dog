import React from 'react'
import styles from './Button.module.scss'

interface IButton {
  name: string
  color: string
  fn?: () => void
}

const Button: React.FC<IButton> = ({ name, color, fn }) => {
  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={fn}
        style={{ backgroundColor: `${color}` }}
      >
        {name}
      </button>
    </>
  )
}

export default Button
