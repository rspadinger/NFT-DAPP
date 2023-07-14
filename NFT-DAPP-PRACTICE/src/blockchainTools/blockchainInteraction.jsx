import { ethers } from "ethers"
import { pinJSONToIPFS } from "./pinata"
import contractJson from "../MyNFT.json"

const { VITE_CONTRACT_ADDRESS, VITE_CONTRACT_ADDRESS_LOCAL, VITE_PRIVATE_KEY } = import.meta.env

let provider, signer, contractAddress, contract, selectedAddress

async function init() {
    //TODO make sure, MetaMask is installed and the global variable "ethereum" is available
    if (false) {
        //TODO create a Web3 provider
        //provider = ...

        const currentNetwork = await provider.getNetwork()

        if (currentNetwork.chainId.toString().includes(1337)) {
            contractAddress = VITE_CONTRACT_ADDRESS_LOCAL
        } else {
            contractAddress = VITE_CONTRACT_ADDRESS
        }

        // the following is not required for this example => only required if we want to call
        // a function directly on a contract instance
        signer = new ethers.Wallet(VITE_PRIVATE_KEY, provider)
        contract = new ethers.Contract(contractAddress, contractJson.abi, signer)
    }
}

await init()

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            //TODO retrieve all MetaMask accounts that have already been connected with this DApp (eth_accounts) :
            //const addressArray = ...

            if (addressArray.length > 0) {
                selectedAddress = addressArray[0]
                return {
                    address: selectedAddress,
                    status: "👆🏽 Provide an image url, a name and a description for your NFT.",
                }
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                }
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            }
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://metamask.io/download.html`}
                        >
                            You must install Metamask, a virtual Ethereum wallet, in your browser.
                        </a>
                    </p>
                </span>
            ),
        }
    }
}

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            //TODO ask MetaMask to display all accounts in a popup,
            //so that you can choose which ones you want to connect with this DApp (eth_requestAccounts) :
            //const addressArray = ...

            if (addressArray.length > 0) {
                selectedAddress = addressArray[0]
                return {
                    address: selectedAddress,
                    status: "👆🏽 Provide an image url, a name and a description for your NFT.",
                }
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                }
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            }
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://metamask.io/download.html`}
                        >
                            You must install Metamask, a virtual Ethereum wallet, in your browser.
                        </a>
                    </p>
                </span>
            ),
        }
    }
}

//image: https://gateway.pinata.cloud/ipfs/QmcSM8rxpnmknRu6HX9KWmqG4QJaBfijF3sZeuvSeDfNB7
export const mintNFT = async (name, description, imageUrl) => {
    if (name.trim() === "" || description.trim() === "" || imageUrl.trim() === "") {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }

    //https://docs.pinata.cloud/pinata-api/pinning/pin-json
    const metadata = {
        pinataMetadata: {
            name: "Cat NFT",
            keyvalues: {
                "some key": "some value",
            },
        },
        pinataContent: {
            name,
            description,
            image: imageUrl,
            attributes: [
                {
                    trait_type: "Fur",
                    value: "White",
                },
                {
                    trait_type: "Eye color",
                    value: "Blue",
                },
            ],
        },
    }

    const pinataResponse = await pinJSONToIPFS(metadata)
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    }

    const tokenURI = pinataResponse.pinataUrl
    console.log(tokenURI)

    //TODO encode the function data for the "mintNFT" function :
    //const myData = ...

    //TODO create a transaction object with the following parameters: from (the currently selected wallet address in MetaMask),
    //to (our ERC721 contract) and data (encoded data for the mintNFT function call) :
    //const transactionParameters = { ... }

    try {
        //TODO send the transaction to MetaMask (eth_sendTransaction) :
        //const txHash = ...

        return {
            success: true,
            status: (
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                >
                    ✅ Check your transaction on Etherscan
                </a>
            ),
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message,
        }
    }
}
