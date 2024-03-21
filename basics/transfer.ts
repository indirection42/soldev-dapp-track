import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a pubkey to transfer to!`);
    process.exit(1);
}

const toPubkey = new PublicKey(suppliedToPubkey);
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const transaction = new Transaction();

const LAMPORT_TO_SEND = 5000;

const transferInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORT_TO_SEND
});

transaction.add(transferInstruction);

const sigature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

console.log(`Finished, transfer ${LAMPORT_TO_SEND} from ${senderKeypair.publicKey} to ${toPubkey}! Transaction signature: ${sigature}`)