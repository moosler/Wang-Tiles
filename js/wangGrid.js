class WangGrid {
  constructor(grid, type = "corner") {
    this.grid = grid;
    this.tiles = [];
    this.maxIndex = 15;
    this.type = type;
    this.colorNo = 2;
    this.colors = ["#3399CC", "#CBCB40", "#669933", "#996699"];
    this.mappings = [];
    this.init();
  }
  init() {
    this.setMappings();
    this.createTiles();
    this.setIndex();
  }
  createTiles(rand = true) {
    for (let i = 0; i < this.grid.col; i++) {
      let rows = [];
      for (let j = 0; j < this.grid.row; j++) {
        let x = i * grid.stepX + grid.stepX / 2;
        let y = j * grid.stepY + grid.stepY / 2;

        let index = j % 16;
        if (rand) {
          index = randomizer.getRand(0, 16);
        }
        let wang = new Wang(
          x,
          y,
          this.grid.stepX,
          this.grid.stepY,
          index,
          this.type,
          this
        );
        rows.push(wang);
      }
      this.tiles.push(rows);
    }
  }

  setIndex() {
    for (let i = 0; i < this.tiles.length; i++) {
      let cols = this.tiles[i];
      for (let j = 0; j < cols.length; j++) {
        let tile = this.tiles[i][j];
        let tileBeforeLeftIndex = null;
        let tileBeforeTopIndex = null;
        if (i != 0) {
          let tileBeforeLeft = this.tiles[i - 1][j];
          tileBeforeLeftIndex = tileBeforeLeft.index;
        }
        if (j != 0) {
          let tileBeforeTop = this.tiles[i][j - 1];
          tileBeforeTopIndex = tileBeforeTop.index;
        }
        let index = this.calcIndex(tileBeforeLeftIndex, tileBeforeTopIndex);
        tile.index = index;
      }
    }
  }
  draw(onlyNumbers = false) {
    this.tiles.forEach((cols) => {
      cols.forEach((rows) => {
        rows.draw(onlyNumbers);
      });
    });
  }
  calcIndex(indexLeft, indexBottom) {
    let posLeft;
    let posBottom;

    //all except the left column
    if (indexLeft != null) {
      posLeft = this.mappings[indexLeft]["right"];
      if (indexBottom === null) {
        return this.calcRandIndex(posLeft);
      }
    }
    //all except the top row
    if (indexBottom !== null) {
      posBottom = this.mappings[indexBottom]["bottom"];
      if (indexLeft === null) {
        return this.calcRandIndex(posBottom);
      }
    }
    if (indexLeft !== null && indexBottom !== null) {
      return this.getMergedPossibilities(posLeft, posBottom);
    }

    //First value !indexLeft && !indexBottom
    return randomizer.getRand(0, this.maxIndex + 1);
  }

  getMergedPossibilities(posLeft, posBottom) {
    let duplicates = posLeft.filter(function (val) {
      return posBottom.indexOf(val) != -1;
    });

    return this.calcRandIndex(duplicates);
  }

  calcRandIndex(possibilities) {
    let newIndex;
    let randVal = randomizer.getRand(0, possibilities.length);
    newIndex = possibilities[randVal];
    return newIndex;
  }

  /** mappingCalculator
   * returns this
   * let mappingLeft = [
      [0, 4, 8, 12], //0
      [0, 4, 8, 12], //1
      [0, 4, 8, 12], //2
      [0, 4, 8, 12], //3
      //
      [2, 6, 10, 14], //4
      [2, 6, 10, 14], //5
      [2, 6, 10, 14], //6
      [2, 6, 10, 14], //7
      //
      [1, 5, 9, 13], //8
      [1, 5, 9, 13], //9
      [1, 5, 9, 13], //10
      [1, 5, 9, 13], //11
      //
      [3, 7, 11], //12
      [3, 7, 11], //13
      [3, 7, 11], //14
      [3, 7, 11], //15
    ]; */
  setMappings() {
    if (this.type == "edge") {
      this.setMappingsEdge();
      return;
    }
    let arr = [];
    for (let i = 0; i <= 15; i++) {
      let obj = {
        top: [],
        bottom: [],
        left: [],
        right: [],
      };
      let nei = false;
      let sei = false;
      let swi = false;
      let nwi = false;
      if (i % 2 != 0) {
        nei = true;
      }
      if (Math.floor(i / 2) % 2 != 0) {
        sei = true;
      }
      if (Math.floor(i / 4) % 2 != 0) {
        swi = true;
      }
      if (i >= 8) {
        nwi = true;
      }
      for (let j = 0; j <= 15; j++) {
        let nej = false;
        let sej = false;
        let swj = false;
        let nwj = false;
        if (j % 2 != 0) {
          nej = true;
        }
        if (Math.floor(j / 2) % 2 != 0) {
          sej = true;
        }
        if (Math.floor(j / 4) % 2 != 0) {
          swj = true;
        }
        if (j >= 8) {
          nwj = true;
        }

        //top
        if (nei == sej && nwi == swj) {
          obj["top"].push(j);
        }
        //bottom
        if (sei == nej && swi == nwj) {
          obj["bottom"].push(j);
        }
        //left
        if (nwi == nej && swi == sej) {
          obj["left"].push(j);
        }
        //right
        if (nei == nwj && sei == swj) {
          obj["right"].push(j);
        }
      }
      arr.push(obj);
    }
    this.mappings = arr;
  }

  setMappingsEdge() {
    // let obj = {
    //   n_ne_blue: [0, 2, 4, 6, 8, 10, 12, 14],
    //   e_se_blue: [0, 1, 4, 5, 8, 9, 12, 13],
    //   s_se_blue: [0, 1, 2, 3, 8, 9, 10, 11],
    //   w_nw_blue: [0, 1, 2, 3, 4, 5, 6, 7],
    // };
    let n_ne_blue = [],
      e_se_blue = [],
      s_se_blue = [],
      w_nw_blue = [],
      n_ne_ye = [],
      e_se_ye = [],
      s_se_ye = [],
      w_nw_ye = [];

    // let fullArr = [...Array(15).keys()];
    // let difference = n_ne_blue.filter((x) => !fullArr.includes(x));
    for (let i = 0; i <= 15; i++) {
      if (Math.floor(i) % 2 == 0) {
        n_ne_blue.push(i);
      } else {
        n_ne_ye.push(i);
      }
      if (Math.floor(i / 2) % 2 == 0) {
        e_se_blue.push(i);
      } else {
        e_se_ye.push(i);
      }
      if (Math.floor(i / 4) % 2 == 0) {
        s_se_blue.push(i);
      } else {
        s_se_ye.push(i);
      }
      if (Math.floor(i / 8) % 2 == 0) {
        w_nw_blue.push(i);
      } else {
        w_nw_ye.push(i);
      }
    }

    let arr = [];
    for (let i = 0; i <= 15; i++) {
      let obj = {
        top: [],
        bottom: [],
        left: [],
        right: [],
      };
      if (w_nw_blue.indexOf(i) != -1) {
        obj["left"] = e_se_blue;
      } else {
        obj["left"] = e_se_ye;
      }
      if (e_se_blue.indexOf(i) != -1) {
        obj["right"] = w_nw_blue;
      } else {
        obj["right"] = w_nw_ye;
      }
      if (n_ne_blue.indexOf(i) != -1) {
        obj["top"] = s_se_blue;
      } else {
        obj["top"] = s_se_ye;
      }
      if (s_se_blue.indexOf(i) != -1) {
        obj["bottom"] = n_ne_blue;
      } else {
        obj["bottom"] = n_ne_ye;
      }
      arr.push(obj);
    }
    this.mappings = arr;
  }
}
