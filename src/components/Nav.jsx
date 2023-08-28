import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-slate-50 py-4 px-10 flex items-center justify-between font-mono">
      <h1 className=" text-teal-600 font-bold text-4xl">SHARENOTE.io</h1>
      <div>
        <Link to={"/create"} className=" text-teal-600 font-medium">
          SHARE
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
