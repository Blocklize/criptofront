/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './TokenSelector.module.css'
import TokenContext from '../../../../contexts/TokenContext'
import SelectorContext from '../../../../contexts/SelectorContext'
import { acceptedTokens } from '../../../../data/acceptedTokens'

const TokenSelector = () => {
    // Contexts
    const { setToken } = React.useContext(TokenContext)
    // States
    const [tokens, setTokens] = React.useState([])
    const { isOpen, setIsOpen } = React.useContext(SelectorContext)
    // Functions
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

    const handleState = () => {
        setIsOpen(!isOpen)
    }

    const handleClick = (e) => {
        const tokenData = {
            TokenLogo: e.target.attributes.getNamedItem('data-logo').value,
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
                        data-logo={token.logoURI}
                        data-symbol={token.symbol}
                        data-address={token.address}
                        key={token.symbol}
                        onClick={handleClick}>
                        <img className={styles.tokenSelector__item__icon}
                            src={token.logoURI}
                            alt="Coin icon" />
                        <span className={styles.tokenSelector__item__name}>{token.symbol}</span>
                    </li>
                )))}
            </ul>
        </div>
    )
}

export default TokenSelector