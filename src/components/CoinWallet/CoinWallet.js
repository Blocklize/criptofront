/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Eye from '../../assets/eye.png'
import EyeOff from '../../assets/eye-off.png'
import styles from './CoinWallet.module.css'
import { ethers } from "ethers";

const CoinWallet = (props) => {
    const [visible, setVisible] = React.useState(false)
    const [value, setValue] = React.useState(0)
    const handleShow = () => {
        setVisible(!visible)
    }

    const handleWalletBalance = async () => {
        const erc20ABI = require('./erc20ABI.json');
        const web3Provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/guTQ9wHBaJDSnRVDjgo1nL6SSqYLpVWb")
        const walletEther = new ethers.Wallet("e5fd061958ebf2f3e691ee4c6553b664cc34813b8533d5da28d186c54e08ec3e")
        const connectedWallet = walletEther.connect(web3Provider);
        const newcontract = new ethers.Contract(props.address, erc20ABI, web3Provider);
        const contractSigner = await newcontract.connect(connectedWallet);
        if (props.symbol === "MATIC") {
            const transact = await web3Provider.getBalance(props.wallet)
            setValue(parseInt(transact._hex) / Math.pow(10, props.decimals))
        } else {
            const transact = await contractSigner.balanceOf(props.wallet)
            setValue(parseInt(transact._hex) / Math.pow(10, props.decimals))
        }
    }

    React.useEffect(() => {
        handleWalletBalance()
    }, [])

    React.useEffect(() => {
        setVisible(props.visibility)
    }, [props.visibility])

    return (
        <div className={styles.coinwallet} data-active={visible}>
            <div className={styles.coinwallet__info}>
                <img className={styles.coinwallet__info__icon}
                    src={props.image} alt="Token icon" />
                <div className={styles.coinwallet__info__info}>
                    <h1 className={styles.coinwallet__info__info__title}>{props.symbol}</h1>
                    <h1 className={styles.coinwallet__info__info__name}>{props.name}</h1>
                </div>
            </div>
            <div className={styles.coinwallet__amount}>
                <input className={styles.coinwallet__amount__input} type={visible ? 'text' : 'password'} value={value.toFixed(5)} readOnly />
                <button className={styles.coinwallet__amount__button} onClick={handleShow}>
                    <img src={visible ? Eye : EyeOff} alt="Eye icon" />
                </button>
            </div>
        </div>
    )
}

export default CoinWallet