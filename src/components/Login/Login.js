import React from 'react'
import styles from './Login.module.css'
import InputPass from '../Form/InputPass/InputPass'
import InputEmail from '../Form/InputEmail/InputEmail'
import NextButton from '../Form/NextButton/NextButton'
import LoginCheckbox from './LoginCheckbox/LoginCheckbox'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = React.useState(false)
    if (email) console.log()

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex justify-content-center">
                    <div className={styles.login}>
                        <div className={styles.login__header}>
                            <h1 className={styles.login__header__title}>
                                Insira suas credenciais
                            </h1>
                        </div>
                        <form className={styles.login__form}>
                            <InputEmail label="Digite seu e-mail" distance="1rem" extra={setEmail} />
                            <InputPass label="Digite sua senha" distance="1rem" />
                            <LoginCheckbox message="Lembrar deste dispositivo" />
                            <p className={styles.login__form__links}>
                                Esqueceu a sua senha? <Link to="/">Clique aqui</Link> <br />
                                Ainda não tem uma conta? <Link to="../register">Cadastre-se</Link>
                            </p>
                            <NextButton text="Entrar" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login