/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import styles from './Form.module.css'
// Components
import NextButton from './NextButton/NextButton'
import Waiting from './Waiting/Waiting'
import StepA from './@Steps/StepA'
import StepB from './@Steps/StepB'
import StepC from './@Steps/StepC'
import StepD from './@Steps/StepD'
// Contexts
import WalletContext from '../../contexts/WalletContext'
import FormsContext from '../../contexts/FormsContext'
import TokenContext from '../../contexts/TokenContext'
import Error from './Error/Error'

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
    "Wait": "Gerando código...",
    "Error": "Tente novamente",
    "Timeout": "Tente novamente",
  }

  // Context
  const { token } = React.useContext(TokenContext)
  const { connected } = React.useContext(WalletContext)
  const { setValidated } = React.useContext(FormsContext)

  // States
  const [buy, setBuy] = React.useState(true)
  const [step, setStep] = React.useState(1)
  const [brCode, setBrCode] = React.useState("")
  const [qrCode, setQrCode] = React.useState("")
  const [corrId, setCorrId] = React.useState("")
  const [transactionId, setTransactionId] = React.useState("")
  const [transactionTime, setTransactionTime] = React.useState("")
  const [transactionPrice, setTransactionPrice] = React.useState("")
  const [transactionWatcher, setTransactionWatcher] = React.useState(null)

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
  const getWait = () => {
    setStep('Wait')
  }

  const sendData = async () => {
    var data = JSON.stringify({
      "quantity": localStorage.getItem("buyValue"),
      "metamask": localStorage.getItem("Address"),
      "name": localStorage.getItem("Name"),
      "email": localStorage.getItem("Email"),
      // "tokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      "tokenAddress": token.TokenAddress,
      "cpf": localStorage.getItem("CPF"),
    })

    var config = {
      method: 'post',
      headers: {
        'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
        'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
        'Content-Type': 'application/json'
      },
      body: data
    }

    await fetch('https://parseapi.back4app.com/functions/swapPix', config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.result.error) {
          setStep('Error')
        } else {
          setBrCode(json.result.brCode)
          setQrCode(json.result.charge.qrCodeImage)
          setCorrId(json.result.charge.correlationID)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const validateStepOne = () => {
    if (localStorage.getItem("buyValue") >= 10) {
      setValidated(false)
      setStep(2)
    } else {
      setValidated(true)
    }
  }

  const validateStepTwo = async () => {
    const name = localStorage.getItem("Name")
    const email = localStorage.getItem("Email")
    const cpf = localStorage.getItem("CPF")
    if (name && email && cpf) {
      getWait()
      await sendData()
      setTimeout(() => {
        setStep(3)
      }, 1000);
    }
  }

  const validateStepThree = async () => {
    getWatcher()
    var data = JSON.stringify({
      "corrId": corrId
    })

    var config = {
      method: 'post',
      headers: {
        'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
        'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
        'Content-Type': 'application/json'
      },
      body: data
    }

    await fetch('https://parseapi.back4app.com/functions/checkTransaction', config)
      .then(response => response.json())
      .then(json => {
        setTimeout(() => {
          if (json.result !== "transaction not passed yet") {
            setTransactionPrice(json.result.amount_BRL)
            setTransactionTime(json.result.time)
            setTransactionId(json.result.corrId)
            clearTimeout(transactionWatcher)
            setTransactionWatcher(null)
            setStep(4)
          } else {
            validateStepThree()
          }
        }, 10000);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const validateStepFour = () => {
    localStorage.removeItem("CPF")
    localStorage.removeItem("Email")
    localStorage.removeItem("Name")
    localStorage.removeItem("buyValue")
    localStorage.removeItem("Address")
  }

  const getWatcher = () => {
    if (!transactionWatcher) {
      setTransactionWatcher(setTimeout(() => {
        setStep('Timeout')
      }, 60000))
    }
  }

  // Form validation

  const handleValidator = (step) => {
    if (step === 1) validateStepOne()
    if (step === 2) validateStepTwo()
    if (step === "Error") setStep(1)
    if (step === "Timeout") setStep(1)
  }

  React.useEffect(() => {
    if (step === 3) validateStepThree()
    if (step === 4) validateStepFour()
  }, [step, validateStepThree, validateStepFour])

  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <div className={styles.form__header__change}>
          <div className={styles.form__header__change__thumb} style={buy ? thumbBuy : thumbSell} />
          <button onClick={handleModeChanger} ref={buyBtn} className={styles.form__header__change__button} disabled={buy}>
            Comprar
          </button>
          <button ref={sellBtn} className={styles.form__header__change__button} disabled={!buy}>
            Vender
          </button>
        </div>
        {(step === 2 || step === 4 || step === "Error" || step === "Timeout") && (<div className={styles.form__header__back} onClick={handleBack}> ← </div>)}
        {(step !== "Wait" && step !== "Error" && step !== "Timeout" && (
          <div className={styles.form__header__step}>
            Step <span>{step}</span> of 4
          </div>
        ))}
      </div>

      <form ref={Form} className={styles.form__field}>
        {step === 1 && (<StepA />)}
        {step === 2 && (<StepB />)}
        {step === 3 && (<StepC br={brCode} qr={qrCode} />)}
        {step === 4 && (<StepD transactionId={transactionId} transactionTime={transactionTime} transactionPrice={transactionPrice} />)}
        {step === "Wait" && (<Waiting />)}
        {step === "Timeout" && (<Error date={new Date(Date.now()).toLocaleString()} message="O tempo para realizar a transação expirou. Por favor, tente novamente." errorId="141" errorName={"TRANSACTION_TIMEOUT"} />)}
        {step === "Error" && (<Error date={new Date(Date.now()).toLocaleString()} message="Um erro inesperado aconteceu. Por favor, tente novamente." errorId="130" errorName={"UNEXPECTED_ERROR"} />)}
        <NextButton
          text={connected ? buttonText[step] : buttonText[0]}
          distance="2rem"
          onClick={handleNextClick}
          disabled={!connected || step > 2 || step === "Wait"}
        />
      </form>
      <div className={styles.form__progress} style={{ width: `${25 * step}%` }} />
    </div>
  )
}

export default Form