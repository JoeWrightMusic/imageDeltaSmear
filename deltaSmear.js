let counter=0;
let img;
let pg;
let indeces = [...Array(1000000).keys()]
let x,y;
let leftEdge;
let colour=[0,0,0];
let threshold=10;

// CHOOSE IMG & RESISE
function chooseImg() {
    let whichImg = 'http://www.joewrightmusic.co.uk/wp-content/uploads/2020/01/' + int(random(44)) + '.jpg'; 
    // console.log(whichImg);
    img = loadImage(whichImg);
    img.resize(1000,1000);
}

// SCRAMBLE ARRAY
function scramble(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

// GET XY
function getXY(index){
    x = index%pg.width;
    y = Math.floor(index/pg.width);
    //at the left edge?
    if(x===0 || x===1499){skip=1}
    else{skip=0}
}

// RENDER DELTA
function renderDelta(){
    //dont draw at edges
    for(let j=0; j<pg.width; j++){
        if(x>2 && x<1498){
            let current = img.get(x, y);
            let prev = img.get(x-1, y);
            for(let i=0; i<3; i++){
                colour=[0,0,0,0.5];
                let delta = abs(current[i]-prev[i]);
                if(delta>threshold){
                    colour[i]=(delta-threshold)*0.3;
                    pg.blendMode(SCREEN);
                    pg.stroke(colour);
                    pg.strokeWeight((delta-threshold)*0.05);
                    pg.line(x, y, x, y+((delta-threshold)*(pg.height*0.0035)   ));
                }
            }
        }
        counter++
        getXY(indeces[counter]);
    }
}


// RESIZE
function windowResized () {
    resizeCanvas(windowWidth, windowHeight);
}

// SETUP
function setup() {
    chooseImg();
    //create canvas
    canvas=createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.parent("p5canv");
    canvas.style('z-index', '1');
    colorMode(RGB,255,255,255,1.0);
    //create off screen graphics
    pg = createGraphics(1500, 1500);
    pg.colorMode(RGB,255,255,255,1.0);
    //set frame rate
    frameRate(120);
    //scramble indeces
    scramble(indeces);
}

// DRAW
function draw() {
    background(0,0,0,0.2);
    renderDelta();
    console.log(counter);
    if(counter>=1000000){
        counter=0;
        chooseImg();
        scramble(indeces);
        console.log('NEW IMAGE')
    }
    //render buffer
    image(pg, 0, 0, windowWidth, windowHeight);
}