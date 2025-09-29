import { useGame } from "@empirica/core/player/classic/react";
import React from "react";

export function MyFinished_clickthrough() {
    const game = useGame();
    const treatment = game.get("treatment");
    const code = treatment["completionCode"];

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <div className="w-92 flex flex-col items-center">
                <h2 className="font-medium text-gray-700">Finished!</h2>
                <p>Your completion code: {code}</p>
            </div>
        </div>
    );
}
