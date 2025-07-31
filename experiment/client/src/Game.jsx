import { Chat, useRound, useGame } from "@empirica/core/player/classic/react";

import React from "react";
import { Profile } from "./Profile";
import { Stage } from "./Stage";

export function Game() {
  const round = useRound();
  const game = useGame();
  const treatment = game.get("treatment");

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <Profile />
        <div className="h-full flex items-center justify-center">
          <Stage />
        </div>
      </div>

      {treatment.useChat == "yes" &&
        (<div className="h-full w-128 border-l flex justify-center items-center">
          <Chat scope={round} attribute="chat" />
        </div>)
      }
    </div>
  );
}
