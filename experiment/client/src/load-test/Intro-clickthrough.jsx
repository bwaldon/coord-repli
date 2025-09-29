import React from "react";
import { Button } from "../components/Button";

export function Introduction_clickthrough({ next }) {

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Instructions
      </h3>
      <div className="mt-2 mb-6">
        <p>
        For this task, you will simply click through a series of slides. There are no questions to answer. Please click the "Next" button to proceed through the slides.
        </p>
        <p>
        The purpose of this task is simply to test the limits of our server capacity. You will be paid at the posted rate, and at the end of the task you will be asked whether you experienced any lag or other technical issues.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
