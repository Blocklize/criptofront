/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import InputPass from '../../../components/Form/InputPass/InputPass'
import styles from './Steps.module.css'

const StepA = (props) => {
    const [valid, setValid] = React.useState(false)
    const [match, setMatch] = React.useState(false)
    const [pass, setPass] = React.useState(false)
    const [check, setCheck] = React.useState(true)

    const handleValidator = () => {
        if (pass && match) setValid(true)
        else setValid(false)
    }

    React.useEffect(() => {
        props.extra(true)
        handleValidator()
    }, [pass, match])

    React.useEffect(() => {
        props.extra(valid)
    }, [valid])

    React.useEffect(() => {
        setCheck(props.check)
    }, [props.check])

    return (
        <div className={styles.step}>
            <InputPass label="Crie sua senha" distance="1rem" extra={setPass} check={check} kind={"Key"} />
            <p className={styles.description}>
                Deve ter ao menos 10 caracteres; <br />
                Deve ter ao menos um número; <br />
                Deve ter ao menos um caractere especial. <br />
                Deve ter ao menos uma letra maiúscula e minúscula;
            </p>
            <InputPass label="Confirme a sua senha" distance="1rem" extra={setMatch} check={check} kind={"Match"} />
        </div>
    )
}

export default StepA