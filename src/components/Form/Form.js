import React from 'react'
import styles from './Form.module.css'
// Components
import NextButton from './NextButton/NextButton'
import StepA from './@Steps/StepA'
import StepB from './@Steps/StepB'

const Form = () => {
  // Refs
  const buyBtn = React.useRef(null)
  const sellBtn = React.useRef(null)

  // States
  const [buy, setBuy] = React.useState(true)
  const [step, setStep] = React.useState(1)

  // Buy/Sell thumb
  const thumbBuy = {
    'left': '.5rem',
    'width': '48%'
  }
  const thumbSell = {
    'left': '6rem',
    'width': '45%'
  }

  const handleModeChanger = (e) => {
    e.preventDefault()
    setBuy(!buy)
  }

  // Next Button click
  const handleNextClick = (e) => {
    e.preventDefault()
    setStep(step + 1)
  }

  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <div className={styles.form__header__change}>
          <div className={styles.form__header__change__thumb} style={buy ? thumbBuy : thumbSell} />
          <button onClick={handleModeChanger} ref={buyBtn} className={styles.form__header__change__button} disabled={buy}>
            Comprar
          </button>
          <button onClick={handleModeChanger} ref={sellBtn} className={styles.form__header__change__button} disabled={!buy}>
            Vender
          </button>
        </div>
        <div className={styles.form__header__step}>
          Step <span>1</span> of 4
        </div>
      </div>

      <form className={styles.form__field}>
        {step === 1 && (
          <StepA />
        )}
        {step === 2 && (
          <StepB />
        )}
        <NextButton text="Continuar para dados" distance="2rem" disabled={false} onClick={handleNextClick} />
      </form>

      <div className={styles.form__progress} />
    </div>
  )
}

export default Form