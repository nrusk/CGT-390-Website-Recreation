import "./App.css";
import Navbar from "./components/Navbar";
import AddProfilePage from "./pages/AddProfilePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <HashRouter>
      <header>
        <Navbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-profile" element={<AddProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;