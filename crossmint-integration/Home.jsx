import { useState } from "react";
import { CrossmintProvider, CrossmintHostedCheckout } from "@crossmint/client-sdk-react-ui";

export default function Home() {
    const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_API_KEY;
    const [quantity, setQuantity] = useState(1);

    if (!clientApiKey) {
        return (
            <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                <h1>Error: Crossmint API Key Missing</h1>
                <p>Please set NEXT_PUBLIC_CLIENT_API_KEY in .env.local</p>
            </div>
        );
    }

    // Ensure quantity is between 1 and 10 (adjust max as needed)
    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
        setQuantity(value);
    };

    // Debug logging
    console.log("Crossmint Config:", {
        clientApiKey: clientApiKey ? "Set" : "Missing",
        collectionLocator: "crossmint:94cf1fce-490d-412e-9546-0d7079bad26e",
        quantity,
        totalPrice: (quantity * 5).toString(),
        tokenId: 0
    });

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Select Number of Membership Tokens</h2>
            <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max="10"
                style={{ margin: '10px', padding: '5px', width: '100px' }}
            />
            <p>Total Price: {quantity * 5} POL</p>
            <CrossmintProvider apiKey={clientApiKey} environment="production">
                <CrossmintHostedCheckout
                    lineItems={{
                        collectionLocator: `crossmint:94cf1fce-490d-412e-9546-0d7079bad26e`,
                        callData: {
                            totalPrice: (quantity * 5).toString(), // 5 POL per token
                            quantity: quantity, // Number of NFTs
                            tokenId: 0 // Same token ID for all
                        },
                    }}
                    payment={{
                        crypto: { enabled: true }, // Allows payment in MATIC
                        fiat: { enabled: true }, // Allows credit card payments
                    }}
                    style={{
                        margin: "20px auto",
                        width: "100%",
                        maxWidth: "500px",
                        textAlign: "center",
                    }}
                />
            </CrossmintProvider>
        </div>
    );
}