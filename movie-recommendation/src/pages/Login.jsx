import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="w-full h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
          className="hidden sm:block absolute w-full h-full object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>
              {error ? <p className='p-3 bg-red-500 my-2'>{error}</p> : null}
              <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded-full hover:bg-gray-600 text-black"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded-full hover:bg-gray-600 text-black "
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  minLength="6"
                />
                <button className="bg-cyan-600 py-3 my-6 rounded-r-full font-bold hover:bg-yellow-600">
                  Sign In
                </button>
                <p className="py-8">
                  <span className="text-orange-600 ml-4 text-xl hover:text-white">New to Movie Ras?</span>{" "}
                  <Link to="/signUp" className="ml-4 text-xl hover:text-yellow-600">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;