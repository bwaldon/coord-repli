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
      <div className="w-92 flex flex-col items-center">
      { player.get("ended") == "failed comprehension check"
        ? <><h2 className="font-medium text-gray-700">You failed the comprehension check.</h2><p className="mt-2 text-justify">Please <b>return this study</b> and message the study administrator with the text <i>COMPCHECK</i> to receive partial compensation (£0.15) in the form of a bonus payment.</p></>
        : player.get("exitReason") === "failed to answer"
        ? <><h2 className="font-medium text-gray-700">You timed out.</h2><p className="mt-2 text-justify">Please <b>return this study</b> and message the study administrator with the text <i>TIMEOUT</i> to receive partial compensation (£0.20) in the form of a bonus payment.</p></>
        : player.get("ended") == "game ended" || player.get("exitReason") == "partner failed to answer"
        ? <><h2 className="font-medium text-gray-700">Finished!</h2><p className="mt-2 text-justify">Thank you for participating. {earnedBonus ? "You have earned the bonus." : "You will be paid at the posted rate."} </p> <h2 className="font-medium text-gray-700">Your completion code: { code } </h2></>
        : ""
      }
      </div>
    </div>
  );
}