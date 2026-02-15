# Airdrop Multi-Sender

Smart contract tool for distributing token airdrops to multiple addresses in a single transaction.

## Features
- Batch token transfers (ERC-20/SPL)
- Gas-optimized bulk send
- CSV recipient list support
- Transaction status tracking

## Requirements
```
npm install
```

## Usage
```bash
# Deploy contract
npx hardhat deploy --network mainnet

# Run airdrop
node scripts/airdrop.js --file recipients.csv --token 0xYOUR_TOKEN
```

## License
MIT
<!-- updated: 2026-02-15-04 -->
