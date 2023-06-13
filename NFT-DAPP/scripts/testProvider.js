async function testProvider() {
    let provider = ethers.provider

    console.log("Get the network the provider is connected to: ", await provider.getNetwork())

    console.log(
        "Get balance of any account: ",
        await provider.getBalance("0xB1b504848e1a5e90aEAA1D03A06ECEee55562803")
    )

    console.log(
        "Balance in ETH: ",
        ethers.utils.formatEther(
            await provider.getBalance("0xB1b504848e1a5e90aEAA1D03A06ECEee55562803")
        )
    )

    console.log("Block Number of most recently mined block: ", await provider.getBlockNumber())

    console.log("Get current fee data: ", await provider.getFeeData())
}

testProvider()
