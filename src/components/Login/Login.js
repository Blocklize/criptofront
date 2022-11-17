/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './Login.module.css'
import InputPass from '../Form/InputPass/InputPass'
import InputEmail from '../Form/InputEmail/InputEmail'
import NextButton from '../Form/NextButton/NextButton'
import LoginCheckbox from './LoginCheckbox/LoginCheckbox'
import WalletContext from '../../contexts/WalletContext';
import { Link, Navigate } from 'react-router-dom'

const Login = (props) => {
    const { connected, setConnected } = React.useContext(WalletContext)
    // Variables
    const Password = "Password"
    // States
    const [pass, setPass] = React.useState(false)
    const [email, setEmail] = React.useState(false)
    const [valid, setValid] = React.useState(false)
    const [check, setCheck] = React.useState(true)
    // Functions
    const handleValidator = () => {
        if (email && pass) setValid(true)
        else setValid(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (valid) {
            let data = JSON.stringify({
                "email": localStorage.getItem("Email"),
                "password": localStorage.getItem(Password),
            })
    
            let config = {
                method: 'post',
                headers: {
                    'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
                    'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
                    'Content-Type': 'application/json'
                },
                body: data
            };
            await fetch('https://parseapi.back4app.com/functions/login', config)
                .then(resp => resp.json())
                .then(json => Object.values(json)[0])
                .then(u =>  {
                    if (u !== -1 && u !== 101) {
                        localStorage.removeItem(Password)
                        localStorage.setItem("CPF", u.cpf)
                        localStorage.setItem("Address", u.address)
                        localStorage.setItem("JWT", u.sessionToken)
                        setConnected(true)
                    } else {
                        setValid(false)
                    }
                })
        } else setCheck(false)
    }

    React.useEffect(() => {
        handleValidator()
    }, [email, pass])

    React.useEffect(() => {
        setCheck(valid)
    }, [valid])

    React.useEffect(() => {
        if(!localStorage.getItem("Key")) setCheck(true)
        console.log(valid)
        console.log(email, pass)
    }, [])

    if(connected) return <Navigate to='/' />
    return (
        <div className={styles.container}>
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex justify-content-center">
                    <div className={styles.login} disabled={connected}>
                        <div className={styles.login__header}>
                            <h1 className={styles.login__header__title}>
                                Insira suas credenciais
                            </h1>
                        </div>
                        <form className={styles.login__form} >
                            <InputEmail label="Digite seu e-mail" distance="1rem" extra={setEmail} check={check} />
                            <InputPass label="Digite sua senha" distance="1rem" extra={setPass} check={check} kind={Password} />
                            <LoginCheckbox message="Lembrar deste dispositivo" />
                            <p className={styles.login__form__links}>
                                Esqueceu a sua senha? <Link to="/">Clique aqui</Link> <br />
                                Ainda não tem uma conta? <Link to="../register">Cadastre-se</Link>
                            </p>
                            <NextButton text="Entrar" onClick={handleLogin} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login