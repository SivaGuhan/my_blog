import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/post", {
      method: "POST",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(JSON.stringify(response)))
      .catch((error) => console.log(error));
    navigate("/");
  };
  return (
    <div className="flex justify-center">
      <div className="w-[50%] mt-[7%] rounded-3xl border-2 border-black hover:scale-105 hover:shadow-xl hover:shadow-cyan-500">
        <div className="text-gray-700 text-4xl font-bold font-['monospace'] pl-2 pt-2">
          Add Article
        </div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2 font-['sans-serif']">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2 font-['sans-serif']">
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              rows="10"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline font-['sans-serif']"
              type="button"
              onClick={handleClick}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
