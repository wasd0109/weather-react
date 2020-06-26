import React from "react";

function Warning({ messageTitle, message, condition }) {
  if (condition) {
    return (
      <div>
        <div role="alert">
          <div class="bg-red-500 text-white font-bold rounded-t px-4 py-1">
            {messageTitle}
          </div>
          <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-2 text-red-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default Warning;
