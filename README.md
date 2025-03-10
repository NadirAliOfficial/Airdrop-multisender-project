# Airdrop Multisender Platform

This is a blockchain-based **Airdrop Multisender Platform** built using **React**, **Hardhat**, and **MetaMask**. It allows you to easily distribute tokens to multiple wallet addresses by uploading a CSV file.

## 🚀 Features
- **MetaMask Integration** for wallet connection.
- **CSV File Upload** for batch address imports.
- **Validation of Recipient Addresses** (valid/invalid address check).
- **Token Transfer Functionality** to send predefined tokens to valid addresses.
- **Network Switching** to ensure transactions occur on the desired blockchain network (Local Hardhat).

---

## 📂 Project Structure
```bash
├── src
│   ├── components
│   │   ├── Transfer/  # Token transfer logic
│   │   ├── Wallet/    # MetaMask connection logic
│   │   └── config.js  # Configuration for API, RPC, and keys
├── scripts
│   └── deploy.js      # Deployment script for smart contracts
├── contracts
│   └── Token.sol      # Smart contract for token distribution
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Technologies Used
- **React**: Frontend framework
- **Hardhat**: Ethereum development environment
- **MetaMask**: Wallet connection for interacting with blockchain
- **Ethers.js**: JavaScript library to interact with Ethereum blockchain

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/NadirAliOfficial/Airdrop-multisender-project.git
cd repo
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Setup Environment Variables
Create a `.env` file and add the following:
```env
API_URL=http://localhost:8000
RPC_URL=http://127.0.0.1:8545
SECRET_KEY=your-private-key
TOKEN_ADDRESS=deployed-token-address
```

> **Note:** Ensure `.env` is listed in `.gitignore`.

### 4. Start the Hardhat Local Node
```bash
npx hardhat node
```

### 5. Deploy the Smart Contract
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 6. Run the React Application
```bash
npm start
```

---

## ✅ Usage Instructions

1. **Connect MetaMask** to the Local Hardhat Network.
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`

2. **Upload CSV File** with wallet addresses:
   ```csv
   Address
   0xabc123...
   0xdef456...
   ```

3. **Validate Addresses**: The UI will display valid and invalid addresses.

4. **Transfer Tokens**:
   - Set the token quantity per wallet.
   - Click **Send Tokens** to initiate the transaction.

5. **Check MetaMask** to confirm the transaction.

---

## ⚠️ Troubleshooting
- **Error: Network Auto-Switching to Mainnet?**
  - Ensure MetaMask is set to the Local Hardhat network.
  - Clear previous connections in MetaMask settings.

- **Gas Fee Errors?**
  - Ensure sufficient ETH balance in your Hardhat local accounts.

- **Transaction Failures?**
  - Verify if the Hardhat node is running.
  - Check if the `config.js` has correct RPC and Token Address.
