import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./reset.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/0/question/synonyms-1" />} />
        <Route path="/user/:userID/question/:questionIndex" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
);
