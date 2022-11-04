/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
// CSS
import "./Steps.css"
// Components
import InputBRL from '../InputBRL/InputBRL'
import InputCoin from '../InputCoin/InputCoin'
import Summary from '../Summary/Summary'
// Contexts
import TokenContext from '../../../contexts/TokenContext'
import SelectorContext from '../../../contexts/SelectorContext'

const StepA = () => {
    // Context
    const { token } = React.useContext(TokenContext)
    // State
    const [isOpen, setIsOpen] = React.useState(true)

    // Animation
    const entranceConfig = {
        animation: "entrance .5s ease-out"
    }
    // States
    const [tax, setTax] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const [gasFee, setGasFee] = React.useState(0)
    const [payoff, setPayoff] = React.useState(() => {
        const getItem = localStorage.getItem("buyValue")
        return getItem ? getItem : 0
    })

    // Functions
    const handleConversion = async (e) => {
        const number = +(e.target.value.replaceAll(".", "").replace(",", "."))
        getFee(number)
        setPayoff(number)
    }

    const getFee = async (number) => {
        var data = JSON.stringify({
            "amount": number,
            "tokenAddress": token.TokenAddress
        })
        var config = {
            method: 'post',
            headers: {
                'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
                'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
                'Content-Type': 'application/json'
            },
            body: data
        }
        await fetch('https://parseapi.back4app.com/functions/calcularTaxaTokens', config)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setTax(json.result.taxPrice)
                setGasFee(json.result.gasPrice)
                setPrice((json.result.tokensAmount[0] / Math.pow(10, 18)).toFixed(5))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        const number = localStorage.getItem("buyValue")
        getFee(number)
    }, [token])

    return (
        <div style={entranceConfig}>
            <InputBRL name="buyValue" label="Escolha o valor" onChange={handleConversion} value={payoff} />
            <SelectorContext.Provider value={{ isOpen, setIsOpen }}>
                <InputCoin name="buyValue" label="Após a compra você receberá" distance="1rem" value={price} />
            </SelectorContext.Provider>
            <Summary coin={token.TokenSymbol} gas={gasFee} tax={tax} price={payoff} distance="1rem" />
        </div>
    )
}

export default StepA