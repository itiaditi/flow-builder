# Chatbot Flow Builder

A modern, interactive chatbot flow builder built with React, Vite, React Flow, Zustand, and Material UI. Design conversational flows visually by dragging, dropping, and connecting message nodes.

## Features

- **Visual Flow Editing:** Drag and drop message nodes onto a canvas and connect them to define chatbot logic.
- **Node Customization:** Click a node to edit its title and message content in a settings panel.
- **Live Preview:** Instantly see your flow updates on the canvas.
- **Modern UI:** Responsive layout using Material UI and Tailwind CSS.
- **State Management:** Fast, local state with Zustand.

## Getting Started

### Installation
```bash
npm install
# or
yarn install
```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## Usage
- Drag a "Message" node from the right panel onto the canvas.
- Click a node to edit its title and message in the settings panel (left).
- Connect nodes by dragging from one node's handle to another.
- Use the controls (zoom, fit view, etc.) on the canvas for navigation.

## Project Structure
```
src/
  components/
    flows/         # Flow canvas and related components
    layouts/       # UI panels (header, node panel, settings)
  hooks/           # Zustand store for flow state
  assets/          # Static assets
  App.jsx          # Main app layout
  main.jsx         # Entry point
```

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Flow](https://reactflow.dev/)
- [Material UI](https://mui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)

## Scripts
- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Run ESLint

---
