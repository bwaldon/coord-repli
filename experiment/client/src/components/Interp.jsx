import {
    usePlayer,
    useRound
  } from "@empirica/core/player/classic/react";
  import React from "react";
  import { Button } from "../components/Button";
  import "../../node_modules/@empirica/core/dist/player-classic-react.css";
  
export function Interp() {
    const player = usePlayer();
    const round = useRound();

    const context = round.get("context");
    const action = round.get("action");
    const question = round.get("question");

    const handleAnswerClick = (answer) => {
        player.round.set("answer", answer);
    };

    function handleSubmit() {
        if (player.round.get("answer") === undefined) {
            alert("Please select an answer before submitting.");
            return;
        }
        player.stage.set("submit", true);
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
                    className={`p-4 cursor-pointer ${ player.round.get("answer") === "Yes" ? "border-4 border-black" : "border-1 border-black"}`}
                    onClick={() => handleAnswerClick("Yes")}
                >
                    Yes
                </div>
                <div
                    className={`p-4 cursor-pointer ${ player.round.get("answer") === "No" ? "border-4 border-black" : "border-1 border-black"}`}
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