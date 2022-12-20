import React from "react";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="bg-black text-white flex justify-center">
      <Link to="/" className="p-5 relative right-[36%] font-mono font-bold text-xl">
        <div>My Blog</div>
      </Link>
      <Link to="/" className="p-5 hover:bg-gray-600 font-['Calibri'] absolute left-[41%]">
        Articles
      </Link>
      <Link to="/add" className="p-5 hover:bg-gray-600 font-['Calibri'] ">
        Add Article
      </Link>
      <Link to="/about" className="p-5 hover:bg-gray-600 font-['Calibri']">
        About Me
      </Link>
    </div>
  );
};

export default Toolbar;
