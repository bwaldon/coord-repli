import React from "react";

export function myNoGames() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-92 flex flex-col items-center">
        <h2 className="text-gray-700 font-medium">No experiments available</h2>
        <p className="mt-2 text-gray-400 text-justify">
          There are currently no available experiments. 
        </p>
        <p className="mt-2 text-justify">
          Please <b>return this study</b> and message the study administrator with the text <i>NOEXP</i> to receive partial compensation (£0.10) in the form of a bonus payment.
        </p>
      </div>
    </div>
  );
}