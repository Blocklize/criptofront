
import React from 'react'
// CSS
import "./Steps.css"
// Components
import InputBRL from '../InputBRL/InputBRL'
import InputCoin from '../InputCoin/InputCoin'
import Summary from '../Summary/Summary'

const StepA = () => {
    const entranceConfig = {
        animation: "entrance .5s ease-out"
    }

    return (
        <div style={entranceConfig}>
            <InputBRL name="buyValue" label="Escolha o valor" />
            <InputCoin name="buyValue" label="Após a compra você receberá" distance="1rem" />
            <Summary coin="ETH" price={6819.80} distance="1rem" />
        </div>
    )
}

export default StepA