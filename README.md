# PalmStar

PalmStar is being migrated from a static site to a MERN application.

## Current Stack

- Client: React + Vite
- Server: Node.js + Express
- Database: MongoDB (optional in current phase)

## Project Structure

```
PalmStar/
├── client/
├── server/
├── static/
├── src/
├── index.html
└── roadmap.md
```

## Setup

1. Install server dependencies:

```bash
cd server
npm install
```

2. Install client dependencies:

```bash
cd ../client
npm install
```

## Environment Variables

Server variables are defined in [server/.env.example](server/.env.example).

```env
PORT=5000
MONGODB_URI=
CLIENT_URL=http://localhost:5173
```

Client variables are defined in [client/.env.example](client/.env.example).

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Run Locally (Separate Terminals)

Run server in terminal 1:

```bash
cd server
npm run dev
```

Run client in terminal 2:

```bash
cd client
npm run dev
```

## Useful Commands

Server:

```bash
npm run start
npm run dev
npm run lint
npm run format
```

Client:

```bash
npm run dev
npm run build
npm run lint
npm run format
```

## Status

- Phase 1 is implemented.
- Phase 2 setup is in progress and focused on developer workflow and configuration.

## License

See [LICENSE.md](LICENSE.md).
