import { useGame } from "@empirica/core/player/classic/react";
import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  const game = useGame();
  const treatment = game.get("treatment")

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Instructions
      </h3>
      <div className="mt-2 mb-6">
        <p>
        {treatment.playerCount == 2 
          ? "You are invited to play a round of the Judging Game. You are Judge 1 and you have been paired with another player, Judge 2. On the following screens, both of you will be reading the same eight stories. Each story describes a rule and a person’s behavior. After reading each story, you will both be asked to make a decision: Did the person violate the rule (YES) or not (NO)? To win extra earnings, you and Judge 2 must agree on as many decisions as possible."
          : "On the following screens, you will be reading eight stories. Each story describes a rule and a person's behavior. After reading each story, you will be asked to make a decision: Did the person violate the rule (YES) or not (NO)?"
        }
        
        </p>
        <br></br>
        <p>
        {treatment.playerCount == 2
          ? "You must try and reach the same decision on Case 1, on Case 2, on Case 3, etc., all the way through Case 8 without talking to each other. If you agree on at least six decisions, each of you will earn an additional £1.00 (for a total of £1.70). If not, neither of you will earn the additional £1.00."
          : null
        }
        </p>
        <br></br>
        <p>
        <b>IMPORTANT:</b> You must provide an answer to each question before the timer runs out. If you fail to do so, you will not receive a completion code and you will be asked to return the study.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
