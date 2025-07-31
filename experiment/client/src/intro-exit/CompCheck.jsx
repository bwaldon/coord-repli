import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button";

export function CompCheck({ next }) {
  const player = usePlayer();

  const [comp, setComp] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!comp) {
      alert("Please select an option before proceeding.");
      return;
    }
    player.set("compCheck", {
      comp
    });
    if (comp === "second") {
      next();
    } else {
      player.set("ended", "failed comprehension check");
    }
  }

  function handleCompChange(e) {
    setComp(e.target.value);
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <form
        className="mt-12 space-y-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Comprehension check
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Were you able to understand the instructions on the previous page? 
                <br></br>
                If so, please select the statement that best matches the instructions you just read.
              </p>
            </div>

                <div className="grid gap-2">
                  <Radio
                    selected={comp}
                    name="comp"
                    value="opinion"
                    label="I have to judge the cases based on my personal opinion. "
                    onChange={handleCompChange}
                  />
                  <Radio
                    selected={comp}
                    name="comp"
                    value="second"
                    label="I have to decide the cases in the same way as a second player."
                    onChange={handleCompChange}
                  />
                  <Radio
                    selected={comp}
                    name="comp"
                    value="quick"
                    label="I have to decide as quickly as possible based on my initial reaction."
                    onChange={handleCompChange}
                  />
                  <Radio
                    selected={comp}
                    name="comp"
                    value="mindseye"
                    label="I have to visualize the scenario in my mind's eye."
                    onChange={handleCompChange}
                  />
                  <Radio
                    selected={comp}
                    name="comp"
                    value="number"
                    label="I have to remember a number while I decide each case."
                    onChange={handleCompChange}
                  />
                </div>

            </div>
              <div className="mb-12">
                <Button type="submit">Next</Button>
              </div>
      </form>
    </div>
  );
}

export function Radio({ selected, name, value, label, onChange }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      <input
        className="mr-2 shadow-sm sm:text-sm"
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
