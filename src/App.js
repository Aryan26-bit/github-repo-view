import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RepoList from "./components/RepoList";
import RepoDetail from "./components/RepoDetail";
import NotFound from "./components/NotFound";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div>
        <h1>GitHub Repositories</h1>
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/repo/:id" element={<RepoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
