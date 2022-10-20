import React from 'react'
import styles from './Form.module.css'

const Form = () => {
  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <div className={styles.form__header__change}>
          <div className={styles.form__header__change__thumb}/>
          <button className={styles.form__header__change__button}>
            Comprar
          </button>
          <button className={styles.form__header__change__button}>
            Vender
          </button>
        </div>
        <div className={styles.form__header__step}>
          Step <span>1</span> of 4
        </div>
      </div>
    </div>
  )
}

export default Form