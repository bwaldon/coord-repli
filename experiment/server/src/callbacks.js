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

  const duration = 120;

  shuffledStims.forEach((trial, index) => {
    const round = game.addRound({
      idx: index,
      name: trial.scenario,
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

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {
  calculateBonus(round);
});

Empirica.onGameEnded(({ game }) => {});

function calculateBonus(round) {
  let playerAnswers = [];
  round.currentGame.players.forEach((player) => {
      playerAnswers.push(player.round.get("answer"));
  });
  if (playerAnswers[0] === playerAnswers[1]) {
      round.currentGame.players.forEach((player) => {
          player.set("bonus", player.get("bonus") + 1);
      });
  }
}

