import React from "react";

export default function SearchBox({ mangalist, setMangaList, fetchmanga }) {
  return (
    <div className="search-container">
      <div>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          onChange={(e) => searchItems(e.target.value)}
        >
          {/* search function  */}
        </input>
        <button onClick={fetchmanga} onKeyDown>
          Submit
        </button>
      </div>
    </div>
  );
}
