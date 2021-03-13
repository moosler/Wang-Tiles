class SpriteSheet {
  constructor(json, sprite) {
    this.spriteData = json;
    this.spriteSheet = sprite;
    this.images = [];
  }
  createImageArray() {
    let frames = this.spriteData["frames"];

    for (const key in frames) {
      if (frames.hasOwnProperty(key)) {
        const element = frames[key];
        let pos = element["frame"];
        let img = this.spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        this.setImageArray(key, img);
      }
    }
  }

  setImageArray(key, img) {
    let tileArray = this.getFileName(key);

    // name contains multiple dots
    if (!tileArray) {
      this.images.push(img);
    } else {
      let index = tileArray[0];
      if (tileArray.length == 1) {
        this.images[index] = [img];
      } else {
        let index = tileArray[0];
        let secondIndex = tileArray[1];
        if (!(index in this.images)) {
          this.images[index] = [];
        }
        this.images[index][secondIndex] = img;
      }
    }
  }

  getFileName(name) {
    let nam = name.split(".");
    if (nam.length > 2) return false;
    let _name = nam[0].split("_");
    // if (_name.length == 1) return _name[0];

    return _name;
  }
  getTileDimension() {
    let obj = { w: this.images[0][0].width, h: this.images[0][0].height };
    return obj;
  }
  drawGrid(grid) {
    grid.tiles.forEach((cols) => {
      cols.forEach((rows) => {
        this.draw(rows);
      });
    });
  }
  draw(obj) {
    let images = this.images[obj.index];
    let rand = Math.floor(Math.random() * images.length);
    let img = images[rand];
    let shift = this.getTileDimension();
    image(img, obj.x - shift.w / 2, obj.y - shift.h / 2);
  }
}
