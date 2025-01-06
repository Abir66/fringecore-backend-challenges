const DUMP_FILE = "dump.json";
const OUTPUT_FILE = "decrypted.json";

// Write your code here
// Do not modify/create any other file
// Happy coding :)

import fs from 'fs';

function xor(array1, array2) {
    const result = [];

    for (let i = 0; i < array1.length; i++) {
        result.push(array1[i] ^ array2[i]);
    }

    return result;
}
    

function decryptMessage(chunks, cnt) {

    const knowPart = cnt % 2 === 0 ? '0faisal:' : '0monjur:';
    
    // get the key from the first chunk
    const firstChunk = Buffer.from(chunks[0], 'base64');
    const knownChunk = Buffer.from(knowPart, 'utf-8');
    const key = xor(firstChunk, knownChunk);

    // Decrypt all chunks
    let decryptedChunks = chunks.map((chunk) => xor(key, Buffer.from(chunk, 'base64')));
    decryptedChunks.sort((a, b) => a[0]-b[0]);
    decryptedChunks = decryptedChunks.map((m) => m.slice(1));

    // concatenate all arrays and convert to string
    decryptedChunks = decryptedChunks.flat(1);
    const decoder = new TextDecoder();
    const fullMessage = decoder.decode(new Uint8Array(decryptedChunks));
    return fullMessage.includes('\n') ? fullMessage.split('\n')[0] : fullMessage;
}

const data = JSON.parse(fs.readFileSync(DUMP_FILE, 'utf-8'));

const messages = data.map((chunks, i) => decryptMessage(chunks, i));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(messages, null, 4), 'utf-8');