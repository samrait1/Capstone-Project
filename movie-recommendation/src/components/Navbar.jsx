import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Logo from '../images/logo.png';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [showSearchForm, setShowSearchForm] = useState(false);
// for handling log out
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  function handleSearch(event) {
    event.preventDefault();
    const queryTerm = event.target.search.value;
    event.target.reset();
    navigate(`/search?q=${queryTerm}`); 
  }

  const handleSearchButtonClick = () => {
    setShowSearchForm(true);
  };

  const handleSearchFormClose = () => {
    setShowSearchForm(false);
  };

  return (
    <div className="flex items-center justify-between p-2 z-[100] w-full 
      absolute backdrop-filter backdrop-blur-lg bg-opacity-50 bg-gray-900">
     <div className="top-0 h-10 mt-[-20px]">
            <Link to="/">
              <img className="h-12 w-40 hover:bg-neutral-50 bg-red-400" src={Logo} alt="Logo" />
            </Link>
          </div>
      <div className="flex">
        {showSearchForm ? (
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              name="search"
              autoComplete="off"
              id="search-navbar"
              className="block w-full p-2 text-sm text-white border-b border-gray-300 bg-transparent  
              dark:text-white dark:border-gray-600 dark:bg-transparent dark:placeholder-gray-400"
              placeholder="Search..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2"
            >
              <FaSearch className="text-white" />
            </button>
            <button
              className="absolute top-1/2 right-[-32px] transform -translate-y-1/2 p-2"
              onClick={handleSearchFormClose}
            >
              <span className="text-white">X</span>
            </button>
          </form>
        ) : (
          <button
            onClick={handleSearchButtonClick}
            className="p-2"
          >
            <FaSearch className="text-white" />
          </button>
        )}
      </div>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-[#FFFDE3] pr-4">Account</button>
          </Link>

          <button
            onClick={handleLogOut}
            className="text-[#FFFDE3] px-6 py-2 rounded 
            cursor-pointer bg-[#00204a] "
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/signIn">
            <button className="text-[#FFFDE3] pr-4 
              hover:text-xl hover:text-yellow-600 ">Sign In</button>
          </Link>
          <Link to="/signUp">
            <button className="text-[#FFFDE3] px-6 py-2 
              rounded cursor-pointer bg-cyan-600 hover:text-xl  ">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;