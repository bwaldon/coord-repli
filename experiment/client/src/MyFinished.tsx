import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React from "react";

export function MyFinished() {
  const player = usePlayer();
  const game = useGame();
  const treatment = game.get("treatment");

  const bonus = player.get("bonus");
  const bonusNumber = parseInt(String(bonus ?? 0));
  const earnedBonus = treatment["playerCount"] == 2 && bonusNumber >= 6;
  const code = earnedBonus ? treatment["bonusCode"] : treatment["completionCode"];

  return (
    <div className="h-full flex flex-col items-center justify-center">
      { player.get("ended") == "failed comprehension check"
        ? <><h2 className="font-medium text-gray-700">You failed the comprehension check. Please return the study.</h2></>
        : player.get("exitReason") === "failed to answer"
        ? <><h2 className="font-medium text-gray-700">You timed out. Please return the study.</h2></>
        : player.get("ended") == "game ended" || player.get("exitReason") == "partner failed to answer"
        ? <><h2 className="font-medium text-gray-700">Finished!</h2><p className="mt-2 text-gray-400">Thank you for participating. {earnedBonus ? "You have earned the bonus." : "You will be paid at the posted rate."} </p> <h2 className="font-medium text-gray-700">Your completion code: { code } </h2></>
        : ""
      }
    </div>
  );
}