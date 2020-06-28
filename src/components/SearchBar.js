import React from "react";
import "./SearchBar.css";

function SearchBar({ onSearchChange, onSearchClick, onSearchEnterKey }) {
  return (
    <div>
      <div className="flex justify-center md:justify-start">
        <input
          className="pl-2 md:ml-4 h-12 placeholder-blue-800 "
          type="text"
          name=""
          id="search"
          placeholder="Search for cities weather"
          onChange={onSearchChange}
          onKeyPress={onSearchEnterKey}
        />
        <button
          className="bg-blue-700  px-4 text-white "
          onClick={onSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
