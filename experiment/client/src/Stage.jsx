import {
  usePlayer,
  useGame
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { Interp } from "./components/Interp";
import { Interp_clickthrough } from "./load-test/Interp-clickthrough.jsx";

export function Stage() {
  const player = usePlayer();
  const game = useGame();
  const treatment = game.get("treatment")

  if (player.stage.get("submit")) {
    if (treatment.playerCount == 1) {
      return <Loading />;
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
        Please wait for other player(s).
      </div>
    );
  }

  if (treatment.clickthrough === "Yes") {
    return (
      <Interp_clickthrough />
    )
  } 
  return (
    <Interp />
  )
}
