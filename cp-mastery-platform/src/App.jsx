import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import TopicPage from './pages/TopicPage';
import SearchPage from './pages/SearchPage';
import CheatSheet from './pages/CheatSheet';
import Comparisons from './pages/Comparisons';
import Roadmap from './pages/Roadmap';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category/:id" element={<CategoryPage />} />
            <Route path="topic/:id" element={<TopicPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="cheatsheet" element={<CheatSheet />} />
            <Route path="comparisons" element={<Comparisons />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
