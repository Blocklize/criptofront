/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './Profile.module.css'
import UserContext from '../../contexts/UserContext'
import DataShow from '../../components/DataShow/DataShow'
import SimpleButton from '../../components/SimpleButton/SimpleButton'
import WalletContext from '../../contexts/WalletContext'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Navigate } from 'react-router-dom'
import CoinWallet from '../../components/CoinWallet/CoinWallet'

const Profile = () => {
    const { user, setUser } = React.useContext(UserContext)
    const { connected, setConnected } = React.useContext(WalletContext)
    const [tokens, setTokens] = React.useState([])

    const acceptedTokens = [
        "SUSHI", "ROUTE", "WBTC",
        "CRV", "OCEAN", "AVAX",
        "LINK", "GRT", "AXS",
        "MKR", "SHIB", "WETH",
        "COMP", "DAI", "1INCH",
        "MANA", "MATIC", "GNS",
        "AAVE", "UNI", "USDT",
        "MATIC", "SUPER", "ETH"
    ]

    const handleDisconnect = () => {
        setUser({})
        setConnected(false)
        localStorage.clear()
    }

    const handleTokens = async () => {
        await fetch('https://api.1inch.io/v4.0/137/tokens')
            .then(resp => resp.json())
            .then(json => {
                const strJson = Object.values(json.tokens)
                const mappedItems = []
                strJson.forEach(item => {
                    if (acceptedTokens.includes(item.symbol)) mappedItems.push(item)
                })
                function compare(a, b) {
                    if (a.symbol < b.symbol)
                        return -1;
                    if (a.symbol > b.symbol)
                        return 1;
                    return 0;
                }
                mappedItems.sort(compare);
                setTokens(mappedItems)
            })
            .catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        handleTokens()
    }, [])

    if (!connected) return (<Navigate to='/' />)

    return (
        <div className={styles.profile}>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-3 d-flex justify-content-lg-end">
                    <div className={styles.profile__data}>
                        <div className={styles.profile__data__picture}>
                            <Jazzicon diameter="266" seed={jsNumberForAddress((localStorage.getItem("Address") || user.Address))} />
                        </div>
                        <DataShow id="name" label="Nome" info={user.Name} />
                        <DataShow id="email" label="E-mail" info={user.Email} />
                        <DataShow id="address" label="Endereço da carteira" info={user.Address} />
                        <DataShow id="cpf" label="CPF" info={user.CPF} />
                        <SimpleButton text="Fazer logout" onClick={handleDisconnect} />
                    </div>
                </div>
                <div className="col-lg-5 position-relative">
                    <div className={styles.profile__wallets}>
                        <h1 className={styles.profile__wallets__title}>Extrato da carteira</h1>
                        <div className={styles.profile__wallets__body}>
                            {
                                tokens.map(t => (
                                    <CoinWallet
                                        key={t.symbol}
                                        symbol={t.symbol}
                                        name={t.name}
                                        address={t.address}
                                        image={t.logoURI}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile