import React from "react";
import "./SearchBar.css";

function SearchBar({ onSearchChange, onSearchClick, onSearchEnterKey }) {
  return (
    <div>
      <div className="flex">
        <input
          className="m-4 mr-0 h-12 placeholder-blue-800"
          type="text"
          name=""
          id="search"
          placeholder="Search for cities weather"
          onChange={onSearchChange}
          onKeyPress={onSearchEnterKey}
        />
        <button
          className="bg-blue-700 my-4 px-4 text-white"
          onClick={onSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
