import React from 'react'
import styles from './Wallet.module.css'
// import Icon from "../../assets/Wallet.png"
import { ethers } from "ethers";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

const Wallet = () => {
    // States
    const [connected, setConnected] = React.useState("")
    const [walletAdress, setWalletAdress] = React.useState("")
    const [metamask, setMetamask] = React.useState("")

    // Refs
    const walletInfo = React.useRef(null)

    // Effects
    React.useEffect(() => {
        window.ethereum ? setMetamask(true) : setMetamask(false)
    }, [])

    // EthersJS
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    // Functions
    const minimizeAddress = (address) => {
        const sliceOne = address.slice(0, 8);
        const sliceTwo = address.slice(-4)
        return `${sliceOne}...${sliceTwo}`
    }

    const handleConnectWallet = async () => {
        await provider.send("eth_requestAccounts", [])
        const address = await signer.getAddress()
        setWalletAdress(minimizeAddress(address))
        setConnected(true)
    }

    // Returns
    if (metamask) {
        // If the wallet is connected
        if (connected) {
            return (
                <div ref={walletInfo} className={styles.header__menu__wallet}>
                    <span className={styles.header__menu__wallet__name}>{walletAdress}</span>
                    <Jazzicon diameter="30" seed={jsNumberForAddress(walletAdress)} />
                </div>
            )
        } else {
            return (
                <button onClick={handleConnectWallet} className={styles.header__menu__button}>
                    Conectar carteira
                </button>
            )
        }
    } else {
        const metamaskLink = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        const getMetamaskExtension = () => {
            window.open(metamaskLink)
        }
        return (
            <button onClick={getMetamaskExtension} className={styles.header__menu__button}>
                Instalar Metamask
            </button>
        )
    }
}

export default Wallet