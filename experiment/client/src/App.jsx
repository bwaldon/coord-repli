import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React from "react";
import { Game } from "./Game";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { CompCheck } from "./intro-exit/CompCheck";
import { Introduction } from "./intro-exit/Introduction";
import { MyConsent } from "./MyConsent.jsx";
import { MyPlayerForm } from "./MyPlayerForm.tsx";
import { MyFinished } from "./MyFinished.tsx";
import { myNoGames } from "./myNoGames.tsx";
import { myLobby } from "./myLobby.tsx";
import { Introduction_clickthrough } from "./load-test/Intro-clickthrough.jsx";
import { ExitSurvey_clickthrough } from "./load-test/ExitSurvey-clickthrough.jsx";
import { MyFinished_clickthrough } from "./load-test/Finished-clickthrough.jsx";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  const isClickthrough = new URLSearchParams(window.location.search).get("isClickthrough", "false") === "true";
  const finished = isClickthrough ? MyFinished_clickthrough : MyFinished;

  function introSteps({ game, player }) {
    return isClickthrough ? [Introduction_clickthrough] : [Introduction, CompCheck];
  }

  function exitSteps({ game, player }) {
    return isClickthrough ? [ExitSurvey_clickthrough] : [ExitSurvey];
  }

  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext playerCreate={MyPlayerForm} consent={MyConsent} introSteps={introSteps} exitSteps={exitSteps} finished={finished} noGames={myNoGames} lobby={myLobby}>
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}
