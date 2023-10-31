import { Sequence } from "../types/Sequence";
import generateGradientTable from "./generateGradientTable";
class PianoRoll {
  backgroundColormap: any;
  svgElement: SVGSVGElement;
  end: null | number;
  noteColormap: any;
  start: any;
  note_height: number | undefined;
  constructor(svgElement: SVGSVGElement, sequence: Sequence[]) {
    this.svgElement = svgElement;
    this.end = null;

    // PianoRoll brand #5DB5D5
    const backgroundStartColor = { r: 93, g: 181, b: 213 };
    // #154151
    const backgroundEndColor = { r: 21, g: 65, b: 81 };
    this.backgroundColormap = generateGradientTable(
      backgroundStartColor,
      backgroundEndColor,
      128
    );

    const noteStartColor = { r: 66, g: 66, b: 61 };
    const noteEndColor = { r: 28, g: 28, b: 26 };
    this.noteColormap = generateGradientTable(
      noteStartColor,
      noteEndColor,
      128
    );

    this.svgElement.setAttribute("viewBox", "0 0 1 1");
    this.svgElement.setAttribute("preserveAspectRatio", "none");
    this.drawPianoRoll(sequence);
  }

  timeToX(time: number) {
    return time / (this.end as number);
  }

  drawPianoRoll(sequence: Sequence[]) {
    this.start = sequence[0].start;
    this.end = sequence[sequence.length - 1].end - this.start;
    // Extract just the pitches to prepare the SVG parameters
    const pitches = sequence.map((note: { pitch: any }) => {
      return note.pitch;
    });

    // Make it at lest 2 octaves (2 * 12)
    let pitch_min = Math.min(...pitches);
    let pitch_max = Math.max(...pitches);
    let pitch_span = pitch_max - pitch_min;

    // If the span is too low, we have to extend it equally on both sides
    if (pitch_span < 24) {
      const diff = 24 - pitch_span;
      const low = Math.ceil(diff / 2);
      const high = Math.floor(diff / 2);
      pitch_min -= low;
      pitch_max += high;
    }
    // And margin up and down
    pitch_min -= 3;
    pitch_max += 3;
    pitch_span = pitch_max - pitch_min;
    this.note_height = 1 / pitch_span;
    this.drawEmptyPianoRoll(pitch_min, pitch_max);

    sequence.forEach(
      (note: {
        start: number;
        end: number;
        pitch: number;
        velocity: string | number;
      }) => {
        const note_rectangle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );

        // Position and width are based on time
        const x = this.timeToX(note.start - this.start);
        const w = this.timeToX(note.end - note.start);

        note_rectangle.setAttribute("x", `${x}`);
        note_rectangle.setAttribute("width", `${w}`);

        // Computers draw upside down
        const y = 1 - (note.pitch - pitch_min) / pitch_span;

        note_rectangle.setAttribute("y", `${y}`);
        note_rectangle.setAttribute("height", `${this.note_height}`);

        // Colorcoding velocity
        const color = this.noteColormap[note.velocity];
        note_rectangle.setAttribute("fill", color);

        note_rectangle.classList.add("note-rectangle");

        // Draw it
        this.svgElement.appendChild(note_rectangle);
      }
    );
  }

  drawEmptyPianoRoll(pitch_min: number, pitch_max: number) {
    const pitch_span = pitch_max - pitch_min;
    for (let it = pitch_min; it <= pitch_max + 1; it++) {
      // Black keys
      if ([1, 3, 6, 8, 10].includes(it % 12)) {
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        const y = 1 - (it - pitch_min) / pitch_span;
        const x = 0;
        const h = 1 / pitch_span;
        const w = 1;

        rect.setAttribute("fill", this.backgroundColormap[12]);
        rect.setAttribute("fill-opacity", "0.666");
        rect.setAttribute("x", `${x}`);
        rect.setAttribute("y", `${y}`);
        rect.setAttribute("width", `${w}`);
        rect.setAttribute("height", `${h}`);
        this.svgElement.appendChild(rect);
      }

      // Key separation
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const y = 1 - (it - pitch_min) / pitch_span + 1 / pitch_span;
      line.setAttribute("x1", "0");
      line.setAttribute("y1", `${y}`);
      line.setAttribute("x2", "2");
      line.setAttribute("y2", `${y}`);
      let line_width;

      // Every octave, line is bolder
      if (it % 12 === 0) {
        line_width = 0.003;
      } else {
        line_width = 0.001;
      }
      line.setAttribute("stroke-width", `${line_width}`);
      line.setAttribute("stroke", "black");
      this.svgElement.appendChild(line);
    }
  }
}
export default PianoRoll;
