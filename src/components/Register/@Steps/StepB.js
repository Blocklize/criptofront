/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import InputPass from '../../Form/InputPass/InputPass'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './Steps.module.css'

const StepB = (props) => {
    const [valid, setValid] = React.useState(false)
    const [check, setCheck] = React.useState(false)
    const [pass, setPass] = React.useState(false)

    const handleValidator = () => {
        if (pass) console.log()
        setValid(true)
    }

    React.useEffect(() => {
        props.extra(true)
        handleValidator()
    }, [])

    React.useEffect(() => {
        props.extra(valid)
    }, [valid])

    React.useEffect(() => {
        setCheck(props.check)
    }, [props.check])

    return (
        <div className={styles.step}>
            <InputPass label="Crie sua senha" distance="1rem" extra={setPass} check={check} />
            <p className={styles.description}>
                Sua senha deve conter 10 caracteres; <br />
                Não pode conter sequências numéricas; <br />
                Deve ter ao menos uma letra maiúscula; <br />
                Deve ter ao menos um caractere especial.
            </p>
            <ProgressBar />
            <InputPass label="Confirme a sua senha" distance="1rem" extra={setPass} check={check} />
        </div>
    )
}

export default StepB