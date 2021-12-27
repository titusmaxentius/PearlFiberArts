"use strict";

var knitout = require('knitout');

var k = new knitout.Writer({
  carriers: ['1', '2', '3', '4', '5', '6']
});
k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7'); // Parameters
// Yarn feeders

var ravelCord = '1';
var wasteYarn = '2';
var mainColor = '3';
var contrast = '4'; // Stitches

var minNeedle = 1;
var maxNeedle = 100;
var wasteRows = 70;
var rowCounter = 0;
k["in"](wasteYarn);
k["in"](ravelCord); // Position carriage at the right side of the bed with the waste feeder 

for (var n = minNeedle; n <= maxNeedle; n += 1) {
  if (n === maxNeedle) {
    continue;
  }

  if ((maxNeedle - n) % 2 === 0) {
    k.knit('+', 'b' + n, wasteYarn);
  } else {
    k.knit('+', 'f' + n, wasteYarn);
  }
}

for (var r = 0; r <= wasteRows; r += 1) {
  if (r % 2 === 0) {
    for (var _n = maxNeedle; _n >= minNeedle; _n -= 1) {
      if ((maxNeedle - _n) % 2 === 0) {
        k.knit("-", 'f' + _n, wasteYarn);
      } else {
        k.knit("-", 'b' + _n, wasteYarn);
      }
    }
  } else {
    for (var _n2 = minNeedle; _n2 <= maxNeedle; _n2 += 1) {
      if ((maxNeedle - _n2) % 2 === 0) {
        k.knit("+", 'b' + _n2, wasteYarn);
      } else {
        k.knit("+", 'f' + _n2, wasteYarn);
      }
    }
  }
} // Ravel Cord


for (var _n3 = minNeedle; _n3 <= maxNeedle; _n3 += 1) {
  k.knit('+', 'f' + _n3, ravelCord);
} // Position carriage at the left to pick up the next color


for (var _n4 = maxNeedle; _n4 >= minNeedle; _n4 -= 1) {
  k.miss("-", "f" + _n4, ravelCord);
}

k["in"](mainColor); // First two rows of main color knitting

for (var _n5 = minNeedle; _n5 <= maxNeedle; _n5 += 1) {
  k.knit('+', 'f' + _n5, mainColor);
}

for (var _n6 = maxNeedle; _n6 >= minNeedle; _n6 -= 1) {
  k.knit("-", "f" + _n6, mainColor);
} // Transfers for seed stitch 


for (var _n7 = minNeedle; _n7 <= maxNeedle; _n7 + 2) {
  k.xfer('f' + _n7, 'b' + _n7);
}

k.write('seedstitch.k');