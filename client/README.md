# Vibe Mobile Client (`/client`)

A modern, production-ready **Expo React Native** application that powers the mobile experience for **Vibe**. This document is a one-stop reference for developers, designers and DevOps engineers who work on the mobile code-base.

---
          <!-- // "apiKey" : "AIzaSyAzBgikYrIER9BsmcxOF330T_zX2jMdVQg", -->

## Table of Contents
1. [Project Overview](#project-overview)
2. [Core Tech & Libraries](#core-tech--libraries)
3. [Folder Structure](#folder-structure)
4. [Getting Started](#getting-started)
5. [NPM/Yarn Scripts](#npmyarn-scripts)
6. [High-Level Architecture](#high-level-architecture)
   * [Navigation](#navigation--routing)
   * [State Management](#state-management)
   * [Networking / API Layer](#networking--api-layer)
   * [Real-Time Messaging](#real-time-messaging)
   * [Styling System](#styling-system)
7. [Environment Variables](#environment-variables)
8. [Build & Release](#build--release)
9. [Quality Assurance](#quality-assurance)
10. [Contributing](#contributing)
11. [Troubleshooting & FAQ](#troubleshooting--faq)

---

## Project Overview
The **Vibe Mobile Client** is an **Expo SDK 53** application written in **TypeScript**. It communicates with the Python backend (FastAPI) via an HTTP JSON API and leverages **Socket.IO** for real-time features such as chat, live event updates and the Roulette matching game.

Key features include:
- 🚀 **File-based routing** via `expo-router`
- 🗂️ **Modular feature folders** (auth, tabs, club, events…)
- 🎨 **Tailwind-powered styling** with **NativeWind**
- 🔥 Push notifications through **expo-notifications**
- 📡 Robust **Axios-based** API layer with error handling & token refresh
- 💬 **Socket.IO** real-time chat + event messaging
- 📈 E2E analytics ready (placeholder for PostHog / Amplitude)

## Core Tech & Libraries
| Domain | Library | Notes |
| ------ | ------- | ----- |
| UI | React 19, React Native 0.79 | Running the new architecture (Fabric & TurboModules) |
| Navigation | `expo-router` 5 | Typed, file-system-based routes |
| Styling | `nativewind` + `tailwindcss` 3 | Utility-first styling, platform-adaptive |
| HTTP | `axios` 1 | Wrapped by `src/api/apiService.ts` |
| Real-time | `socket.io-client` 4 | Abstracted in `src/services/socketService.ts` |
| State | React Context API | No additional state library – contexts per domain |
| Forms | `react-hook-form` *(planned)* | — |
| Maps | `react-native-maps` | With `react-native-maps-directions` for routing |
| Media | `expo-av`, `expo-image-picker` | Audio & media features |
| Quality | ESLint 9, TypeScript 5 | `eslint-config-expo` preset |

> **Note**: The project purposefully avoids heavy-weight state libraries (Redux, MobX) and favours colocated context providers.

## Folder Structure
Below is the condensed, two-level folder tree with explanations. Drill into a directory for more details.

```text
client/
├─ assets/             # Static images & fonts bundled with the app
│  ├─ fonts/
│  └─ images/
├─ src/
│  ├─ api/             # Axios service + typed endpoint maps
│  ├─ app/             # expo-router file-based routes (see Routing section)
│  │   ├─ (auth)/      # Login, register, profile setup, password reset …
│  │   ├─ (tabs)/      # Bottom-tab navigator (feed, create, chat, profile…)
│  │   ├─ (club)/      # Host/club related screens
│  │   └─ …            # Additional feature folders (events, roulette …)
│  ├─ components/      # Reusable, presentation-focused UI components
│  ├─ context/         # React Context providers (Auth, Socket, Audio …)
│  ├─ services/        # Non-UI helpers (e.g. socketService.ts)
│  ├─ types/           # Shared TypeScript types & interfaces
│  └─ utils/           # Pure utility functions (formatNumber, cacheManager …)
├─ app.json            # Expo application manifest (name, icons, schemes …)
├─ eas.json            # EAS (build & submit) configuration
├─ tailwind.config.js  # Tailwind theme, colours & plugins
├─ metro.config.js     # Metro bundler overrides (for SVG, fonts …)
├─ babel.config.js     # Babel plugins (nativewind, reanimated …)
└─ README.md           # You are here 👋
```

### Deep-dive: `src/api`
```
api/
├─ config.ts       # Base URL, endpoint map & constants
├─ apiService.ts   # Generic class wrapping fetch / axios-like calls
├─ bookingService.ts
├─ eventService.ts
└─ walletService.ts
```
Each feature that needs server data should have its own service file that delegates to `apiService`.

### Deep-dive: `src/context`
- **AuthContext** ➜ Stores auth token & user profile, exposes `login`, `logout` helpers.
- **SocketContext** ➜ Shares the live `Socket` instance across the app.
- **NotificationContext** ➜ In-app toast & push handling.
- **RouletteContext** ➜ Ephemeral state for the Roulette matching game.
- **AudioContext** ➜ Tracks currently playing audio, recording state.
- **ToastContext** ➜ Simple in-app toast pop-ups (uses `react-native-toast-message`).

## Getting Started
### 1. Prerequisites
- **Node.js ≥ 18** (LTS recommended)
- **Yarn** or **npm** ≥ 9
- **Expo CLI**: `npm i -g expo-cli`
- Xcode / Android Studio for device simulators *or* the **Expo Go / Dev Client** app on a physical device.

### 2. Installation
```bash
# clone the monorepo if you haven’t
$ git clone git@github.com:your-org/vibe.git && cd vibe/client

# install JS dependencies
$ npm install # or yarn

# install iOS pods (macOS only)
$ npx expo prebuild --platform ios
```

### 3. Running the App
```bash
# start Metro & the dev server
$ npm start

# handy aliases
a) npm run android   # run on Android emulator / device
b) npm run ios       # run on iOS simulator / device
c) npm run web       # run in the browser
```
When the QR code appears, scan it with the **Expo Go** app (or a custom dev client) to sideload the bundle.

### 4. Hot Reload & Fast Refresh
Thanks to Expo SDK 53, Fast Refresh is enabled by default. File saves instantly reload the affected modules.

## NPM/Yarn Scripts
| Script | Description |
| ------ | ----------- |
| `npm start` | Starts the Expo dev server |
| `npm run android` | Launch app on connected Android device/emulator |
| `npm run ios` | Launch app on iOS simulator (macOS) |
| `npm run web` | Build & run the web version via Metro-Web |
| `npm run reset-project` | **Dangerous** – wipes current `app/` code & restores the default starter template |
| `npm run lint` | Runs ESLint with the Expo config |

## High-Level Architecture
The app follows an **MVVM-like** component model: *screens* (views) fetch data via *services* (model) and reactively display it through *presentational components* (view-model).

### Navigation & Routing
`expo-router` treats files under `src/app/` as routes:
- `index.tsx` ⇒ `/` (home)
- Nested folders become *layouts*; e.g. `(auth)/_layout.tsx` wraps all auth screens.
- Dynamic routes: `[id].tsx`, `[type].tsx` map to params.
- Global "not found" screen: `+not-found.tsx`.

### State Management
We rely on **React Context** + hooks. Each domain has its provider co-located in `src/context/` and injected at the root (`src/app/_layout.tsx`). Contexts expose *strongly-typed* actions & selectors.

No Redux/MobX is used; this keeps bundle size small and debug flow React-native-friendly.

### Networking / API Layer
1. **Endpoint map** lives in `src/api/config.ts`.
2. `apiService.ts` is a thin wrapper around the Fetch API, providing:
   * Agnostic `get`, `post`, `put`, `patch`, `delete` helpers
   * JSON parsing & error normalization
   * Automatic `{ Authorization: "Bearer <token>" }` header injection via `createAuthHeader`
   * Timeout & basic retry/backoff logic (see `REQUEST_TIMEOUT`)
3. Feature-scoped service files (e.g. `bookingService.ts`) call `apiService` & export typed functions.

#### Sequence Diagram – Example *Login*
```mermaid
sequenceDiagram
    participant UI as LoginScreen
    participant Service as apiService
    participant BE as Backend
    UI->>Service: post('/login', credentials)
    Service->>BE: HTTP POST /api/login
    BE-->>Service: 200 {token, profile}
    Service-->>UI: {success, data}
    UI->>Context: AuthContext.login(token, profile)
```

### Real-Time Messaging
`src/services/socketService.ts` wraps `socket.io-client` and exposes a singleton. **SocketContext** shares this instance globally so screens & components can `emit` / `on` events without prop-drilling.

### Styling System
- **Tailwind 3** config (`tailwind.config.js`) defines colour palette & fonts.
- **NativeWind** converts Tailwind classes to React Native styles in JS runtime.
- Global CSS resets live in `global.css` for the web build.

## Environment Variables
The app consumes env variables prefixed with **`EXPO_PUBLIC_`** – they are bundled at build-time and accessible via `process.env.*`.

| Variable | Purpose | Default |
| -------- | ------- | ------- |
| `EXPO_PUBLIC_API_BASE_URL` | Base URL for REST API | `http://192.168.0.105:5000/api` |
| `EXPO_PUBLIC_SOCKET_URL` *(optional)* | Override Socket.IO endpoint | Derived from API base |

You can inject variables via:
1. **app.config.js** / `app.json` – under the `extra` key.
2. **EAS Build** secrets (`eas secret:create`) – automatically mapped.
3. **.env** files (with `expo-env` plugin) if you prefer.

## Build & Release
We use **EAS Build** for CI/CD (see `eas.json`). Typical flow:
```bash
# Login & configure credentials once
$ eas login
$ eas build:configure

# Create an internal build for QA
a) eas build --profile development --platform android
b) eas build --profile development --platform ios

# Production release
a) eas build --profile production --platform all
b) eas submit --platform all
```
Build profiles are defined for *development*, *preview* and *production* – each with different env variables & build flags.

## Quality Assurance
- **Linting**: `npm run lint`
- **Type Checking**: `tsc --noEmit`
- **Unit Tests**: *(coming soon – Jest + React Testing Library RN)*
- **E2E Tests**: *(coming soon – Detox)*

## Contributing
1. Fork & create a feature branch: `git checkout -b feat/my-feature`.
2. Follow the existing folder conventions – *one feature = one folder*.
3. Add or update type definitions; keep components *stateless* when possible.
4. Run `npm run lint` & ensure CI passes.
5. Submit a concise pull request description with screenshots/GIFs where useful.

## Troubleshooting & FAQ
| Problem | Possible Fix |
| ------- | ----------- |
| `Network request failed` | Ensure phone & backend are on the same LAN, update `EXPO_PUBLIC_API_BASE_URL`. |
| Metro bundler stuck at 99 % | Kill all Node processes and restart `npm start`. |
| Android build fails with *hermes* | Clear gradle & run `./gradlew clean` inside `android/`. |
| iOS pods out-of-date | `npx pod-install` then re-build. |

---

> 🔖 **Need help?** Ping the #mobile channel or open an issue.

Happy Coding 💜
