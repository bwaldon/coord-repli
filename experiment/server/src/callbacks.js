import { ClassicListenersCollector } from "@empirica/core/admin/classic";
import _ from "lodash";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {

  let sample_trials = _.sampleSize(_.shuffle([
    // Caution! Partial list generated from the PNAS supplemental PDF with Claude. Not for production!
    {
      "vignette": "Vehicles",
      "condition": "Violation",
      "context": "One day at the local park, there was a tragic accident involving a pedestrian and a car. Aiming to avoid accidents that could endanger parkgoers or jeopardize their physical integrity, the park administrators established a rule that: \"No cars are allowed inside the park\".",
      "action": "John is late to work and notices that the only way he can get there in time for an important meeting is by taking a shortcut through the park. He takes the shortcut, making it just in time for his meeting.",
      "question": "Did John break the rule?"
    },
    {
      "vignette": "Vehicles",
      "condition": "Overinclusion",
      "context": "One day at the local park, there was a tragic accident involving a pedestrian and a car. Aiming to avoid accidents that could endanger parkgoers or jeopardize their physical integrity, the park administrators established a rule that: \"No cars are allowed inside the park\".",
      "action": "The city's championship-winning team parades in a big limo inside the park to celebrate the title. The limo proceeds very slowly and police scouts on the ground ensure no parkgoer gets too close.",
      "question": "Did the team break the rule?"
    },
    {
      "vignette": "Vehicles",
      "condition": "Underinclusion",
      "context": "One day at the local park, there was a tragic accident involving a pedestrian and a car. Aiming to avoid accidents that could endanger parkgoers or jeopardize their physical integrity, the park administrators established a rule that: \"No cars are allowed inside the park\".",
      "action": "Martha is late to a court appointment. She hops into her motorbike and heads downtown. Halfway through, she realizes that she might get there earlier by taking a shortcut through the park. She enters the park in her motorbike, cutting several minutes off her commute time.",
      "question": "Did Martha break the rule?"
    },
    {
      "vignette": "Vehicles",
      "condition": "Compliance",
      "context": "One day at the local park, there was a tragic accident involving a pedestrian and a car. Aiming to avoid accidents that could endanger parkgoers or jeopardize their physical integrity, the park administrators established a rule that: \"No cars are allowed inside the park\".",
      "action": "Joanna walks into the park. She takes a long and relaxing stroll observing the trees and birds.",
      "question": "Did Joanna break the rule?"
    },
    {
      "vignette": "Sleep",
      "condition": "Violation",
      "context": "A group of people slept on the benches at the train station every night. To avoid use of the station concourse as accommodation or overnight shelter, the station manager established a rule: \"No sleeping is allowed on the station benches\".",
      "action": "Robert is a homeless person. As the streets are cold and uncomfortable, he goes to the train station, lies down in one of the benches, where he sleeps soundly throughout the night.",
      "question": "Did Robert break the rule?"
    },
    {
      "vignette": "Sleep",
      "condition": "Overinclusion",
      "context": "A group of people slept on the benches at the train station every night. To avoid use of the station concourse as accommodation or overnight shelter, the station manager established a rule: \"No sleeping is allowed on the station benches\".",
      "action": "Julia is a businesswoman. She spent all day out of town negotiating important contracts. After a long day of work, Julia sits at one of the benches at the train station to wait for the train home. While waiting, she falls asleep for about 5 minutes, before waking up to the sound of an incoming train.",
      "question": "Did Julia break the rule?"
    },
    {
      "vignette": "Sleep",
      "condition": "Underinclusion",
      "context": "A group of people slept on the benches at the train station every night. To avoid use of the station concourse as accommodation or overnight shelter, the station manager established a rule: \"No sleeping is allowed on the station benches\".",
      "action": "Richard is a homeless person. At the end of the day, he lies down on a bench at the station, resting his head on a makeshift pillow and wrapped in an old blanket. However, Richard never actually sleeps.",
      "question": "Did Richard break the rule?"
    },
    {
      "vignette": "Sleep",
      "condition": "Compliance",
      "context": "A group of people slept on the benches at the train station every night. To avoid use of the station concourse as accommodation or overnight shelter, the station manager established a rule: \"No sleeping is allowed on the station benches\".",
      "action": "Veronica is a frequent commuter on a local train. She sits at one of the benches while excitingly talking over the phone with one of her best friends. Before the call is over, her train arrives at the station and she gets onboard.",
      "question": "Did Veronica break the rule?"
    },
    {
      "vignette": "Driving",
      "condition": "Violation",
      "context": "While driving under the influence of alcohol, a young woman suffered a car accident that ended her life. In order to avoid future accidents, Congress established a law: \"If a police-administered breathalyzer test detects any trace of alcohol, the driver's vehicle will be seized and the driver subject to imprisonment.\"",
      "action": "Mario drinks heavily at a nightclub. He uses his car to go back home. On his way, police stops Mario and he takes a breathalyzer test that detects traces of alcohol.",
      "question": "Did Mario break the rule?"
    },
    {
      "vignette": "Driving",
      "condition": "Overinclusion",
      "context": "While driving under the influence of alcohol, a young woman suffered a car accident that ended her life. In order to avoid future accidents, Congress established a law: \"If a police-administered breathalyzer test detects any trace of alcohol, the driver's vehicle will be seized and the driver subject to imprisonment.\"",
      "action": "Andrea is late to work. While getting ready as fast as she can, Andrea uses mouthwash that contains alcohol. Despite her tardiness, Andrea drives carefully. On her way, she is stopped by the police. The breathalyzer test detects a small amount of alcohol.",
      "question": "Did Andrea break the rule?"
    },
    {
      "vignette": "Driving",
      "condition": "Underinclusion",
      "context": "While driving under the influence of alcohol, a young woman suffered a car accident that ended her life. In order to avoid future accidents, Congress established a law: \"If a police-administered breathalyzer test detects any trace of alcohol, the driver's vehicle will be seized and the driver subject to imprisonment.\"",
      "action": "Ursula goes to a party where she makes use of a drug called \"ecstasy\". This drug produces changes in perception and increased physical activity. Ursula does not drink any alcohol at the party, only water. Once the party is over, Ursula gets in her car to return home still under the influence of \"ecstasy\". She is stopped by the police, but the breathalyzer test detects no alcohol.",
      "question": "Did Ursula break the rule?"
    },
    {
      "vignette": "Driving",
      "condition": "Compliance",
      "context": "While driving under the influence of alcohol, a young woman suffered a car accident that ended her life. In order to avoid future accidents, Congress established a law: \"If a police-administered breathalyzer test detects any trace of alcohol, the driver's vehicle will be seized and the driver subject to imprisonment.\"",
      "action": "Lewis drives his car to work after having breakfast and drinking water. He is stopped by the police on his way and takes a breathalyzer test that detects no traces of alcohol.",
      "question": "Did Lewis break the rule?"
    }
  ]), 8);

  const duration = 120;

  sample_trials.forEach((trial, index) => {
    const round = game.addRound({
      name: index + 1,
      context: trial.context,
      action: trial.action,
      question: trial.question,
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

