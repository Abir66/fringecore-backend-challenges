# Man in the middle

## Environment

1. You definitely need NodeJS version `>=20` such that you can run `.mjs` files directly.
2. Linux environments preferable. `WSL2` for Window might work too.

## How It All Started

Secure messages exchanged between two individuals, `faisal` and `monjur`, were intercepted, but the encryption and protocol used are custom and complex.

### Encryption Details:

- The encryption keys are `8` bytes long.
- Each message is encrypted with a different key using just `XOR`.
- Messages include the sender's username in lowercase, appended as a prefix with a colon, e.g., `faisal:hello`.
- Messages are padded with newlines (`\n`) to ensure the total length is a multiple of `7` bytes.
- After padding, the message is split into groups of `7` bytes, and an index byte is prepended to each group, turning them into `8-byte` blocks.
- All groups, except the first, are shuffled randomly.
- Each group is then encrypted and `Base64` encoded.
- `faisal` initiates the dialogue.

## What To Build

1. Write a Node.js program to decrypt and reconstruct the original messages to uncover the content of their communication.
2. Your program should write a file named `decrypted.json` with all the messages in an array.

## Details

1. Each array in `dump.json` is a message (total `20` messages).
2. Definitely watch the video for more information.
3. Do not use any external libraries.
4. DO NOT modify/create any other file other than `challenge.mjs` .

## Lets start
```bash
git clone <link>
cd man-in-the-middle
code .
node challenge.mjs
```

## Partial

Just know that we fully understand that these challenges are actually pretty tough. Hence it is surely not an all-or-nothing evaluation scheme. If you hit any of the features below you’re doing great. Every time you achieve one of these points, pat yourself on the back.

1. You have started the challenge.
2. You are able to read the encrypted chunks.
3. You are able to decrypt some of the messages.
4. You decrypted all messages but not ordered correctly.