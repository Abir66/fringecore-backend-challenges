# Stream Transform

## Environment

1. You definitely need NodeJS version `20` such that you can run `.mjs` files directly.
2. Linux environments preferable. `WSL2` for Window might work too.

## What To Build

1. You have this server that gives out top secret information mixed inside random data.
2. The server is a TCP server not a HTTP server.
3. The server is kinda slow but works well.
4. We need to build a server that connects to this server described above, and sends the same data but with the top-secret data hidden and replaced with dashes.
5. We don’t really know whent he data will end, hence it is absolutely critical that our proxy server that hides secret information does not wait for the entire data before giving output.

[Video explanation from team Fringecore_](https://www.tella.tv/video/stream-transform-challenge-1-a5qb)

## Details

1. Work only in the `challenge.mjs` file, please do not modify any other files.
2. Do not use any external libraries to pull this off.
3. The origin server will start on port `3032`
4. Start your own server on port `3031`
5. Definitely watch the video for more information.

## Lets start

```bash
git clone <link>
cd stream-transform
code .
```

Start the origin-server (it will start on port `3032`)
```bash
npm run origin-server
```
n another terminal tab, start your own code.
```bash
npm run proxy-server
```
To test if it worked or not, use the test command.
```bash
npm run test
```

# Partial

Just know that we fully understand that these challenges are actually pretty tough. Hence it is surely not an all-or-nothing evalution scheme. If you hit any of the features below you’re doing great. Every time you achieve one of these points, pat yourself on the back.

1. You have started the challenge.
2. You are able to connect to the origin server.
3. You are able to write to the origin server to get its output.
4. You are able to hide some of the secret sentences.
5. You are able to hide secret sentences across multiple lines.
6. You are able to hide all secret sentences.