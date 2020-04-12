let img;
let counter=0;
let colour = [0,0,0];
let threshold = 0; 
let limit;
let direction=0;
let blend = 0;
let resize = 0;

function chooseImg() {
    let whichImg = 'http://www.joewrightmusic.co.uk/wp-content/uploads/2020/01/' + int(random(44)) + '.jpg'; 
    // console.log(whichImg);
    img = loadImage(whichImg);
}

//PRELOAD IMG
function preload() {
    chooseImg();
}

//SIZE IMG

//SETUP 
function setup() {
    canvas=createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.parent("p5canv");
    frameRate(30);
    colorMode(RGB, 255, 255,255,1.0);
    canvas.style('z-index', '1');
    img.resize(windowWidth,windowHeight);
    limit=img.width*img.height;
    console.log(limit);
}


//RESIZE DRAWING WHEN WINDOW CHANGED
function windowResized () {
    resizeCanvas(windowWidth, windowHeight);
    resize=1;
}

function getCoord(image, index){
    let x, y;
    y = int(index / img.width) % img.height;
    x = index % img.width;
    return [x,y];
}

function getCoord2(image, index){
    let x, y;
    x = int(index / img.height) % img.width;
    y = index % img.height;
    return [x,y];
}



function renderDown(){
    for(let x=0; x<img.width; x++){
        colour=[0,0,0];
        let coord = getCoord(img, counter);
        let prevCoord = getCoord(img, counter-1);
        let current = img.get(coord[0], coord[1]);
        let prev = img.get(prevCoord[0], prevCoord[1]);
        //some kind of logic
        if(x>1 && x<(img.width-1)){
            for(let i=0; i<3; i++){
                colour=[0,0,0];
                let delta = abs(current[i]-prev[i]);
                if(delta>threshold && coord[0]>0 && coord[0]<img.width-1){
                    colour[i]=(delta-threshold)*0.1;
                    stroke(colour);
                    strokeWeight((delta-threshold)*0.01+1);
                    line(coord[0], coord[1], coord[0], coord[1]+((delta-threshold)*(windowHeight*0.001)   ));
                }
            }
        }
        counter++;
    }
}




//RENDER
function draw() {
    if(resize===1){
        img.resize(windowWidth,windowHeight);
        limit=img.width*img.height;
        console.log(limit);
        resize=0;
    }
    blendMode(BLEND);
    blendMode(SCREEN);
    renderDown();
    
    if(counter>limit){
        counter = 0;
        background(0,0,0,2);
        chooseImg();
        resize=1;
    }
}

