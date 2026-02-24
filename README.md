# 📝 Task Manager – Fullstack Home Assignment

## Overview

This is a fullstack task management application built as part of the Fullstack Junior Engineer Home Assignment.

### Tech Stack

- Frontend: React (Vite)
- Backend: Node.js + Express
- Storage: In-memory
- Animation: Custom infinite carousel (vanilla JavaScript)

---

## Features

- Create tasks
- Edit tasks
- Delete tasks (with confirmation)
- Toggle complete status
- Filter tasks (All / Completed / Pending)
- Priority levels (Low / Medium / High)
- Infinite auto-scrolling carousel
- Pause on hover
- Responsive design (mobile-friendly)
- Loading and error handling
- Empty state handling

---

## Carousel Implementation

The infinite carousel was implemented manually using:

- requestAnimationFrame
- scrollWidth measurement
- Task duplication for seamless looping
- transform: translateX animation
- Hover-based pause control

No third-party animation or carousel libraries were used.

---

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

Runs on:

```
http://localhost:4000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Project Structure

```
project-root/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── tasks.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       │   ├── TaskForm.jsx
│       │   └── TaskList.jsx
│       ├── services/
│       │   └── api.js
│       ├── styles/
│       │   └── main.css
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

---

## Notes

The carousel logic required careful synchronization between width measurement and the animation loop.

In hindsight, I would have separated `TaskList` into a dedicated `TaskItem` component, but due to time constraints and to avoid breaking the carousel logic, I chose to keep the structure as is.

Given more time, I would also further refine the UI design and visual polish .
