import React from "react";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <section className="px-10 mt-10">
      <div className="text-right">
        <Link
          to={"/"}
          className=" text-teal-600 font-medium border border-teal-600 px-3 py-2"
        >
          Back
        </Link>
      </div>
      <div className="border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
        <h3 className="text-3xl font-medium">Lorem ipsum, dolor sit amet.</h3>
        <p className="text-base mt-2">
          lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sapiente
          necessitatibus molestiae
        </p>
      </div>
    </section>
  );
};

export default Details;
