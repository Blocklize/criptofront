/* eslint-disable react/jsx-no-target-blank */
// React
import React from 'react'
// CSS
import styles from "./Header.module.css"
// Assets
import Logo from "../../assets/Logo.png"
// Components
import Wallet from "../Wallet/Wallet"
import { Link } from 'react-router-dom'
// Context
import WalletContext from '../../contexts/WalletContext';

const Header = () => {
    const { connected } = React.useContext(WalletContext)
    return (
        <header className={styles.header}>
            <Link to="/">
                <img
                    className={styles.header__logo}
                    src={Logo}
                    alt="Blocklize Logo"
                />
            </Link>
            <div className={styles.header__menu}>
                <ul className={styles.header__menu__list}>
                    <li className={styles.header__menu__list__item}>
                        <a href="https://blocklize.tech/pt/homepage/" target="_blank" rel="noopener noreferrer">Sobre</a>
                    </li>
                    <li className={styles.header__menu__list__item}>
                        <a href="https://blocklize.tech/pt/homepage/" target="_blank" rel="noopener noreferrer">Equipe</a>
                    </li>
                    {!connected && (
                        <li className={styles.header__menu__list__item}>
                            <Link to={'login'}>Login / Cadastro</Link>
                        </li>
                    )}
                </ul>
                <Wallet />
            </div>
        </header>
    )
}

export default Header