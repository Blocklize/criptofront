/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './TokenSelector.module.css'
import TokenContext from '../../../../contexts/TokenContext'
import SelectorContext from '../../../../contexts/SelectorContext'

const TokenSelector = () => {
    // Contexts
    const { setToken } = React.useContext(TokenContext)
    // States
    const [tokens, setTokens] = React.useState([])
    const { isOpen, setIsOpen } = React.useContext(SelectorContext)

    const config = {
        method: 'post',
        headers: {
            'X-Parse-Application-Id': 'mpxuNMEJnSlytSS75jhHdt4O3bCpxgRr6glWHnKw',
            'X-Parse-REST-API-Key': 'Spj9NomBOJYsPp2Dh4QFfKjcKIDXOYUhqCONK7AH',
            'Content-Type': 'application/json'
        }
    }

    const handleTokens = async () => {
        await fetch('https://parseapi.back4app.com/functions/seeTokenPools', config)
            .then(resp => resp.json())
            .then(json => {
                setTokens(json.result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleState = () => {
        setIsOpen(!isOpen)
    }

    const handleClick = (e) => {
        const tokenData = {
            TokenSymbol: e.target.attributes.getNamedItem('data-symbol').value,
            TokenAddress: e.target.attributes.getNamedItem('data-address').value,
        }
        setToken(tokenData)
        handleState()
    }

    React.useEffect(() => {
        handleTokens()
    }, [])

    return (
        <div className={styles.container} disabled={isOpen}>
            <ul className={styles.tokenSelector}>
                {tokens.length === 0 && (<span className={styles.loading}>Carregando...</span>)}
                {tokens.length > 0 && (tokens.map(token => (
                    <li className={styles.tokenSelector__item}
                        data-symbol={token.TokenSymbol}
                        data-address={token.TokenAddress}
                        key={token.TokenSymbol}
                        onClick={handleClick}>
                        <img className={styles.tokenSelector__item__icon}
                            src={require(`../../../../assets/icons/${token.TokenSymbol}.png`)}
                            alt="Coin icon" />
                        <span className={styles.tokenSelector__item__name}>{token.TokenSymbol}</span>
                    </li>
                )))}
            </ul>
        </div>
    )
}

export default TokenSelector