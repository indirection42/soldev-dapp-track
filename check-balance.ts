import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
const publicKey = new PublicKey("2NcmoNJQ1qvycnsKwGs8gJS9kGixU7PyuziN78Cdaj2s");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol} SOL!`);
