
import React from 'react'
// CSS
import "./Steps.css"
// Components
import InputBRL from '../InputBRL/InputBRL'
import InputCoin from '../InputCoin/InputCoin'
import Summary from '../Summary/Summary'

const StepA = () => {
    // Animation
    const entranceConfig = {
        animation: "entrance .5s ease-out"
    }
    // States
    const [price, setPrice] = React.useState(0)
    const [payoff, setPayoff] = React.useState(() => {
        const getItem = localStorage.getItem("buyValue")
        return getItem ? getItem : 0
    })

    // Functions
    const handleConversion = (e) => {
        const number = +(e.target.value.replaceAll(".", "").replace(",", "."))
        setPayoff(number)
        setPrice((number * 0.00015).toFixed(5))
    }

    React.useEffect(() => {
        setPrice((payoff * 0.00015).toFixed(5))
    }, [payoff])

    return (
        <div style={entranceConfig}>
            <InputBRL name="buyValue" label="Escolha o valor" onChange={handleConversion} value={payoff} />
            <InputCoin name="buyValue" label="Após a compra você receberá" distance="1rem" value={price} />
            <Summary coin="ETH" price={payoff} distance="1rem" />
        </div>
    )
}

export default StepA