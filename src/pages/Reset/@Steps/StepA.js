/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './Steps.module.css'
import InputEmail from '../../../components/Form/InputEmail/InputEmail'

const StepA = (props) => {
    const [valid, setValid] = React.useState(false)
    const [email, setEmail] = React.useState(false)
    const [check, setCheck] = React.useState(true)

    const handleValidator = () => {
        if (email) setValid(true)
        else setValid(false)
    }

    React.useEffect(() => {
        handleValidator()
    }, [email])

    React.useEffect(() => {
        props.extra(valid)
    }, [valid])

    React.useEffect(() => {
        setCheck(props.check)
    }, [props.check])

    return (
        <div className={styles.step}>
            <p className={styles.text}>
                Lamentamos que você tenha perdido sua senha.
                Entretanto, estamos aqui para te ajudar a recuperá-la
                <br />
                <br />
                Primeiro, precisamos que você nos diga qual é 
                o <b>E-mail cadastrado</b> na sua conta:
            </p>
            <InputEmail label="Digite seu e-mail" distance="1rem" extra={setEmail} check={check} />
            <p className={styles.text}>Enviaremos um link para que você possa criar uma nova senha.</p>
        </div>
    )
}

export default StepA