import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React from "react";

export function MyFinished() {
  const player = usePlayer();
  const game = useGame();
  const treatment = game.get("treatment");

  return (
    <div className="h-full flex flex-col items-center justify-center">
      { player.get("ended") == "game ended" 
        ? <><h2 className="font-medium text-gray-700">Finished!</h2><p className="mt-2 text-gray-400">Thank you for participating.</p> <h2 className="font-medium text-gray-700">Your completion code: { treatment["completionCode"] } </h2></>
        : player.get("ended") == "failed comprehension check"
        ? <><h2 className="font-medium text-gray-700">You failed the comprehension check. Please return the study.</h2></>
        : ""
      }
    </div>
  );
}