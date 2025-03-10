import React, { useState } from "react";
import { ethers, parseUnits } from "ethers";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Alert } from "../Toast/Toast";
import "./Transfer.css";

const ERC20_ABI = [
    "function transfer(address to, uint amount) public returns (bool)"
];

const Transfer = ({ wallets, tokenAddress, quantity, setQuantity, isConnected, balanceAmount }) => {
    const [status, setStatus] = useState("");
    const [isTransferring, setIsTransferring] = useState(false);

    const handleTransfer = async () => {
        if (!isConnected) {
            return setStatus("Please connect your wallet first.");
        }

        if (!tokenAddress || wallets.length === 0) {
            return setStatus("Provide a valid token address and recipient list.");
        }

        if (!quantity || quantity <= 0) {
            return setStatus("Please enter a valid token quantity per wallet.");
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

            setIsTransferring(true);
            setStatus("Processing transfers...");

            for (const address of wallets) {
                const tx = await contract.transfer(address, parseUnits(quantity, 18));
                await tx.wait();  // Wait for transaction to be mined
                console.log(`Successfully sent ${quantity} tokens to ${address}`);
            }

            setStatus("✅ All transfers completed successfully!");
        } catch (error) {
            console.error(error);
            setStatus(`❌ Transfer failed: ${error.message}`);
        } finally {
            setIsTransferring(false);
        }
    };

    return (
        <div className="eth_transfer">
            <div className="_ethamount">
                <InputGroup size="lg" className="eth_amount">
                    <InputGroup.Text id="inputGroup-sizing-lg">
                        Quantity per wallet
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        type="number"
                        placeholder="Input token quantity per wallet"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="totalToken">
                <h4 style={balanceAmount <= quantity * wallets.length ? { color: "red" } : { color: "green" }}>
                    Total :{" "}
                    {balanceAmount <= quantity * wallets.length
                        ? `${quantity * wallets.length} - insufficient!`
                        : `${quantity * wallets.length}`}
                </h4>
            </div>

            <Button onClick={handleTransfer} disabled={!isConnected || isTransferring || wallets.length === 0}>
                {isTransferring ? "Transferring..." : "Send Tokens"}
            </Button>

            {status && <p>{status}</p>}
            <Alert />
        </div>
    );
};

export default Transfer;
