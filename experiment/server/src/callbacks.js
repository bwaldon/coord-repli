import { ClassicListenersCollector } from "@empirica/core/admin/classic";
import _ from "lodash";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {

  // Load the stimuli from the JSON file
  const stims = require("./stims.json");
  // Filter the stimuli based on the block number
  const filteredStims = stims.filter(stim => stim.block === game.get("treatment").block);
  // Shuffle the filtered stimuli
  const shuffledStims = _.shuffle(filteredStims);

  // If it's the clickthrough treatment, repeat the stimuli to create a longer game
  if (game.get("treatment").clickthrough === "Yes") {
    const repetitions = 5; // Number of times to repeat the stimuli
    let extendedStims = [];
    for (let i = 0; i < repetitions; i++) {
      extendedStims = extendedStims.concat(_.shuffle(filteredStims));
    }
    // Use the extended stimuli for the game
    shuffledStims.splice(0, shuffledStims.length, ...extendedStims);
  }

  const duration = game.get('treatment').clickthrough === "Yes" ? 999 : 120; // seconds

  game.set("length", shuffledStims.length);

  shuffledStims.forEach((trial, index) => {
    const round = game.addRound({
      idx: index + 1,
      scenario: trial.scenario,
      condition: trial.condition,
      context: trial.header,
      action: trial.continuation,
      question: `Did ${trial.name} break the rule?`,
    });
    round.addStage({ name: "Answer", duration: duration });
  });

  game.players.forEach((player) => {
    player.set("bonus", 0); 
  });

});

Empirica.onRoundStart(({ round }) => {
  // set default responses
  round.currentGame.players.forEach((player) => {
    player.round.set("resp", null);
  });
});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {
  const responsivePlayers = round.currentGame.players.filter((player) => player.round.get("resp") !== null);
  const unresponsivePlayers = round.currentGame.players.filter((player) => player.round.get("resp") === null);
  if (unresponsivePlayers.length > 0) {
    responsivePlayers.forEach((player) => {
    player.set("exitReason", "partner failed to answer");
  });
  unresponsivePlayers.forEach((player) => {
    player.set("exitReason", "failed to answer");
  });
  round.currentGame.end("ended", "player failed to answer")
} else {
    calculateBonus(round);
}
});

Empirica.onGameEnded(({ game }) => {});

function calculateBonus(round) {
  let playerAnswers = [];
  round.currentGame.players.forEach((player) => {
      playerAnswers.push(player.round.get("resp"));
  });
  if (playerAnswers[0] === playerAnswers[1] && playerAnswers[0] !== null) {
      round.currentGame.players.forEach((player) => {
          player.set("bonus", player.get("bonus") + 1);
      });
  }
}

