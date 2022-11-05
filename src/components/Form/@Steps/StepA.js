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
    const [valuation, setValuation] = React.useState(0)
    const [payoff, setPayoff] = React.useState(() => {
        const getItem = localStorage.getItem("buyValue")
        return getItem ? getItem : 0
    })

    // Constant
    const mainToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"

    // Functions
    const handleConversion = async (e) => {
        const number = +(e.target.value.replaceAll(".", "").replace(",", "."))
        getFee(number)
        setPayoff(number)
    }

    const getFee = async (number) => { // Função recebe o valor digitado
        // Inflações
        let value = number // Definindo a variável value sendo igual ao valor digitado
        value -= number * .010 // Subtraindo do valor digitado a inflação do token
        value -= number * .017 // Subtraindo do valor digitado a taxa de processamento
        if (number > 62.5) value -= number * .008 // Subtraindo do valor digitado a taxa complexa
        else value -= 0.5 // Subtraindo do valor digitado a taxa fixa

        // Taxa de processamento
        let taxValue  = 0 // Iniciando cálculo da taxa
        taxValue += number * .010 // Adicionando ao total da taxa o valor da inflação do token
        taxValue += number * .017 // Adicionando ao total da taxa o valor da taxa de processamento
        if (number > 62.5) taxValue += number * .008 // Adicionando ao total da taxa o valor da taxa complexa
        else taxValue += 0.5 // Adicionando ao total da taxa o valor da taxa fixa
        setTax(taxValue) // Setando a taxa de processamento variável

        // Requisições
        await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL') // Obter o bid USD - BRL
            .then(resp => resp.json()) // Converter a resposta para json
            .then(async json => { // Obtendo a resposta em json
                let usdPayoff = value / json.USDBRL.bid // Convertendo o valor inflacionado para dólares
                usdPayoff = ~~(usdPayoff * Math.pow(10, 6)) // Transformando o valor em doláres em uma number string
                await fetch(`https://api.1inch.io/v4.0/137/quote?fromTokenAddress=${mainToken}&toTokenAddress=${token.TokenAddress}&amount=${usdPayoff}`) // Obtendo o valor do token
                    .then(res => res.json()) // Convertendo a resposta para json
                    .then(json => {
                        const amount = (json.toTokenAmount / Math.pow(10, json.toToken.decimals)) // Convertendo o token para casas decimais
                        setPrice(amount.toFixed(5)) // Setando o valor do token
                        setGasFee(.20) // Setando a taxa de gás da rede
                    })
                    .catch(error => {
                        console.log(error)
                        setPrice(0)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getValuation = async () => {
        await fetch(`https://api.1inch.io/v4.0/137/quote?fromTokenAddress=${mainToken}&toTokenAddress=${token.TokenAddress}&amount=${1000000}`)
            .then(res => res.json())
            .then(async json => {
                const tokenAmountForValue = (json.toTokenAmount / Math.pow(10, json.toToken.decimals))
                await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
                    .then(resp => resp.json())
                    .then(json => {
                        let value = json.USDBRL.bid * (1 / tokenAmountForValue)
                        value += value * 0.010 // Inflação de 1%
                        value += value * 0.017 // Taxa de processamento simples
                        value += 0.502
                        setValuation(value)
                    })
                    .catch(error => {
                        console.log(error)
                        setValuation(0)
                    })
            })
            .catch(error => {
                console.log(error)
                setValuation(0)
            })
    }

    React.useEffect(() => {
        const number = localStorage.getItem("buyValue")
        getValuation()
        getFee(number)
    }, [token])

    return (
        <div style={entranceConfig}>
            <InputBRL name="buyValue" label="Escolha o valor" onChange={handleConversion} value={payoff} />
            <SelectorContext.Provider value={{ isOpen, setIsOpen }}>
                <InputCoin name="buyValue" label="Após a compra você receberá" distance="1rem" value={price} />
            </SelectorContext.Provider>
            <Summary coin={token.TokenSymbol} gas={gasFee} tax={tax} price={valuation} distance="1rem" />
        </div>
    )
}

export default StepA