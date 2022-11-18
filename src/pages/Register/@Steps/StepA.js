/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import InputCPF from '../../../components/Form/InputCPF/InputCPF'
import InputName from '../../../components/Form/InputName/InputName'
import InputEmail from '../../../components/Form/InputEmail/InputEmail'
import styles from './Steps.module.css'

const StepA = (props) => {
    const [valid, setValid] = React.useState(false)
    const [name, setName] = React.useState(false)
    const [email, setEmail] = React.useState(false)
    const [cpf, setCpf] = React.useState(false)
    const [check, setCheck] = React.useState(true)

    const handleValidator = () => {
        if (name && email && cpf) setValid(true)
        else setValid(false)
    }

    const handleEmailCheck = async (value) => {
        var data = JSON.stringify({
            "email": value
        })
        var result;
        var config = {
            method: 'post',
            headers: {
                'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
                'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
                'Content-Type': 'application/json'
            },
            body: data
        }
        await fetch('https://parseapi.back4app.com/functions/emailToUser', config)
            .then(resp => resp.json())
            .then(json => {
                result = json.result
            })
            .catch(e => {
                throw e
            })
        return result
    }

    const handleCpfCheck = async (value) => {
        var data = JSON.stringify({
            "cpf": value
        })
        var result;
        var config = {
            method: 'post',
            headers: {
                'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
                'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
                'Content-Type': 'application/json'
            },
            body: data
        }
        await fetch('https://parseapi.back4app.com/functions/cpfToUser', config)
            .then(resp => resp.json())
            .then(json => {
                result = json.result
            })
            .catch(e => {
                throw e
            })
        return result
    }

    React.useEffect(() => {
        handleValidator()
    }, [name, email, cpf])

    React.useEffect(() => {
        props.extra(valid)
    }, [valid])

    React.useEffect(() => {
        setCheck(props.check)
    }, [props.check])

    return (
        <div className={styles.step}>
            <InputName label="Digite seu nome" distance="1rem" extra={setName} check={check} />
            <InputEmail label="Digite seu e-mail" distance="1rem" extra={setEmail} check={check} database={handleEmailCheck} />
            <InputCPF label="Digite seu CPF" distance="1rem" extra={setCpf} check={check} database={handleCpfCheck} />
        </div>
    )
}

export default StepA