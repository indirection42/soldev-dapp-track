import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { resolve } from "@bonfida/spl-name-service";
const suppliedFriendlyName = process.argv[2]
if (!suppliedFriendlyName) {
    throw new Error("Provide a mainnet friendly name as an argument to check the balace!");
}
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const owner = await resolve(connection, suppliedFriendlyName);
const publicKey = new PublicKey(owner);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol} SOL!`);
