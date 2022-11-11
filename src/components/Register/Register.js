import React from 'react'
import styles from './Register.module.css'
import NextButton from '../Form/NextButton/NextButton'
import StepA from './@Steps/StepA'
import StepB from './@Steps/StepB'
import StepC from './@Steps/StepC'
import { Link } from 'react-router-dom'

const Register = () => {
    const [step, setStep] = React.useState(0)
    const [check, setCheck] = React.useState(true)
    const [validation, setValidation] = React.useState(false)
    const buttonText = ["Continuar para senha", "Finalizar cadastro", "Fazer login"]

    const handleStepValidator = (e) => {
        e.preventDefault()
        handleNextStep(validation)
    }

    const handleNextStep = (bool) => {
        if (bool) setStep(step + 1)
        else setCheck(false)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex justify-content-center">
                    <div className={styles.register}>
                        <div className={styles.register__header}>
                            <h1 className={styles.register__header__title}>
                                Novo usuário
                            </h1>
                        </div>
                        <form className={styles.register__form}>
                            {step === 0 && <StepA extra={setValidation} check={check} />}
                            {step === 1 && <StepB extra={setValidation} check={check} />}
                            {step === 2 && <StepC extra={setValidation} check={check} />}
                            {step < 2 && <NextButton onClick={handleStepValidator} text={buttonText[step]} distance="2rem" />}
                            {step === 2 && (
                                <Link to='../login'>
                                    <NextButton text={buttonText[step]} distance="2rem" />
                                </Link>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register