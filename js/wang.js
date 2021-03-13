class Wang {
  constructor(x, y, w, h, index, type = "corner", tileRef) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.index = index;
    this.parent = tileRef;
    this.textSize = 12;
    this.corners = [];
    this.createQuarters();
  }
  draw(onlyNumbers = false) {
    rectMode(CENTER);
    strokeWeight(1);
    noStroke();
    // rect(this.x, this.y, this.w, this.h);
    if (!onlyNumbers) {
      this.drawQuarters(true);
      // this.drawQuarterLines();
    }
    this.drawInnerRect();
  }
  drawNumbers() {
    noStroke();
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(this.textSize);
    text(this.index, this.x, this.y + this.textSize / 2);
  }
  drawInnerRect() {
    stroke(0, 0, 0);
    fill("#666666");
    rect(this.x, this.y, this.w / 3, this.h / 3);
    this.drawNumbers();
  }
  drawQuarters(debugMode) {
    noStroke();
    if (debugMode) {
      stroke(0, 0, 0);
    }
    if (this.type == "corner") {
      this.drawCorners();
    } else {
      this.drawEdges();
    }
  }
  drawQuarterLines() {
    stroke(0, 0, 0);
    if (this.type == "corner") {
      line(this.x - this.w / 2, this.y, this.x + this.w / 2, this.y);
      line(this.x, this.y - this.h / 2, this.x, this.y + this.h / 2);
    } else {
      line(
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.x + this.w / 2,
        this.y + this.h / 2
      );
      line(
        this.x + this.w / 2,
        this.y - this.h / 2,
        this.x - this.w / 2,
        this.y + this.h / 2
      );
    }
  }
  drawCorners() {
    for (const key in this.corners) {
      if (this.corners.hasOwnProperty(key)) {
        const el = this.corners[key];
        let col = this.calcColor(key);
        el.col = col;
        fill(el.col);
        rect(el.x, el.y, el.w, el.h);
      }
    }
  }
  drawEdges() {
    for (const key in this.corners) {
      if (this.corners.hasOwnProperty(key)) {
        const el = this.corners[key];
        let col = this.calcColor(key);
        el.col = col;
        fill(el.col);
        triangle(el.x1, el.y1, el.x2, el.y2, el.x3, el.y3);
      }
    }
  }

  createQuarters() {
    for (let i = 0; i < 4; i++) {
      let prefX = i < 2 ? 1 : -1;
      let prefY = i % 3 == 0 ? -1 : 1;
      let rect;
      if (this.type == "corner") {
        rect = new Rect(
          this.x + (this.w / 4) * prefX,
          this.y + (this.h / 4) * prefY,
          this.w / 2,
          this.h / 2
        );
      } else {
        rect = new Triangle(
          this.x,
          this.y,
          this.x + (this.w / 2) * prefX,
          this.y - (this.h / 2) * prefX,
          this.x + (this.w / 2) * prefY,
          this.y + (this.h / 2) * prefY
        );
      }

      this.corners.push(rect);
    }
  }
  calcColor(key) {
    if (key == 0) {
      if (this.index % 2 != 0) {
        return this.parent.colors[1];
      }
    } else if (key == 1) {
      if (Math.floor(this.index / 2) % 2 != 0) {
        return this.parent.colors[1];
      }
    } else if (key == 2) {
      if (Math.floor(this.index / 4) % 2 != 0) {
        return this.parent.colors[1];
      }
    } else if (key == 3) {
      if (this.index >= 8) {
        return this.parent.colors[1];
      }
    }
    return this.parent.colors[0];
  }
}

class Rect {
  constructor(x, y, w, h, col = "#fff") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
  }
}

class Triangle {
  constructor(x1, y1, x2, y2, x3, y3, col = "#fff") {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.col = col;
  }
}
