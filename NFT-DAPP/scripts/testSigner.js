async function testSigner() {
    let provider = ethers.provider
    let signer = await ethers.getSigners()
    let account2Address = "0x46f98920c5896eff11bb90d784d6d6001d74c073"

    console.log("Signer address: ", await signer.getAddress())
    console.log("Balance: ", await signer.getBalance())

    console.log(
        "Balance before sending 0.1 ETH: ",
        ethers.utils.formatEther(await provider.getBalance(account2Address))
    )

    txnParams = {
        to: account2Address,
        value: ethers.utils.parseEther("0.1"),
    }

    txn = await signer.sendTransaction(txnParams)
    txnReceipt = await txn.wait()

    console.log(
        "Balance after sending 0.1 ETH: ",
        ethers.utils.formatEther(await provider.getBalance(account2Address))
    )
}

testSigner()
