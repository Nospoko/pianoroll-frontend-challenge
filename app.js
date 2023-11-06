import PianoRoll from './pianoroll.js';

class PianoRollDisplay {
  constructor() {
    this.data = null;
  }

  async loadPianoRollData() {
    try {
      const response = await fetch('https://pianoroll.ai/random_notes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  preparePianoRollCard(rollId, svg) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('piano-roll-card');
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    descriptionDiv.textContent = `This is a piano roll number ${rollId}`;
    cardDiv.appendChild(descriptionDiv);
    cardDiv.appendChild(svg);
    return cardDiv;
  }

  async generateSVGs() {
    if (!this.data) await this.loadPianoRollData();
    if (!this.data) return;

    const pianoRollContainer = document.getElementById('pianoRollContainer');
    pianoRollContainer.innerHTML = '';

    for (let it = 0; it < 10; it++) {
      const start = it * 60;
      const end = start + 60;
      const partData = this.data.slice(start, end);
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('piano-roll-svg');
      svg.setAttribute('width', '80%');
      svg.setAttribute('height', '150');
      pianoRollContainer.appendChild(this.preparePianoRollCard(it, svg));
      new PianoRoll(svg, partData);
    }
  }
}

document.getElementById('loadCSV').addEventListener('click', async () => {
  const csvToSVG = new PianoRollDisplay();
  await csvToSVG.generateSVGs();
});
