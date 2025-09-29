import { usePlayer, useRound } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import "../../node_modules/@empirica/core/dist/player-classic-react.css";
  
export function Interp_clickthrough() {
    const player = usePlayer();
    const round = useRound();

    function handleSubmit() {
        player.round.set("resp", "Yes");
        player.stage.set("submit", true);
    }

    return (
        <div className="w-128 text-center">
            <div className="text-3xl text-gray-700">
                {round.get("idx")}
            </div>
            <div className="flex justify-center mt-4">
                <Button handleClick={handleSubmit} primary>
                    Next
                </Button>
            </div>
        </div>
    );
}