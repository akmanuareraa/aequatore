import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: "68dK4eeKGERwYepNQnukl7OyJ_K_UAz3",
    network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);