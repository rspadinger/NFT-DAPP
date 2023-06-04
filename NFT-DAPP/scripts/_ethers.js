const { VITE_ALCHEMY_API_KEY, VITE_CONTRACT_ADDRESS, VITE_CONTRACT_ADDRESS_LOCAL } = process.env

let provider, network, signer, txnParams, txn, txnReceipt
const contractJson = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")

async function main() {
    // 1: get the provider from Hardhat
    provider = await ethers.provider
    console.log("Network details: ", await provider.getNetwork())
    console.log("Block Number of most recently mined block: ", await provider.getBlockNumber())
    console.log("Get current fee data: ", await provider.getFeeData())
    console.log(
        "Get balance of any account: ",
        await provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    )

    // 2 : if we use a local blockchain like Ganache or Hardhat, we can also directly use a JsonRpcProvider
    //if no connectionInfo is provided, "http://localhost:8545" is used
    //provider = new ethers.providers.JsonRpcProvider()
    //console.log("Network details: ", await provider.getNetwork())

    // 3 : use a third party provider
    //if we want to connect to a remote blockchain, it is recommended to use a third party provider
    //provider = new ethers.providers.AlchemyProvider("mainnet", VITE_ALCHEMY_API_KEY)
    //console.log("Network details: ", await provider.getNetwork())

    // 4 : for DApp's (web application), use a web3Provider => this won't work here!
    //provider = new ethers.providers.Web3Provider(window.ethereum)
    //console.log("Network details: ", await provider.getNetwork())

    // ***************************** SIGNERS *********************************
    ;[signer] = await ethers.getSigners()
    //signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider)

    console.log("Signer address: ", await signer.getAddress())
    console.log("Balance: ", await signer.getBalance())

    // send a transaction
    let account2Address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    txnParams = {
        to: account2Address,
        value: ethers.utils.parseEther("10"), // ethers.BigNumber.from(10n * 10n ** 18n)
    }

    console.log(
        "Balance before send 10 ETH transfer: ",
        ethers.utils.formatEther(await provider.getBalance(account2Address))
    )

    txn = await signer.sendTransaction(txnParams)
    txnReceipt = await txn.wait()

    console.log(
        "Balance after send 10 ETH transfer: ",
        ethers.utils.formatEther(await provider.getBalance(account2Address))
    )

    // ***************************** CONTRACT *********************************

    contract = await ethers.getContractAt("MyNFT", VITE_CONTRACT_ADDRESS_LOCAL)
    //contract = new ethers.Contract(VITE_CONTRACT_ADDRESS, contractJson.abi, signer)

    // message call for read-only function
    const tokenSymbol = await contract.symbol()
    console.log("The token symbol is: " + tokenSymbol)

    // send a transaction for a write function
    txn = await contract.mintNFT(account2Address, "")
    txnReceipt = await txn.wait()
    console.log("NFT balance of recipient: " + (await contract.balanceOf(account2Address)))

    // ***************************** UTILS *********************************

    // utils.Interface
    let ifaceMintNFT = new ethers.utils.Interface([
        "function mintNFT(address recipient, string memory tokenURI)",
    ])
    let ifaceCompleteABI = new ethers.utils.Interface(contractJson.abi)

    encodedFunction = ifaceMintNFT.encodeFunctionData("mintNFT", [account2Address, ""])

    txnParams = {
        to: VITE_CONTRACT_ADDRESS_LOCAL,
        data: encodedFunction,
    }

    console.log(
        "NFT balance of recipient before token mint: " + (await contract.balanceOf(account2Address))
    )

    txn = await signer.sendTransaction(txnParams)
    txnReceipt = await txn.wait()

    console.log(
        "NFT balance of recipient after token mint: " + (await contract.balanceOf(account2Address))
    )

    // BigNumber
    let bn1 = ethers.BigNumber.from("1000000000000000000")
    console.log("1 ETH in Wei: ", bn1)
    console.log("Get hex string from BN1: ", bn1.toHexString())

    // Convert between ETH units
    const oneEthInGwei = ethers.BigNumber.from("1000000000000000000")
    console.log("Get number of ETH from 1 Gwei: ", ethers.utils.formatEther(oneEthInGwei))
    console.log("Get number of ETH as BN from a string: ", ethers.utils.parseEther("10"))

    // Hashing
    console.log("Keccak256 of hex array (aBytesLike): ", ethers.utils.keccak256([0x12, 0x34]))
    console.log("Keccak256 of hex string: ", ethers.utils.keccak256("0x1234"))
    console.log(
        "Get keccak258 of UTF8 byte array: ",
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("hello"))
    )
    //The following provides the same result:
    console.log("Use the id function to get the keccak256 of a string: ", ethers.utils.id("hello"))

    // Conversion between string and bytes
    console.log("Convert string to UTF8 byte array: ", ethers.utils.toUtf8Bytes("hello"))
    console.log(
        "Convert UTF8 byte array to string: ",
        ethers.utils.toUtf8String([104, 101, 108, 108, 111])
    )

    //User provides string data in frontend => convert to bytes32 => send to smart contract -
    //this is much cheaper than working with strings in smart contracts
    //If the length of the text below exceeds 31 bytes, it will throw an error.
    console.log(
        "Convert a string to a bytes32 hex string",
        ethers.utils.formatBytes32String("hello")
    )
    console.log(
        "Convert a bytes32 hex string to a string: ",
        ethers.utils.parseBytes32String(
            "0x68656c6c6f000000000000000000000000000000000000000000000000000000"
        )
    )

    console.log("Convert the number 1 to a data hex string: ", ethers.utils.hexlify(100000)) // '0x01'
}

main()
