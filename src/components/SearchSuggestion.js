import React from "react";
import "./SearchSuggestion.css";
import suggestionList from "./Suggestion.json";

function SearchSuggestion({ onSuggestionClick }) {
  const { predictions } = suggestionList;

  return (
    <div>
      {predictions.map((prediction, i) => {
        const { description } = prediction;
        return (
          <div className="flex" key={i}>
            <div
              id="suggestion"
              className="ml-4 pt-2 h-10 bg-white cursor-pointer text-left pl-2"
              onClick={onSuggestionClick}
            >
              {description}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchSuggestion;
