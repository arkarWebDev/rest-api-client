import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const Nav = () => {
  const { token } = useContext(UserContext);

  return (
    <nav className="bg-slate-50 py-4 px-10 flex items-center justify-between font-mono">
      <Link to={"/"} className=" text-teal-600 font-bold text-4xl">
        SHARENOTE.io
      </Link>
      <div className=" flex gap-3">
        {token ? (
          <Link to={"/create"} className=" text-teal-600 font-medium">
            SHARE NOTE
          </Link>
        ) : (
          <>
            <Link to={"/login"} className=" text-teal-600 font-medium">
              Login
            </Link>
            <Link to={"/register"} className=" text-teal-600 font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
