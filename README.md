# bullReconnect

Implement reconnection logic when workers lose connection with redis.

This project runs on version `>=12` node and npm `>=6`

## How to run

> 1. In the root path, create a `.env` file similar to `.env.example`
> 2. Install dependencies run this command `npm i`
> 3. To run run this command `node .`

## How to run with docker

> 1. Install docker
> 2. Go to the project folder
> 3. Run docker-compose up --build

## scaffolding

```sh
├── LICENSE
├── README.md
├── arena.js
├── bull
│   ├── helper.js
│   ├── index.js
│   └── settings.js
├── check-version.js
├── docker
│   ├── arena
│   │   └── Dockerfile
│   └── bullReconnect
│       └── Dockerfile
├── docker-compose.yml
├── index.js
├── package.json
├── services
│   └── index.js
├── settings
│   ├── bull.js
│   ├── index.js
│   ├── redis.js
│   └── utils.js
└── workers
    ├── index.js
    └── sayHello
        ├── index.js
        └── worker.js
```

**env.example**

```javascript
# Redis config
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# Bull Setings
REMOVE_ON_COMPLETE=false
JOB_NAMES_RETRY='SAY_HELLO,JOB_NAME'
NUMBER_MAX_AUTORETRY=3
CONCURRENCY=20

# Arena settings
ARENA_APP_PORT=3000
```
