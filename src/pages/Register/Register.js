import React from 'react'
import styles from './Register.module.css'
import NextButton from '../../components/Form/NextButton/NextButton'
import StepA from './@Steps/StepA'
import StepB from './@Steps/StepB'
import StepC from './@Steps/StepC'
import { Link, Navigate } from 'react-router-dom'
import WalletContext from '../../contexts/WalletContext';

const Register = () => {
    const [step, setStep] = React.useState(0)
    const [check, setCheck] = React.useState(true)
    const [validation, setValidation] = React.useState(false)
    const { connected } = React.useContext(WalletContext)
    const buttonText = ["Continuar para senha", "Finalizar cadastro", "Fazer login"]

    const handleStepValidator = (e) => {
        e.preventDefault()
        if (step === 0) handleNextStep(validation)
        if (step === 1) return validation ? handleStepB() : handleNextStep(false)
    }

    const handleNextStep = (bool) => {
        if (bool) setStep(step + 1)
        else setCheck(false)
    }

    const handleStepB = async () => {
        if (localStorage.getItem("Key") === localStorage.getItem("Match")) {
            // Send data
            var data = JSON.stringify({
                "nome": localStorage.getItem("Name"),
                "email": localStorage.getItem("Email"),
                "cpf": localStorage.getItem("CPF"),
                "password": localStorage.getItem("Key")
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
            await fetch('https://parseapi.back4app.com/functions/criarUser', config)
                .then(() => {
                    handleNextStep(validation)
                    localStorage.removeItem("Key")
                    localStorage.removeItem("Match")
                })
                .catch(error => {
                    return (error)
                })
        } else handleNextStep(false)
    }

    if (connected) return <Navigate to='/' />

    return (
        <div className={styles.container}>
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