import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button";

export function ExitSurvey_clickthrough({ next }) {
    const player = usePlayer();
    const [feedback, setFeedback] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        player.set("exitSurvey", { feedback });
        next();
    }

    return (
        <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Exit Survey</h3>
            <form className="mt-12 space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                <div>
                    Did you experience any lag (more than a few seconds), disconnections, or other technical issues during the task? If so, please describe them below. If not, you can leave this field blank.
                    <textarea
                        id="feedback"
                        name="feedback"
                        rows={4}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <div className="mb-12">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}
