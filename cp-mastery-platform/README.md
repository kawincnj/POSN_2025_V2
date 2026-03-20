# CP Mastery Platform

A modern, interactive web application for learning competitive programming.

## Features

- **Structured Curriculum**: Topics organized by category (Data Structures, Algorithms, Graph, Math, String).
- **Interactive Visualizations**:
  - Sorting Algorithms (Bubble Sort)
  - Graph Traversal (BFS)
- **Progress Tracking**: Track completed topics and bookmarks (saved to local storage).
- **Code Playground**: Built-in code editor (simulation) for C++, Python, and Java.
- **Search**: Fast search across all topics.
- **Dark Mode**: Fully supported.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open Browser**:
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## Architecture

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Editor**: Monaco Editor React
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Directory Structure

- `src/data`: Contains the static curriculum data (`curriculum.js`).
- `src/contexts`: React Context for state management (`UserContext.jsx`).
- `src/components/visualizers`: Interactive algorithm visualizations.
- `src/components/editor`: Code editor component.
- `src/pages`: Main application pages.
