/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// CSS
import "./Steps.css";
// Components
import InputBRL from "../InputBRL/InputBRL";
import InputCoin from "../InputCoin/InputCoin";
import Summary from "../Summary/Summary";
// Contexts
import TokenContext from "../../../contexts/TokenContext";
import SelectorContext from "../../../contexts/SelectorContext";
import { ethers } from "ethers";

const StepA = () => {
  // Context
  const { token } = React.useContext(TokenContext);
  // State
  const [isOpen, setIsOpen] = React.useState(true);

  // Animation
  const entranceConfig = {
    animation: "entrance .5s ease-out",
  };
  // States
  const [tax, setTax] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [gasFee, setGasFee] = React.useState(0);
  const [counter, setCounter] = React.useState(30);
  const [asyncFee, setAsyncFee] = React.useState(0);
  const [valuation, setValuation] = React.useState(0);
  const [payoff, setPayoff] = React.useState(() => {
    const getItem = localStorage.getItem("buyValue");
    return getItem ? getItem : 0;
  });

  // Constant
  const mainToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

  // Functions
  const handleConversion = async (e) => {
    const number = +e.target.value.replaceAll(".", "").replace(",", ".");
    setPayoff(number);
    getFee(number);
  };

  const handleBinance = async (amount, tokenAddress) => {
    let MATIC;
    await fetch(
      `https://api.1inch.io/v4.0/137/quote?fromTokenAddress=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&toTokenAddress=${tokenAddress}&amount=${amount}`
    )
      .then((response) => response.json())
      .then((json) => {
        MATIC = json.toTokenAmount;
      })
      .catch((error) => {
        MATIC = 0;
        throw error;
      });
    return MATIC;
  };

  const handleGasFee = async () => {
    const web3Provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mainnet.g.alchemy.com/v2/guTQ9wHBaJDSnRVDjgo1nL6SSqYLpVWb"
    );
    const feeData = await web3Provider.getGasPrice();
    let gasUsed = 200;
    let finalGasUsedPriced = parseInt(feeData) * gasUsed * 1.3;
    let MATIC = await handleBinance(
      "1000000",
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
    );
    let MaticResult = finalGasUsedPriced / parseInt(MATIC);
    await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then((resp) => resp.json())
      .then((json) => {
        let dollarValue = parseFloat(json.USDBRL.bid);
        let valorFinal = MaticResult * dollarValue;
        MATIC = valorFinal + 0.2;
      })
      .catch(() => {
        MATIC = 0;
      });
    return MATIC;
  };

  const getFee = (number) => {
    let value = number;
    let taxValue = 0;
    taxValue += number * 0.017;
    if (number > 62.5) taxValue += number * 0.008;
    else taxValue += 0.5;
    if (value >= 20) {
      setTax(taxValue);
      setGasFee(asyncFee);
    } else {
      setTax(0);
      setGasFee(0);
    }

    value -= taxValue;
    if ((value / valuation).toFixed(5) < 0) value = 0;
    setPrice((value / valuation).toFixed(5));
  };

  // Essa função retorna o valor do token em reais inflacionado.
  const getValuation = async () => {
    await fetch(
      `https://api.1inch.io/v4.0/137/quote?fromTokenAddress=${mainToken}&toTokenAddress=${
        token.TokenAddress
      }&amount=${1000000}`
    )
      .then((res) => res.json())
      .then(async (json) => {
        const tokenAmountForValue =
          json.toTokenAmount / Math.pow(10, json.toToken.decimals);
        await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
          .then((resp) => resp.json())
          .then((json) => {
            let value = json.USDBRL.bid * 1.003 * (1 / tokenAmountForValue);
            value += value * 0.01; // Inflação de 1%
            setValuation(value);
          })
          .catch(() => {
            setValuation(0);
          });
      })
      .catch(() => {
        setValuation(0);
      });
  };

  React.useEffect(() => {
    if (localStorage.getItem("buyValue") >= 20) {
      setGasFee(asyncFee)
    }
  }, [asyncFee])

  React.useEffect(() => {
    (async () => {
      setAsyncFee(await handleGasFee());
    })();
    setInterval(() => {
      (async () => {
        setAsyncFee(await handleGasFee());
      })();
    }, 30000);
  }, []);

  React.useEffect(() => {
    const number = localStorage.getItem("buyValue");
    getValuation();
    getFee(number);
  }, [token, valuation]);

  // Counter
  React.useEffect(() => {
    setTimeout(() => {
      if (counter === 0) {
        getValuation();
        setTimeout(() => {
          setCounter(30);
        }, 1000);
      } else setCounter(counter - 1);
    }, 1000);
  }, [counter]);

  return (
    <div style={entranceConfig}>
      <InputBRL
        name="buyValue"
        label="Escolha o valor"
        onChange={handleConversion}
        value={payoff}
      />
      <SelectorContext.Provider value={{ isOpen, setIsOpen }}>
        <InputCoin
          name="buyValue"
          label="Após a compra você receberá"
          distance="1rem"
          value={price}
          reload={counter}
        />
      </SelectorContext.Provider>
      <Summary
        coin={token.TokenSymbol}
        gas={gasFee}
        tax={tax}
        price={valuation}
        distance="1rem"
      />
    </div>
  );
};

export default StepA;
