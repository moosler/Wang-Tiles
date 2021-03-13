let grid;
let wangGrid;
let sprite;
let spriteC1;
let spriteC2;
let spriteC3;
let spriteC4;
let spriteC5;
let spriteE1;
let spriteE2;
let tileWidth;
let seed = "123";
let randomizer;
let type = "edge"; //edge;corner;
let drawSprite = false;
let isLooping = true;
let folderName = "2tileWangCorner";
let spriteName = "terrain1";

let imageReferences = {
  terrainC1: "http://www.cr31.co.uk/stagecast/stage/corner/flat.html",
  terrainC2: "http://www.cr31.co.uk/stagecast/stage/corner/ground2.html",
  terrainC3: "http://www.cr31.co.uk/stagecast/stage/corner/grass.html",
  terrainC4: "http://www.cr31.co.uk/stagecast/stage/corner/path.html",
  terrainC5: "http://www.cr31.co.uk/stagecast/stage/corner/ground.html",
  terrainE1: "http://www.cr31.co.uk/stagecast/stage/edge/pipe.html",
};

let radio;
let sel;
let sel2;
let onlyNumbers;
let loopB;
let inp;
let div4;

function preload() {
  let spriteSheet1 = loadJSON(
    "../src/assets/" + folderName + "/" + spriteName + ".json"
  );
  let spriteData1 = loadImage(
    "../src/assets/" + folderName + "/" + spriteName + ".png"
  );
  spriteC1 = new SpriteSheet(spriteSheet1, spriteData1);

  spriteName = "terrain2";
  let spriteSheet2 = loadJSON(
    "../src/assets/" + folderName + "/" + spriteName + ".json"
  );
  let spriteData2 = loadImage(
    "../src/assets/" + folderName + "/" + spriteName + ".png"
  );
  spriteC2 = new SpriteSheet(spriteSheet2, spriteData2);

  spriteName = "terrain3";
  let spriteSheet3 = loadJSON(
    "../src/assets/" + folderName + "/" + spriteName + ".json"
  );
  let spriteData3 = loadImage(
    "../src/assets/" + folderName + "/" + spriteName + ".png"
  );
  spriteC3 = new SpriteSheet(spriteSheet3, spriteData3);

  spriteName = "terrain4";
  let spriteSheet4 = loadJSON(
    "../src/assets/" + folderName + "/" + spriteName + ".json"
  );
  let spriteData4 = loadImage(
    "../src/assets/" + folderName + "/" + spriteName + ".png"
  );
  spriteC4 = new SpriteSheet(spriteSheet4, spriteData4);

  spriteName = "terrain5";
  let spriteSheet5 = loadJSON(
    "../src/assets/" + folderName + "/" + spriteName + ".json"
  );
  let spriteData5 = loadImage(
    "../src/assets/" + folderName + "/" + spriteName + ".png"
  );
  spriteC5 = new SpriteSheet(spriteSheet5, spriteData5);

  folderName = "2tileWangEdge";
  spriteName = "terrain1";
  let spriteSheetE1 = loadJSON(
    "../src/assets/" + folderName + "/" + spriteName + ".json"
  );
  let spriteDataE1 = loadImage(
    "../src/assets/" + folderName + "/" + spriteName + ".png"
  );
  spriteE1 = new SpriteSheet(spriteSheetE1, spriteDataE1);
}
function setup() {
  createCanvas(600, 600);
  frameRate(1);

  let xPos = 610;

  let yPos = 10;
  let inc = 25;

  loopB = createCheckbox("loop", isLooping);
  loopB.changed(checkLoop);
  loopB.position(xPos, yPos);

  yPos += inc;
  let div0 = createDiv("Seed");
  div0.position(xPos, yPos);

  yPos += inc;
  inp = createInput("");
  inp.input(myInputEvent);
  inp.value(seed);
  inp.position(xPos, yPos);

  yPos += inc + inc;
  onlyNumbers = createCheckbox("onlyNumbers", false);
  onlyNumbers.position(xPos, yPos);
  onlyNumbers.changed(oneStep);

  yPos += inc + inc;
  radio = createRadio();
  radio.option("corner");
  radio.option("edge");
  radio.value(type);
  radio.style("width", "160px");
  radio.changed(oneStep);
  radio.position(xPos, yPos);

  yPos += inc + inc;
  let div = createDiv("Select Corner Terrain");
  div.position(xPos, yPos);

  yPos += inc;
  sel = createSelect();
  sel.position(xPos, yPos);
  sel.option("none");
  sel.option("terrainC1");
  sel.option("terrainC2");
  sel.option("terrainC3");
  sel.option("terrainC4");
  sel.option("terrainC5");
  sel.selected("none");
  sel.changed(changeSprites);

  yPos += inc;
  let div2 = createDiv("or select Edge Terrain");
  div2.position(xPos, yPos);

  yPos += inc;
  sel2 = createSelect();
  sel2.position(xPos, yPos);
  sel2.option("none");
  sel2.option("terrainE1");
  sel2.selected("none");
  sel2.changed(changeSprites);

  yPos += inc + inc;
  let div3 = createDiv("images from:");
  div3.position(xPos, yPos);
  yPos += inc;

  div4 = createDiv("");
  div4.position(xPos, yPos);
}

function draw() {
  background(255);
  // grid.draw();

  startLooping(loopB.checked());

  if (!drawSprite) {
    type = radio.value();
  }
  spriteName = sel.value();

  randomizer = new Randomizer(seed);
  grid = new Grid(width, height, 16, 16, tileWidth, tileWidth);
  wangGrid = new WangGrid(grid, type);

  if (drawSprite) {
    sprite.drawGrid(wangGrid);
  } else {
    wangGrid.draw(onlyNumbers.checked());
  }
  seed++;
  inp.value(seed);

  /** Loggings */
  // console.log(wangGrid.mappings);
  // console.log(wangGrid.tiles[10][4]);
  // let left = wangGrid.mappings[14]["right"];
  // let top = wangGrid.mappings[0]["bottom"];
  // console.log(left);
  // console.log(top);
  // wangGrid.getMergedPossibilities(left, top, true);
  // let temp = wangGrid.calcIndex(5, 1, true);
  // console.log(temp);
}
function myInputEvent() {
  seed = this.value();
  oneStep();
}

function oneStep() {
  noLoop();
  loop();
  noLoop();
}

function checkLoop() {
  isLooping = this.checked();
  startLooping(isLooping);
}

function startLooping(l = false) {
  if (l) {
    loop();
  } else {
    noLoop();
  }
}

function changeSprites() {
  let item = this.value();
  setSprite(item);
  if (item in imageReferences) {
    div4.html(imageReferences[item]);
  } else {
    div4.html("");
  }

  // background(200);
  // text("It is a " + item + "!", 600, 200);
}
function setSprite(name) {
  type = "corner";
  switch (name) {
    case "terrainC1":
      sprite = spriteC1;
      break;
    case "terrainC2":
      sprite = spriteC2;
      break;
    case "terrainC3":
      sprite = spriteC3;
      break;
    case "terrainC4":
      sprite = spriteC4;
      break;
    case "terrainC5":
      sprite = spriteC5;
      break;
    case "terrainE1":
      sprite = spriteE1;
      type = "edge";
      break;
    default:
      sprite = spriteC1;
  }
  sprite.createImageArray();
  tileWidth = sprite.getTileDimension()["w"];
  drawSprite = true;
  oneStep();
}
