import {
    usePlayer,
    useRound,
    useGame
  } from "@empirica/core/player/classic/react";
  import React from "react";
  import { Button } from "../components/Button";
  import "../../node_modules/@empirica/core/dist/player-classic-react.css";
  
export function Interp() {
    const player = usePlayer();
    const round = useRound();
    const game = useGame();

    const treatment = game.get("treatment");

    const context = round.get("context");
    const action = round.get("action");
    const question = round.get("question");

    const handleAnswerClick = (answer) => {
        player.round.set("resp", answer);
    };

    function handleSubmit() {
        if (player.round.get("resp") === undefined) {
            alert("Please select an answer before submitting.");
            return;
        }
        player.stage.set("submit", true);
        // variable names set to match PNAS analysis scripts
        player.round.set("case_type", round.get("condition", "unknown"));
        player.round.set("condition", treatment.playerCount == 2 ? "coordination" : treatment.playerCount == 1 ? "individual" : "unknown");
        player.round.set("scenario", round.get("scenario", "unknown"));
      }

    return (
        <div className="w-128">
            <p>{context}</p>
            <br />
            <p>{action}</p>
            <br />
            <p>{question}</p>
            <br />
            <div className="flex justify-around">
                <div
                    className={`p-4 cursor-pointer ${ player.round.get("resp") === "Yes" ? "border-4 border-black" : "border-1 border-black"}`}
                    onClick={() => handleAnswerClick("Yes")}
                >
                    Yes
                </div>
                <div
                    className={`p-4 cursor-pointer ${ player.round.get("resp") === "No" ? "border-4 border-black" : "border-1 border-black"}`}
                    onClick={() => handleAnswerClick("No")}
                >
                    No
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <Button handleClick={handleSubmit} primary>
                    Submit
                </Button>
            </div>
        </div>
    );
}