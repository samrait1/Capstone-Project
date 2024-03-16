import React from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Login from "./pages/Login";
import MovieList from "./pages/MovieList";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/:genre" element={<MovieList />} />
          <Route path="/:genre/:movieId" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
