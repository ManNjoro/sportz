# Sportz
Sportz is a comprehensive backend service designed for live sports coverage. It utilizes REST endpoints for match and commentary management alongside WebSockets for real-time data broadcasting. The platform allows clients to monitor match lists and receive instantaneous score and play-by-play commentary updates through a robust streaming architecture that features heartbeats, rate limiting, and backpressure protection. By enforcing live-only updates and utilizing Zod schemas for strict input validation, Sportz ensures a reliable and structured flow of information. Additionally, the service includes dedicated seeding tools to simulate live game environments and facilitate development.

## Tech Stack
- Node.js
- Express
- WebSockets
- Zod
- Arcjet
- PostgreSQL
- Drizzle ORM
- Drizzle kit
- CORS Middleware
- Dotenv
- WS Library

### Dev Tools
- **[CodeRabbit](https://jsm.dev/sportz-coderabbit)** is an AI-powered code review platform that provides automated, contextual feedback on pull requests. It helps developers improve code quality and catch potential bugs early by integrating directly into the development workflow.
- **[Site24x7](https://jsm.dev/sportz-site24x7)** is a comprehensive monitoring solution that provides deep insights into application performance and infrastructure health. It allows for real-time tracking of uptime, end-user experience, and server metrics to ensure maximum availability.

## 🔋 Features

👉 **Match Management**: Effortlessly list and create sports matches while maintaining accurate updates for scores and match statuses.

👉 **Commentary Management**: Access comprehensive play-by-play commentary tied to specific matches and add new entries to keep the coverage current.

👉 **Real-Time Broadcasts**: Deliver instant commentary and score updates via per-match WebSocket subscriptions, ensuring clients receive live data as it happens.

👉 **WebSocket Protocol**: Utilize a structured messaging system for subscribing, unsubscribing, and managing active subscriptions with automated ping responses.

👉 **Robust WS Behavior**: Maintain high performance and stability through the use of heartbeats, backpressure protection, rate limiting, and subscription caps.

👉 **Input Validation**: Ensure data integrity across both REST endpoints and WebSocket messages using strict Zod schemas.

👉 **Seed Tooling**: Rapidly populate matches and simulate live commentary and score changes with a dedicated script designed for testing and simulation.