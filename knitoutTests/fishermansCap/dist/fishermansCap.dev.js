"use strict";

// Fisherman's Cap - split into four triangles instead of 6 for a swirl 
// Testing using Knitout for the Kniterate 
var knitout = require('knitout');

k = new knitout.Writer({
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
var maxNeedle = 180;
var wasteRows = 101;
var ribbingRows = 50; // Shaping Parameters: 

var sectionCount = 4;
var stitchBuffer = 0;
var sectionSize = (maxNeedle - stitchBuffer) / sectionCount;
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
} // Transfer to the front bed since the rib doesn't need full needle capabilities 


for (var _n3 = minNeedle; _n3 <= maxNeedle; _n3 += 1) {
  k.xfer('b' + _n3, 'f' + _n3);
}
/*
for (let n = maxNeedle; n >= minNeedle; n -= 1) {
    k.knit('-', 'f' + n, ravelCord);
}
*/


for (var _n4 = minNeedle; _n4 <= maxNeedle; _n4 += 1) {
  k.knit('+', 'f' + _n4, ravelCord);
}

k["in"](mainColor);

for (var _n5 = maxNeedle; _n5 >= minNeedle; _n5 -= 2) {
  k.knit('-', 'f' + _n5, mainColor);
}

for (var _n6 = minNeedle; _n6 <= maxNeedle; _n6 += 2) {
  k.knit('+', 'f' + _n6, mainColor);
}

for (var _n7 = maxNeedle; _n7 >= minNeedle; _n7 -= 1) {
  k.knit('-', 'f' + _n7, mainColor);
}

for (var _n8 = minNeedle; _n8 <= maxNeedle; _n8 += 2) {
  k.xfer('f' + _n8, 'b' + _n8);
}
/*
for (let n = maxNeedle; n >= minNeedle; n -= 1) {
    k.knit('-', 'f' + n, mainColor);
    k.knit('-', 'b' + (n+1), mainColor);
}
*/


for (var _r = 0; _r <= ribbingRows; _r += 2) {
  for (var _n9 = minNeedle; _n9 <= maxNeedle; _n9 += 2) {
    k.knit('+', 'b' + _n9, mainColor);
    k.knit('+', 'f' + (_n9 + 1), mainColor);
  }

  for (var _n10 = maxNeedle; _n10 >= minNeedle; _n10 -= 2) {
    k.knit('-', 'f' + _n10, mainColor);
    k.knit('-', 'b' + (_n10 - 1), mainColor);
  }
} // Start the transfers for shaping 


for (var _n11 = minNeedle; _n11 <= maxNeedle; _n11 += 2) {
  k.xfer('b' + _n11, 'f' + _n11);
}

var xferNeedle = 0;
var section = 45;

for (set = 1; set <= 44; set += 1) {
  for (var sC = 1; sC < 4; sC += 1) {
    // Start shaping
    for (var _n12 = xferNeedle; _n12 <= maxNeedle; _n12 += 1) {
      if (_n12 === 184) {
        k.xfer('f' + _n12, 'b' + _n12);
      } else {
        k.xfer('f' + _n12, 'b' + _n12);
      }
    }

    xferNeedle = xferNeedle + section;
  }

  k.rack(1);

  for (var _sC = 1; _sC < 4; _sC += 1) {
    // Transfer back to front
    for (var _n13 = xferNeedle; _n13 <= maxNeedle; _n13 += 1) {
      if (_n13 === 184) {
        k.xfer('b' + _n13, 'f' + (_n13 - 1));
      } else {
        k.xfer('b' + _n13, 'f' + (_n13 - 1));
      }
    }

    xferNeedle = xferNeedle + section;
  }

  k.rack(0);
  section = section - 1;
  maxNeedle = maxNeedle - 4;
} //knit transfers 


k.out(mainColor);
k.out(ravelCord);
k.out(wasteYarn);
k.write('fishermanhat.k');