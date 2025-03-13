import "./App.css";
import Navbar from "./components/Navbar";
import AddTitlePage from "./pages/AddTitlePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/TitleDetailPage";
import ProfileEditPage from "./pages/TitleEditPage";
import TitleIndexPage from "./pages/TitleIndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import ModeContext from "./contexts/ModeContext";
import { useContext } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  const {mode} = useContext(ModeContext);

  return (
    <AuthProvider>
    <HashRouter>
      <header>
        <Navbar/>
      </header>
      <main className={mode === "light" ? "light" : "dark"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-profile" element={
            <ProtectedRoute>
              <AddTitlePage />
            </ProtectedRoute>
            } />
          <Route path="/profile/:id" element={<TitleIndexPage />}>
            <Route index element={<ProfileDetailPage />} />
            <Route path="edit" element={<ProtectedRoute><ProfileEditPage /></ProtectedRoute>} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </HashRouter>
    </AuthProvider>
  );
};

export default App;