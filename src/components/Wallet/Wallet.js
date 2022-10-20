import React from 'react'
import { ethers } from "ethers";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
// CSS
import styles from './Wallet.module.css'


const Wallet = () => {
    // States
    const [metamask, setMetamask] = React.useState("")
    const [connected, setConnected] = React.useState("")
    const [requested, setRequested] = React.useState(false)
    const [walletAdress, setWalletAdress] = React.useState("")

    // Refs
    const walletInfo = React.useRef(null)

    // Effects
    React.useEffect(() => {
        window.ethereum ? setMetamask(true) : setMetamask(false)
    }, [])

    // Returns
    if (metamask) {
        // If the wallet is connected
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
            waitingExtensionResponse()
            await provider.send("eth_requestAccounts", [])
            const address = await signer.getAddress()
            setWalletAdress(minimizeAddress(address))
            setConnected(true)
        }

        const waitingExtensionResponse = () => {
            setRequested(true)
            setTimeout(() => {
                setRequested(false)
            }, 15000);
        }

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
                    {requested === true ? "Aguardando extensão" : "Conectar carteira"}
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