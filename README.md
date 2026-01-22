# WebSocket App

Vite + React + TypeScript app that starts a voice session and streams microphone audio to an agent over WebSocket, then plays back the agent audio and renders transcripts.

## Prerequisites

- Node.js (LTS)

## Setup

```bash
npm install
```

## Configure

Edit `src/CONSTS.ts`:

- `AGENT_ID`: agent id to connect to
- `API_BASE_URL`: HTTP endpoint used to start a session (returns `wsUrl`)

## Run

```bash
npm run dev
```

Open the printed local URL in your browser and allow microphone access.

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Docker (production)

Build the image (from the project root where `Dockerfile` is):

```bash
docker build -t websocket-app .
```

Run the container:

```bash
docker run --rm -p 8080:80 websocket-app
```

Open `http://localhost:8080`.

