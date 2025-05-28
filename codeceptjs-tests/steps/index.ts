// codeceptjs-tests/steps/index.ts
import assert from "assert";
const { I } = inject();
import scenario1_steps from "./scenario1_steps";
import scenario2_steps from "./scenario2_steps";
import scenario3_steps from "./scenario3_steps";
import scenario4_steps from "./scenario4_steps";

export = function () {
    scenario1_steps({ I, assert });
    scenario2_steps({ I, assert });
    scenario3_steps({ I, assert });
    scenario4_steps({ I, assert });
    // Add more scenarios as needed
};


