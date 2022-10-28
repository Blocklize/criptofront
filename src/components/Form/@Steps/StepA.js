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
    const [token, setToken] = React.useState({
        TokenSymbol: "AVAX",
        TokenAddress: "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b"
    })

    const [isOpen, setIsOpen] = React.useState(true)

    // Animation
    const entranceConfig = {
        animation: "entrance .5s ease-out"
    }
    // States
    const [last, setLast] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const [payoff, setPayoff] = React.useState(() => {
        const getItem = localStorage.getItem("buyValue")
        return getItem ? getItem : 0
    })

    // Functions
    const handleConversion = async (e) => {
        const number = +(e.target.value.replaceAll(".", "").replace(",", "."))
        throttle(getFee(number), 500)
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
                'X-Parse-Application-Id': 'mpxuNMEJnSlytSS75jhHdt4O3bCpxgRr6glWHnKw',
                'X-Parse-REST-API-Key': 'Spj9NomBOJYsPp2Dh4QFfKjcKIDXOYUhqCONK7AH',
                'Content-Type': 'application/json'
            },
            body: data
        }
        await fetch('https://parseapi.back4app.com/functions/calcularTaxaTokens', config)
            .then((response) => response.json())
            .then((json) => {
                setPrice((json.result / Math.pow(10, 18)).toFixed(5))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const throttle = (cb, delay) => {
        return (...args) => {
            const now = new Date().getTime()
            if (now - last < delay) {
                return
            }
            setLast(now)
            return cb(...args)
        }
    }

    React.useEffect(() => {
        const number = localStorage.getItem("buyValue")
        throttle(getFee(number), 500)
    }, [payoff, throttle])

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <div style={entranceConfig}>
                <InputBRL name="buyValue" label="Escolha o valor" onChange={handleConversion} value={payoff} />
                <SelectorContext.Provider value={{ isOpen, setIsOpen }}>
                    <InputCoin name="buyValue" label="Após a compra você receberá" distance="1rem" value={price} />
                </SelectorContext.Provider>
                <Summary coin={token.TokenSymbol} price={payoff} distance="1rem" />
            </div>
        </TokenContext.Provider>
    )
}

export default StepA