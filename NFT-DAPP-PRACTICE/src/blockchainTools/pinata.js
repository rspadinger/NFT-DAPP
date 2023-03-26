const axios = require("axios")

const { REACT_APP_PINATA_KEY, REACT_APP_PINATA_SECRET } = process.env

export const pinJSONToIPFS = async (metadata) => {
    const data = JSON.stringify(metadata)
    const config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
            "Content-Type": "application/json",
            pinata_api_key: REACT_APP_PINATA_KEY,
            pinata_secret_api_key: REACT_APP_PINATA_SECRET,
        },
        data: data,
    }

    try {
        const res = await axios(config)
        return {
            success: true,
            pinataUrl: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
        }
    }
}
