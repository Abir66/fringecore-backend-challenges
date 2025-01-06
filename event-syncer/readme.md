# Event Syncer

## Environment

1. You definitely need NodeJS version `20` such that you can run `.mjs` files directly.

## What To Build

We want to build an awkward mix between a real-time long-polling server and a queue system.

[Video explanation from team Fringecore_](https://www.tella.tv/video/event-syncer-1-416j)

## Event Life-cycle

1. Events are automatically cleared after 2 minutes
2. Each event is associated with a specific key

## Consumption Mechanism

1. Each unique combination of `key` and `groupId` represents a distinct consumer group
2. When a consumer group requests events, it will receive ALL unconsumed events for that specific key
3. Once events are consumed by a group, they are marked as consumed and won't be returned again
4. If multiple consumers in the same group request events, only one will receive the available events

## Endpoint Behaviors

1. `GET /blocking-get?key=meow&groupId=3`:
    - Waits up to 30 seconds for event to be pushed with the key `meow`
    - If there are already unconsumed events for  key `meow` and groupId `3`, return all unconsumed events for that specific key and group
    - Returns an empty array `[]` if no events arrive within 30 seconds
2. `POST /push?key=meow`:
    - Adds new event to the `meow` event queue
    - Does not specify which consumer group will receive the event
    - Multiple events can be pushed under a single key.

## Details

1. Definitely watch the video for more information.
2. Do not use any external libraries.
3. Modify only `challenge.mjs`
4. DO NOT modify any other file other than `challenge.mjs`

## Let’s Start
```bash
git clone <link>
cd event-syncer
npm install
code .
node index.mjs
```

## Partial

Just know that we fully understand that these challenges are actually pretty tough. Hence it is surely not an all-or-nothing evaluation scheme. If you hit any of the features below you’re doing great. Every time you achieve one of these points, pat yourself on the back.

1. You have started the challenge.
2. Your browser is waiting for 30 seconds before receiving `[]`.
3. Your browser is getting data immediately as soon as data is being posted.
4. You have implemented group-based event consumption.
5. You have implemented event life-cycle management.