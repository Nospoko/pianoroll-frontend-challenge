import PianoRoll from './pianoroll.js';

class PianoRollDisplay {
  constructor(csvURL) {
    this.csvURL = csvURL;
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

  preparePianoRollCard(rollId) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('piano-roll-card');

    // Create and append other elements to the card container as needed
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    descriptionDiv.id = rollId;
    descriptionDiv.textContent = `This is a piano roll number ${rollId}`;
    cardDiv.appendChild(descriptionDiv);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('piano-roll-svg');
    svg.setAttribute('width', '80%');
    svg.setAttribute('height', '150');

    // Append the SVG to the card container
    cardDiv.appendChild(svg);
    cardDiv.addEventListener('click', (e) => {
      this.Clickfunction(e);
    })
    return { cardDiv, svg }
  }

  DragFunction(e) {
    console.log(e);
  }

  Clickfunction(e) {
    var main_show = document.getElementById('main_show');
    var list_show = document.getElementById('list_show');
    var node = e.currentTarget.cloneNode(true);
    node.style.width = "100%";
    
    var svg_element = node.getElementsByTagName('svg')[0];
    var cursor = document.createElement('cursor');
    var newDiv = document.createElement('div');
    var copy_svg = svg_element.cloneNode(true);
    
    newDiv.id = "cursor_container";
    newDiv.style.position = 'relative';
    newDiv.appendChild(cursor);
    newDiv.appendChild(copy_svg);
    ///////////////////////////////// Initializing /////////////////////////////////////////
    this.dragstart = 0;
    this.dragend = 0;
    this.currentRegion = null;
    this.IsDragging = false;
    ///////////////////////////////// Initializing /////////////////////////////////////////



    ///////////////////////////////////////////////////// MouseEvent //////////////////////////////////////////////////////////
    copy_svg.addEventListener('mousemove',(e) => {
      e.stopPropagation();
      if(!this.IsDragging) {
      var cursor = newDiv.querySelector('cursor');
      cursor.style.left = ((newDiv.clientWidth - e.currentTarget.clientWidth) /2 + e.offsetX)/newDiv.clientWidth*100 + "%";
      }
      e.preventDefault();
    })
    copy_svg.addEventListener('mousedown',(e) => {
      this.IsDragging = true;
      this.dragstart = (e.offsetX/newDiv.clientWidth*100 > 0 ? e.offsetX/newDiv.clientWidth*100 : 0);
      let region = document.createElement('div');
      this.rate = newDiv.clientWidth / e.currentTarget.clientWidth ;
      region.classList.add('region');
      region.style.zIndex = document.getElementsByClassName['region'] ? document.getElementsByClassName['region'].length : 1;
      region.addEventListener('mousemove',(e) => {
        var cursor = document.getElementsByTagName('cursor')[0];
        e.stopPropagation();
        e.preventDefault();
        cursor.style.left = (e.offsetX - (newDiv.clientWidth - e.currentTarget.clientWidth)/2)/newDiv.clientWidth*100 + "%";
        if(this.IsDragging) {
          
          if(this.dragend > this.dragstart) {
            this.dragend = this.dragend - (e.target.clientWidth - e.offsetX) / newDiv.clientWidth * 100;
            this.currentRegion.style.width = (this.dragend-this.dragstart) + "%";
          }
          else{
            this.diff = e.offsetX - this.diff;
            //console.log(copy_svg.clientWidth, newDiv.clientWidth, this.dragend);
            console.log("offsetx ",e.offsetX, newDiv.clientWidth,e.currentTarget.classList);
            this.dragend = ((newDiv.clientWidth - copy_svg.clientWidth) /2)/newDiv.clientWidth*100 + (this.diff)/e.currentTarget.clientWidth*copy_svg.clientWidth /newDiv.clientWidth* 100;
            console.log("left is " + this.currentRegion.style.left);
            var temp = (Math.abs(newDiv.clientWidth - copy_svg.clientWidth)/2)/newDiv.clientWidth*100;
            console.log("temp is ", (e.offsetX) /newDiv.clientWidth * 100);
            console.log("temp is ", temp);
            console.log("temp is ", temp + this.dragend);
            this.currentRegion.style.left = (this.dragend) + "%";
            this.currentRegion.style.width = (this.dragstart - this.dragend) + "%";
            console.log("left is " + this.currentRegion.style.left);
            console.log("region mousemove");
          }
        }
       // var cursor = document.getElementsByTagName('cursor')[0];
        //cursor.style.left = (e.offsetX - (newDiv.clientWidth - e.currentTarget.clientWidth)/2)/newDiv.clientWidth*100 + "%";
      })
      this.currentRegion = region;
      region.style.left = ((newDiv.clientWidth - e.currentTarget.clientWidth) /2)/newDiv.clientWidth*100 + this.dragstart + "%";
      newDiv.insertBefore(region,newDiv.firstChild);
      //newDiv.appendChild(region);
    });
    
    copy_svg.addEventListener('mousemove', (e) => {
      e.stopPropagation();
        e.preventDefault();
      if(this.IsDragging) {
        
       // e.stopPropagation();
        this.dragend = this.dragend > e.offsetX/newDiv.clientWidth*100 ? this.dragend : e.offsetX/newDiv.clientWidth*100;
        this.dragend = e.offsetX/newDiv.clientWidth*100;
        let dragFinish = 100 - (newDiv.clientWidth - e.currentTarget.clientWidth)/newDiv.clientWidth*100;
        if(this.dragend * this.rate > 100) this.dragend = 100 / this.rate;
        if(this.dragend - this.dragstart < 0) {
          console.log("copy_svg mousemove");
          if(this.dragend < 0) this.dragend = 0;
          this.currentRegion.style.left = ((newDiv.clientWidth - e.currentTarget.clientWidth) /2)/newDiv.clientWidth*100 + this.dragend + "%";
          this.currentRegion.style.width = this.dragstart - this.dragend + "%";
        }
        else {
          this.currentRegion.style.width = this.dragend - this.dragstart + "%";
          this.currentRegion.style.left = ((newDiv.clientWidth - e.currentTarget.clientWidth) /2)/newDiv.clientWidth*100 + this.dragstart + "%";
        }
        var cursor = document.getElementsByTagName('cursor')[0];
        cursor.style.left = ((newDiv.clientWidth - e.currentTarget.clientWidth) /2 + e.offsetX)/newDiv.clientWidth*100 + "%";
      //  e.preventDefault();
      }
    })

    document.addEventListener('mouseup',() => {
      
      if(this.IsDragging) {
      let closeButton = document.createElement('div');
      closeButton.classList.add("delete");
      closeButton.innerText = "X";
      closeButton.addEventListener('click',(e) => {
        e.currentTarget.parentElement.remove();
      })
      
      this.currentRegion.appendChild(closeButton);
      var main_show = document.getElementById('main_show');
      var descriptionDiv = main_show.getElementsByClassName("description")[0];
      const sequenceData = this.data.slice(descriptionDiv.id * 60, descriptionDiv.id * 60 + 60);
      console.log("mouse Up");
      if(this.dragend < this.dragstart) {var temp = this.dragend; this.dragend = this.dragstart; this.dragstart = temp;}
      var result_num = 0;
      var length = sequenceData[sequenceData.length - 1].end - sequenceData[0].start;
      let result = [];
      sequenceData.forEach(note => {
        let start = (note.start - sequenceData[0].start) / length;
        let end = (note.end - sequenceData[0].start) / length ;
        if(start > this.dragstart/100 * this.rate && start < this.dragend * this.rate/100)
        {
          if(end < this.dragend * this.rate / 100)
            result.push(note);
          else  {
            result.push({
                duration : note.duration,
                start: note.start,
                end: this.dragend * this.rate / 100 * length + sequenceData[0].start,
                pitch: note.pitch,
                velocity: note.velocity
            });
          }
          result_num++;
        }
        if(start < this.dragstart/100 * this.rate && end > this.dragstart * this.rate/100)
        {
          if(end > this.dragend * this.rate/100) {
            result.push({
              duration : note.duration,
              start: this.dragstart * this.rate / 100 * length + sequenceData[0].start,
              end: this.dragend * this.rate / 100 * length + sequenceData[0].start,
              pitch: note.pitch,
              velocity: note.velocity
            });
          }
          else 
          {
            result.push({
              duration : note.duration,
              start: this.dragstart * this.rate / 100 * length + sequenceData[0].start,
              end: note.end,
              pitch: note.pitch,
              velocity: note.velocity
            });
          }
          result_num++;
        }
        
      })
      this.dragend = 0;
      console.log(result);
      console.log("there are " + result_num  + " of " + sequenceData.length);
      }
      this.IsDragging = false;
    
    }
    )
    ///////////////////////////////////////////////////// MouseEvent //////////////////////////////////////////////////////////
    node.appendChild(newDiv);
    node.removeChild(svg_element);
    if(main_show.lastChild != null) { main_show.removeChild(main_show.lastChild)}
    while(list_show.firstChild) list_show.removeChild(list_show.firstChild);
    main_show.appendChild(node);
    const pianoRollContainer = document.getElementById('pianoRollContainer');
    var childNodes = pianoRollContainer.childNodes;
    childNodes.forEach(childNode => {
      var node = childNode.cloneNode(true);
      node.style.width = "100%";
      node.style.margin = "0";
      node.addEventListener('click',(e) => {this.Clickfunction(e);});
      list_show.appendChild(node);
    });
    pianoRollContainer.style.display = "none";
    var playcontainer = document.getElementById('play_container');
    playcontainer.style.display = "flex";
  }

  async generateSVGs() {
    if (!this.data) await this.loadPianoRollData();
    if (!this.data) return;
    
    const pianoRollContainer = document.getElementById('pianoRollContainer');
    pianoRollContainer.innerHTML = '';
    for (let it = 0; it < 20; it++) {
      const start = it * 60;
      const end = start + 60;
      const partData = this.data.slice(start, end);

      const { cardDiv, svg } = this.preparePianoRollCard(it)

      pianoRollContainer.appendChild(cardDiv);
      const roll = new PianoRoll(svg, partData);
    }
  }
}

document.getElementById('loadCSV').addEventListener('click', async () => {
  const csvToSVG = new PianoRollDisplay();
  var playcontainer = document.getElementById('play_container');
  playcontainer.style.display = "none";
  var pianoRoll = document.getElementById('pianoRollContainer');
  pianoRoll.style.display = "flex";
  await csvToSVG.generateSVGs();
});


