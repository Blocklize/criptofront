import React from 'react'
import styles from './Recover.module.css'

import Error from './Error/Error'
import StepA from './@Steps/StepA'
import StepB from './@Steps/StepB'
import NextButton from '../../components/Form/NextButton/NextButton'

import { Link, useParams } from 'react-router-dom'

const Register = () => {
    const { id } = useParams()
    const [step, setStep] = React.useState(0)
    const [error, setError] = React.useState(0)
    const [check, setCheck] = React.useState(true)
    const [validation, setValidation] = React.useState(false)
    const buttonText = ["Continuar", "Fazer login", "Tente novamente"]

    const handleStepValidator = (e) => {
        e.preventDefault()
        if (step === 0) handlePassValidator()
    }

    const handleNextStep = (bool) => {
        if (bool) setStep(step + 1)
        else setCheck(false)
    }
    const handleError = (data) => {
        setStep(2)
        setError({
            id: data.code,
            message: data.error,
        })
    }

    const handlePassValidator = async () => {
        if (localStorage.getItem("Key") === localStorage.getItem("Match")) {
            const data = JSON.stringify({
                "objectId": id, //<objectId que recebe na url>
                "newPassword": localStorage.getItem("Match") //<nova password do usuári
            });

            const config = {
                method: 'post',
                headers: {
                    'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
                    'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
                    'Content-Type': 'application/json'
                },
                body: data
            }
            await fetch('https://parseapi.back4app.com/functions/recuperarSenha', config)
                .then(resp => resp.json())
                .then(json => {
                    if (json.error) handleError(json)
                    else handleNextStep(validation)
                })
                .catch(error => {
                    throw error
                })
        } else {
            setCheck(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex justify-content-center">
                    <div className={styles.reset}>
                        <div className={styles.reset__header}>
                            <h1 className={styles.reset__header__title}>
                                Alterar a senha
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

                            {/* Error */}
                            {step === 2 && (
                                <Error errorId={error.id} errorName={"ALTER_PASSWORD_ERROR"} message={error.message} />
                            )}
                            {step === 2 && (
                                <Link to='../reset'>
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