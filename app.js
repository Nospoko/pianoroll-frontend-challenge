import PianoRoll from './pianoroll.js';

class CSVToSVG {
  constructor(csvURL) {
    this.csvURL = csvURL;
    this.data = null;
  }

  async loadData() {
    try {
      const response = await fetch('https://pianoroll.ai/random_notes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.data = await response.json();
      console.log(this.data);  // This should log an array of objects
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  createSVG(container, partData) {
    const svgWrapper = document.createElement('div');
    const description = document.createElement('p');

    // Add description
    const pitch = partData[0].pitch;
    const velocity = partData[0].velocity;
    description.textContent = `FIRST PITCH! ${pitch} ${velocity}`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '128');
    svg.setAttribute('height', '32');

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    // Generate a random color
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;

    // Set rectangle properties to cover the entire SVG
    rect.setAttribute('width', '128');
    rect.setAttribute('height', '32');
    rect.setAttribute('fill', randomColor);

    // Append elements
    svg.appendChild(rect);
    svgWrapper.appendChild(description);
    svgWrapper.appendChild(svg);
    container.appendChild(svgWrapper);
  }

  async generateSVGs() {
    if (!this.data) await this.loadData();
    if (!this.data) return;
    
    const svgContainer = document.getElementById('svgContainer');
    svgContainer.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const start = i * 50;
      const end = start + 50;
      const partData = this.data.slice(start, end);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '690');
      svg.setAttribute('height', '420');
      svgContainer.appendChild(svg);

      const roll = new PianoRoll(svg, partData);
      // this.createSVG(svgContainer, partData);
      console.log(roll.note_height);
    }
  }
}

document.getElementById('loadCSV').addEventListener('click', async () => {
  const csvToSVG = new CSVToSVG();
  await csvToSVG.generateSVGs();
});
