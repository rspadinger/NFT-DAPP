import { useEffect, useState } from "react"
import {
    connectWallet,
    getCurrentWalletConnected,
    mintNFT,
} from "./blockchainTools/blockchainInteraction"

const NFTDAPP = () => {
    const [walletAddress, setWallet] = useState("")
    const [status, setStatus] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [url, setURL] = useState("")

    useEffect(() => {
        async function init() {
            const { address, status } = await getCurrentWalletConnected()
            setWallet(address)
            setStatus(status)
            addWalletListener()
        }
        init()
    }, [])

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0])
                    setStatus("👆🏽 Provide an image url, a name and a description for your NFT.")
                } else {
                    setWallet("")
                    setStatus("🦊 Connect to Metamask using the top right button.")
                }
            })
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                        You must install Metamask, a virtual Ethereum wallet, in your browser.
                    </a>
                </p>
            )
        }
    }

    const connectWalletPressed = async () => {
        const { address, status } = await connectWallet()
        setStatus(status)
        setWallet(address)
    }

    const onMintPressed = async () => {
        const { status } = await mintNFT(name, description, url)
        setStatus(status)
    }

    return (
        <div id="container">
            <h1>NFT DAPP</h1>
            <button id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                ) : (
                    <span>Connect Wallet</span>
                )}
            </button>
            <br></br>
            <form>
                <h2>🔗 NFT Image URL: </h2>
                <input
                    type="text"
                    placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
                    onChange={(e) => setURL(e.target.value)}
                />
                <h2>🐵 NFT Name: </h2>
                <input
                    type="text"
                    placeholder="The name of your NFT..."
                    onChange={(e) => setName(e.target.value)}
                />
                <h2>✏️ NFT Description: </h2>
                <input
                    type="text"
                    placeholder="Some details about your NFT..."
                    onChange={(e) => setDescription(e.target.value)}
                />
            </form>
            <button id="mintButton" onClick={onMintPressed}>
                Mint NFT
            </button>
            <p id="status">{status}</p>
        </div>
    )
}

export default NFTDAPP
