/* eslint-disable react-hooks/exhaustive-deps */
// React
import React from 'react'
// Components
import CoinCard from '../CoinCard/CoinCard'
// CSS
import styles from './Carousel.module.css'
// Imports
import Chevron from '../../assets/chevron.png'
import Skeleton from './Skeleton/Skeleton'

const Carousel = () => {
    // Refs
    const carousel = React.useRef(null)
    const bar = React.useRef(null)

    // Math resources
    const ratio = (window.innerWidth / 1920 * 20)
    const distance = ratio * 19.5

    // States
    const [last, setLast] = React.useState(0)
    const [tokens, setTokens] = React.useState([])
    const [labels, setLabels] = React.useState("")
    const [counter, setCounter] = React.useState(30)
    const [scrolled, setScrolled] = React.useState(0)
    const [barLeft, setBarLeft] = React.useState("0")
    const [totalScroll, setTotalScroll] = React.useState("")
    const [scrollCounter, setScrollCounter] = React.useState(0)
    // Constant values
    const acceptedTokens = [
        "SUSHI", "ROUTE", "WBTC",
        "CRV", "OCEAN", "AVAX",
        "LINK", "GRT", "AXS",
        "MKR", "SHIB", "WETH",
        "COMP", "DAI", "1INCH",
        "MANA", "MATIC", "GNS",
        "AAVE", "UNI", "USDT",
        "MATIC", "SUPER", "ETH"
    ]

    React.useEffect(() => {
        const scrollOffset = carousel.current.scrollWidth - (2 * distance)
        setTotalScroll(scrollOffset)
        setLabels(Math.round(carousel.current.scrollWidth / distance))
    }, [distance, labels, tokens])

    // Throttle function prevent user multiple clicks
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

    // Left arrow click function handler
    const handleLeftClick = (e) => {
        e.preventDefault()
        carousel.current.scrollLeft -= distance
        setScrollCounter(scrollCounter - 1)
        setTimeout(() => {
            setScrolled(carousel.current.scrollLeft)
        }, 500)
    }

    // Right arrow click function handler
    const handleRightClick = (e) => {
        e.preventDefault()
        carousel.current.scrollLeft += distance
        setScrollCounter(scrollCounter + 1)
        setTimeout(() => {
            setScrolled(carousel.current.scrollLeft)
        }, 500)
    }

    // Labels setting
    React.useEffect(() => {
        setBarLeft(`${.9 * scrollCounter}rem`)
    }, [scrollCounter, tokens])

    let points = []
    for (let i = 0; i < labels; i++) {
        points.push(<div className={styles.carousel__labels__point} key={i}></div>)
    }

    // Counter
    React.useEffect(() => {
        setTimeout(() => {
            if (counter === 0) {
                setTokens([])
                setScrollCounter(0)
                setTotalScroll("")
                setScrolled(0)
                setTimeout(() => {
                    handleTokens()
                    setCounter(30)
                }, 1000);
            }
            else setCounter(counter - 1)
        }, 1000);
    }, [counter])

    // Cards

    const handleTokens = async () => {
        await fetch('https://api.1inch.io/v4.0/137/tokens')
            .then(resp => resp.json())
            .then(json => {
                const strJson = Object.values(json.tokens)
                const mappedItems = []
                strJson.forEach(item => {
                    if (acceptedTokens.includes(item.symbol)) mappedItems.push(item)
                })
                function compare(a, b) {
                    if (a.symbol < b.symbol)
                        return -1;
                    if (a.symbol > b.symbol)
                        return 1;
                    return 0;
                }
                mappedItems.sort(compare);
                setTokens(mappedItems)
            })
            .catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        handleTokens()
    }, [])

    // JSX
    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__counter}>
                <span className={styles.carousel__counter__text}>
                    Atualizando automaticamente em&nbsp;
                    <span>{counter}</span>s
                </span>
            </div>
            {tokens.length === 0 && (
                <div className={styles.carousel__body} ref={carousel}>
                    <Skeleton />
                    <Skeleton />
                </div>
            )}
            {tokens.length > 0 && (
                <div className={styles.carousel__body} ref={carousel}>
                    {tokens.map(t => (
                        <CoinCard
                            key={t.symbol}
                            symbol={t.symbol}
                            name={t.name}
                            address={t.address}
                            image={t.logoURI}
                        />
                    ))}
                </div>
            )}
            <div className={styles.carousel__buttons}>
                <button
                    className={styles.carousel__buttons__left}
                    disabled={scrolled === 0 ? true : false}
                    onClick={throttle(handleLeftClick, 500)}>
                    <img src={Chevron} alt="Carousel arrow" />
                </button>
                <button
                    className={styles.carousel__buttons__right}
                    disabled={scrolled > totalScroll ? true : false}
                    onClick={throttle(handleRightClick, 500)}>
                    <img src={Chevron} alt="Carousel arrow" />
                </button>
            </div>
            <div className={styles.carousel__labels}>
                <div
                    style={{ 'left': barLeft }}
                    className={styles.carousel__labels__bar}
                    ref={bar}
                ></div>
                {points}
            </div>
        </div>
    )
}

export default Carousel