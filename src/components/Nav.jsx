import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const Nav = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className="bg-slate-50 py-4 px-10 font-mono">
      <div className="flex items-center justify-between">
        <Link to={"/"} className=" text-teal-600 font-bold text-4xl">
          SHARENOTE.io
        </Link>
        <div className=" flex gap-3">
          {token ? (
            <>
              <Link to={"/create"} className=" text-teal-600 font-medium">
                SHARE NOTE
              </Link>
              <button
                type="botton"
                className=" text-teal-600 font-medium"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
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
      </div>
      {token && token.user_mail && (
        <p className=" text-right text-sm text-teal-600">
          <span className=" font-semibold">Login as</span> {token.user_mail}
        </p>
      )}
    </nav>
  );
};

export default Nav;
