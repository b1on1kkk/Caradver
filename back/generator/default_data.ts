function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

import { GenerateRequirements } from "./requirements";
import ScheduleGenerator from "./schedule";

interface service {
  id: string;
  status: boolean;
  todos: "";
  required: string;
  schedule: string;
}

export function Generator() {
  const uns: service[] = [];

  let counter = 1;

  while (counter <= 2) {
    if (counter === 1) {
      for (let i = 1; i <= 10; i++) {
        uns.push({
          id: `A${i}`,
          status: getRandomInt(0, 1) ? true : false,
          todos: "",
          required: JSON.stringify(GenerateRequirements()),
          schedule: JSON.stringify(ScheduleGenerator())
        });
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        uns.push({
          id: `B${i}`,
          status: getRandomInt(0, 1) ? true : false,
          todos: "",
          required: JSON.stringify(GenerateRequirements()),
          schedule: JSON.stringify(ScheduleGenerator())
        });
      }
    }

    counter++;
  }

  return uns;
}
