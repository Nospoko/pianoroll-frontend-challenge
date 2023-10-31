import { Sequence } from "../types/Sequence";
import PianoRoll from "./PianoRoll";
import preparePianoRollCard from "./preparePianoRollCard";

const generateRolls = (data: Sequence[]) => {
  const rollsList = [];
  let it = 0;
  while (it * 60 < data.length) {
    const start = it * 60;
    const end = start + 60;
    const partData = data.slice(start, end);
    const { svg } = preparePianoRollCard(it);
    const roll = new PianoRoll(svg, partData);
    const serializedRoll = {
      svgElement: roll.svgElement.outerHTML,
    };
    rollsList.push(serializedRoll);

    it++;
  }

  return rollsList;
};
export default generateRolls;
