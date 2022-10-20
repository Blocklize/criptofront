import React from 'react'
import styles from './Form.module.css'
import InputBRL from './InputBRL/InputBRL'
import InputCoin from './InputCoin/InputCoin'
import Summary from './Summary/Summary'
import NextButton from './NextButton/NextButton'

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

      <form className={styles.form__field}>
        <InputBRL name="buyValue" label="Escolha o valor"/>
        <InputCoin name="buyValue" label="Após a compra você receberá" distance="1rem" />
        <Summary coin="ETH" price={6819.80} distance="1rem" />
        <NextButton text="Continuar para dados" distance="2rem" />
      </form>

      <div className={styles.form__progress} />
    </div>
  )
}

export default Form