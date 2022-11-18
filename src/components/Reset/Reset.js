import React from 'react'
import styles from './Reset.module.css'
import NextButton from '../Form/NextButton/NextButton'
import StepA from './@Steps/StepA'
import StepB from './@Steps/StepB'
import { Link } from 'react-router-dom'

const Register = () => {
    const [step, setStep] = React.useState(0)
    const [check, setCheck] = React.useState(true)
    const [validation, setValidation] = React.useState(false)
    const buttonText = ["Continuar", "Fazer login"]

    const handleStepValidator = (e) => {
        e.preventDefault()
        if (step === 0) handleMailValidation()
    }

    const handleNextStep = (bool) => {
        if (bool) setStep(step + 1)
        else setCheck(false)
    }

    const handleMailValidation = async () => {
        var data = JSON.stringify({
            "email": localStorage.getItem("Email")
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
        await fetch('https://parseapi.back4app.com/functions/emailRecuperarSenha', config)
            .then(() => handleNextStep(validation))
            .catch(e => { throw e })
    }

    return (
        <div className={styles.container}>
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex justify-content-center">
                    <div className={styles.reset}>
                        <div className={styles.reset__header}>
                            <h1 className={styles.reset__header__title}>
                                Recuperar a senha
                            </h1>
                        </div>
                        <form className={styles.reset__form}>
                            {/* Step 1 */}
                            {step === 0 && <StepA extra={setValidation} check={check} />}
                            {step === 0 && <NextButton onClick={handleStepValidator} text={buttonText[step]} distance="2rem" />}


                            {/* Step 2 */}
                            {step === 1 && <StepB extra={setValidation} check={check} />}
                            {step === 1 && (
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