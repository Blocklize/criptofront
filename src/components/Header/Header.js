// React
import React from 'react'
// CSS
import styles from "./Header.module.css"
// Assets
import Logo from "../../assets/Logo.png"
import Wallet from "../../assets/Wallet.png"

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
                    <li className={styles.header__menu__list__item}><a href="/">About</a></li>
                    <li className={styles.header__menu__list__item}><a href="/">Mint</a></li>
                    <li className={styles.header__menu__list__item}><a href="/">Team</a></li>
                </ul>
                <div className={styles.header__menu__wallet}>
                    <span className={styles.header__menu__wallet__name}>0xe76d...B9ED</span>
                    <img
                        className={styles.header__menu__wallet__icon}
                        src={Wallet}
                        alt="Icon"
                    />
                </div>
            </div>
        </header>
    )
}

export default Header