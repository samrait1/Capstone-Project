  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { UserAuth } from "../context/AuthContext";

  const Navbar = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

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
      navigate(`?q=${queryTerm}`);
    }

    return (
      <div className="flex item-center justify-between p-4 z-[100] w-full absolute">
        <Link to="/">
          <h1 className="text-cyan-600 text-4xl font-bold cursor-pointer">
            Movie Hall
          </h1>
        </Link>
        <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  id="search-navbar"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </form>
        {user?.email ? (
          <div>
            <Link to="/account">
              <button className="text-[#FFFDE3] pr-4">Account</button>
            </Link>

            <button
              onClick={handleLogOut}
              className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 "
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signIn">
              <button className="text-[#FFFDE3] pr-4">Sign In</button>
            </Link>
            <Link to="/signUp">
              <button className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 ">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  };

  export default Navbar;
