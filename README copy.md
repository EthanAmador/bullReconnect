# bullReconnect

Implement reconnection logic when workers lose connection with redis.

This project runs on version `>=12` node and `>=6`

## How to run

> 1. In the root path, create a `.env` file similar to `.env.example`
> 2. Install dependencies run this command `npm i`
> 3. To run run this command `node .`

## scaffolding

```sh
├── LICENSE
├── README.md
├── bull
│   ├── helper.js
│   ├── index.js
│   └── settings.js
├── check-version.js
├── index.js
├── .env.example
├── package.json
├── settings
│   ├── bull.js
│   ├── index.js
│   ├── redis.js
│   └── utils.js
└── workers
    ├── index.js
    └── sayHello
        ├── index.js
        └── worker.js
```

**env.example**

```javascript
# Redis config
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```
