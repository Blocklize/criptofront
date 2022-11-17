import React from 'react'
import { ethers } from "ethers";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
// CSS
import styles from './Wallet.module.css'
// Contexts
import WalletContext from '../../contexts/WalletContext';
import UserContext from '../../contexts/UserContext';


const Wallet = () => {
    // Context
    const { user, setUser } = React.useContext(UserContext)
    const { connected, setConnected } = React.useContext(WalletContext)
    // States
    const [metamask, setMetamask] = React.useState("")
    const [dropdown, setDropdown] = React.useState(null)
    const [requested, setRequested] = React.useState(false)

    // Refs
    const walletInfo = React.useRef(null)

    // Effects
    React.useEffect(() => {
        window.ethereum ? setMetamask(true) : setMetamask(false)
    }, [])

    // Functions
    const handleDropdown = () => {
        setDropdown(!dropdown)
    }

    const handleDisconnect = () => {
        setConnected(false)
        setRequested(false)
        localStorage.clear()
    }

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
            localStorage.setItem("Address", address)
            setTimeout(() => {
                setConnected(true)
            }, 1000);
        }

        const waitingExtensionResponse = () => {
            setRequested(true)
            setTimeout(() => {
                setRequested(false)
            }, 15000)
        }

        if (connected) {
            return (
                <div ref={walletInfo} className={styles.header__menu__wallet} data-enabled={dropdown} onClick={handleDropdown}>
                    <span className={styles.header__menu__wallet__name}>{minimizeAddress(localStorage.getItem("Address") || user.Address)}</span>
                    <Jazzicon diameter="30" seed={jsNumberForAddress(minimizeAddress(localStorage.getItem("Address") || user.Address))} />
                    <div className={styles.header__menu__wallet__dropdown}>
                        <ul className={styles.header__menu__wallet__dropdown__list}>
                            <li className={styles.header__menu__wallet__dropdown__list__item}>
                                Minha carteira
                            </li>
                            <li className={styles.header__menu__wallet__dropdown__list__item} onClick={handleDisconnect}>
                                Desconectar
                            </li>
                        </ul>
                    </div>
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
        const metamaskLink = "https://metamask.io/"
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