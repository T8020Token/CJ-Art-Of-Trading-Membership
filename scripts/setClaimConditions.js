const { ThirdwebSDK } = require("@thirdweb-dev/sdk");

async function setClaimConditions() {
    const sdk = new ThirdwebSDK("polygon", {
        secretKey: "your-thirdweb-secret-key", // Get from Thirdweb dashboard
    });
    const contract = await sdk.getContract("your-contract-address", "nft-drop");

    const claimConditions = [
        {
            startTimestamp: 1746057600,
            maxClaimableSupply: "400000000",
            quantityLimitPerWallet: "10000",
            pricePerToken: "5000000000000000000", // 5 MATIC
            currency: "0x0000000000000000000000000000000000001010", // MATIC
            merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
        },
        {
            startTimestamp: 1746057605,
            maxClaimableSupply: "400000000",
            quantityLimitPerWallet: "10000",
            pricePerToken: "5000000000000000000",
            currency: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
            merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
        },
        {
            startTimestamp: 1746057610,
            maxClaimableSupply: "400000000",
            quantityLimitPerWallet: "10000",
            pricePerToken: "900000000000000000",
            currency: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
            merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
        },
    ];

    await contract.claimConditions.set(claimConditions);
    console.log("Claim conditions set successfully!");
}

setClaimConditions().catch(console.error);