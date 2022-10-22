/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './Form.module.css'
// Components
import NextButton from './NextButton/NextButton'
import StepA from './@Steps/StepA'
import StepB from './@Steps/StepB'
import StepC from './@Steps/StepC'
import StepD from './@Steps/StepD'
// Contexts
import WalletContext from '../../contexts/WalletContext'
import FormsContext from '../../contexts/FormsContext'

const Form = () => {
  // Refs
  const Form = React.useRef(null)
  const buyBtn = React.useRef(null)
  const sellBtn = React.useRef(null)

  // Button text

  const buttonText = {
    0: "Conecte a sua carteira",
    1: "Continuar para dados",
    2: "Continuar para pagamento",
    3: "Aguardando pagamento...",
    4: "Pagamento realizado!",
  }

  // Context
  const { connected } = React.useContext(WalletContext)
  const { setValidated } = React.useContext(FormsContext)

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

  // Back Button

  const handleBack = () => {
    setStep(1)
  }

  // Next Button
  const handleNextClick = (e) => {
    e.preventDefault()
    handleValidator(step)
  }

  // Steps
  const getNextStep = () => {
    setStep(step + 1)
  }

  const validateStepOne = () => {
    if (localStorage.getItem("buyValue") >= 10) {
      setValidated(false)
      getNextStep()
    } else {
      setValidated(true)
    }
  }

  const validateStepTwo = () => {
    const name = localStorage.getItem("Name")
    const email = localStorage.getItem("Email")
    const cpf = localStorage.getItem("CPF")
    if (name && email && cpf) {
      getNextStep()
    }
  }

  const validateStepThree = () => {
    setTimeout(() => {
      console.log("Cheguei no Step 3")
      getNextStep()
    }, 5000);
  }

  // Form validation

  const handleValidator = (step) => {
    if (step === 1) validateStepOne()
    if (step === 2) validateStepTwo()
  }

  React.useEffect(() => {
    if (step === 3) validateStepThree()
  }, [step, validateStepThree])

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
        {(step === 2 || step === 4) && (<div className={styles.form__header__back} onClick={handleBack}> ← </div>)}
        <div className={styles.form__header__step}>
          Step <span>{step}</span> of 4
        </div>
      </div>

      <form ref={Form} className={styles.form__field}>
        {step === 1 && (<StepA />)}
        {step === 2 && (<StepB />)}
        {step === 3 && (<StepC />)}
        {step === 4 && (<StepD />)}
        <NextButton
          text={connected ? buttonText[step] : buttonText[0]}
          distance="2rem"
          onClick={handleNextClick}
          disabled={!connected || step > 2}
        />
      </form>
      <div className={styles.form__progress} style={{ width: `${25 * step}%` }} />
    </div>
  )
}

export default Form