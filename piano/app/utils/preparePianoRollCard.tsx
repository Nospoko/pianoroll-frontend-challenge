const preparePianoRollCard = (rollId: number) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("piano-roll-card");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("piano-roll-svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");

  // Append the SVG to the card container
  cardDiv.appendChild(svg);
  return { cardDiv, svg };
};

export default preparePianoRollCard;
