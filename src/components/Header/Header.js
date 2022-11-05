/* eslint-disable react/jsx-no-target-blank */
// React
import React from 'react'
// CSS
import styles from "./Header.module.css"
// Assets
import Logo from "../../assets/Logo.png"
// Components
import Wallet from "../Wallet/Wallet"

const Header = () => {
    return (
        <header className={styles.header}>
            <a href="/">
                <img
                    className={styles.header__logo}
                    src={Logo}
                    alt="Blocklize Logo"
                />
            </a>
            <div className={styles.header__menu}>
                <ul className={styles.header__menu__list}>
                    <li className={styles.header__menu__list__item}>
                        <a href="https://blocklize.tech/pt/homepage/" target="_blank" rel="noopener noreferrer">About</a>
                    </li>
                    <li className={styles.header__menu__list__item}>
                        <a href="https://blocklize.tech/pt/homepage/" target="_blank" rel="noopener noreferrer">Mint</a>
                    </li>
                    <li className={styles.header__menu__list__item}>
                        <a href="https://blocklize.tech/pt/homepage/" target="_blank" rel="noopener noreferrer">Team</a>
                    </li>
                </ul>
                <Wallet />
            </div>
        </header>
    )
}

export default Header