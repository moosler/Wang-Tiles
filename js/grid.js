class Grid {
  constructor(width, height, col, row, colWidth = null, rowWidth = null) {
    this.width = width;
    this.height = height;
    this.col = col;
    this.row = row;
    this.stepX = this.width / this.col;
    this.stepY = this.height / this.row;
    if (colWidth) {
      this.stepX = colWidth;
      this.width = colWidth * col;
    }
    if (rowWidth) {
      this.stepY = rowWidth;
      this.height = rowWidth * row;
    }
    this.lightBlue = color(30, 139, 195);
    this.textSize = 12;
  }
  draw() {
    rectMode(CENTER);
    textSize(this.textSize);
    strokeWeight(1);
    let linesFinished = false;

    for (var i = 0; i < this.col; i++) {
      let x = i * this.stepX;
      stroke(this.lightBlue);
      line(x, 0, x, this.height);

      for (var j = 0; j < this.row; j++) {
        noFill();
        stroke(this.lightBlue);
        let y = j * this.stepY;
        //only lines one time
        if (!linesFinished) {
          line(0, y, this.width, y);
        }
        this.drawNumbers(i, j, x, y);
      }
      linesFinished = true;
    }
    stroke(this.lightBlue);
    line(0, this.height, this.width, this.height);
    line(this.width, 0, this.width, this.height);
  }

  drawNumbers(i, j, x, y) {
    noStroke();
    fill(this.lightBlue);
    textAlign(CENTER);
    textSize(this.textSize);
    text(
      i + "|" + j,
      x + this.stepX / 2,
      y + this.stepY / 2 + this.textSize / 2
    );
  }
}
