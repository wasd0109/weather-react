import React from "react";
import "./SearchSuggestion.css";
import suggestionList from "./Suggestion.json";

function SearchSuggestion() {
  const { predictions } = suggestionList;

  return (
    <div>
      {predictions.map((prediction, i) => {
        const { description } = prediction;
        return (
          <div className="flex" key={i}>
            <button
              id="suggestion"
              className="ml-4 h-10 bg-white cursor-pointer"
            >
              <p className="text-left pl-2"> {description}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SearchSuggestion;
