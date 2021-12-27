"use strict";

// Ribbed Hat: Written in KnitoutJS 
// Testing using: 
//  Interlocked waste yarn cast on 
//  One color 2x2 rib with full fashioned decreases
// Initially Created: 22 Dec 2021
var knitout = require('knitout');

k = new knitout.Writer({
  carriers: ['1', '2', '3', '4', '5', '6']
});
k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7'); // Machine Setup

k.addRawOperation('x-xfer-style four-pass');
k.addRawOperation('x-stitch-number 5'); // Parameters: 
// Yarn feeders

var ravelCord = '1';
var wasteYarn = '2';
var mainColor = '3';
var contrast = '4'; // Stitches

var minNeedle = 1;
var maxNeedle = 184;
var wasteRows = 100; // Shaping Parameters: 

var sectionCount = 6;
var stitchBuffer = 4;
var sectionSize = (maxNeedle - stitchBuffer) / sectionCount;
k.addRawOperation('x-speed-number 500');
k.addRawOperation('x-stitch-number 5');
k.addRawOperation('x-roller-advance 400'); // Prepare for Cast On 

k["in"](wasteYarn);
k["in"](ravelCord);
k["in"](mainColor);

for (var n = minNeedle; n <= maxNeedle; n += 1) {
  if (n === maxNeedle) {
    continue;
  }

  if ((maxNeedle - n) % 2 === 0) {
    k.knit("+", 'b' + n, wasteYarn);
  } else {
    k.knit("+", 'f' + n, wasteYarn);
  }
} // --- Waste yarn interlock knitting, from CMU ---


for (var _r = 0; _r <= wasteRows; _r += 1) {
  if (_r % 2 === 0) {
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
} // --- Switch to circular for 10 rows to solidify cast on ---


for (var _r2 = 1; _r2 <= 10; _r2 += 1) {
  if (_r2 % 2 === 0) {
    for (var _n3 = maxNeedle; _n3 >= minNeedle; _n3 -= 1) {
      k.knit("-", 'b' + _n3, wasteYarn);
    }
  } else {
    for (var _n4 = minNeedle; _n4 <= maxNeedle; _n4 += 1) {
      k.knit("+", 'f' + _n4, wasteYarn);
    }
  }
}

for (var _n5 = minNeedle; _n5 <= maxNeedle; _n5 += 1) {
  k.drop('b' + _n5);
}

k.addRawOperation('x-carrier-spacing 4');
k.addRawOperation('x-carrier-stopping-distance 8.5');
k.addRawOperation('x-stitch-number 5');

for (var _r3 = 1; _r3 < 3; _r3 += 1) {
  if (_r3 % 2 === 0) {
    for (var _n6 = maxNeedle; _n6 >= minNeedle; _n6 -= 1) {
      k.knit("-", 'f' + _n6, ravelCord);
    }
  } else {
    for (var _n7 = minNeedle; _n7 <= maxNeedle; _n7 += 1) {
      k.knit("+", 'f' + _n7, ravelCord);
    }
  }
}

k.pause('Waste complete');
k.rack(0.25);
k.addRawOperation('x-speed-number 100');
k.addRawOperation('x-stitch-number 9');
k.addRawOperation('x-roller-advance 500');

for (var _r4 = 0; _r4 <= 2; _r4 += 1) {
  if (_r4 % 2 === 0) {
    for (var _n8 = maxNeedle; _n8 >= minNeedle; _n8 -= 1) {
      k.knit("-", 'f' + _n8, mainColor);
    }
  } else {
    for (var _n9 = minNeedle; _n9 <= maxNeedle; _n9 += 1) {
      k.knit("+", 'f' + _n9, mainColor);
    }
  }
}

k.rack(0);
k.pause("Cast on complete"); // Transfer from single bed to 2x2 ribbing
// Start by slowing down the machine and adjusting the roll amount

k.addRawOperation('x-speed-number 100');
k.addRawOperation('x-roller-advance 150');

for (var _n10 = minNeedle; _n10 <= maxNeedle; _n10 += 4) {
  k.xfer('f' + _n10, 'b' + _n10);
  k.xfer('f' + (_n10 + 1), 'b' + (_n10 + 1));
  k.xfer('b' + (_n10 + 2), 'f' + (_n10 + 2));
  k.xfer('b' + (_n10 + 3), 'f' + (_n10 + 3));
}

for (var _n11 = minNeedle; _n11 <= maxNeedle - 3; _n11 += 4) {
  k.knit('+', 'b' + _n11, mainColor);
  k.knit('+', 'b' + (_n11 + 1), mainColor);
  k.knit('+', 'f' + (_n11 + 2), mainColor);
  k.knit('+', 'f' + (_n11 + 3), mainColor);
} // Speed up the process and get back to normal rolling


k.addRawOperation('x-speed-number 500');
k.addRawOperation('x-roller-advance 500'); // knit ribbed band - parameterize this later

var r = 0;

for (var _r5 = 0; _r5 <= 100; _r5 += 1) {
  if (_r5 % 2 === 0) {
    for (var _n12 = maxNeedle; _n12 >= minNeedle; _n12 -= 4) {
      k.knit("-", 'f' + _n12, mainColor);
      k.knit("-", 'f' + (_n12 - 1), mainColor);
      k.knit("-", 'b' + (_n12 - 2), mainColor);
      k.knit("-", 'b' + (_n12 - 3), mainColor);
    }
  } else {
    for (var _n13 = minNeedle; _n13 <= maxNeedle; _n13 += 4) {
      k.knit("+", 'b' + _n13, mainColor);
      k.knit("+", 'b' + (_n13 + 1), mainColor);
      k.knit("+", 'f' + (_n13 + 2), mainColor);
      k.knit("+", 'f' + (_n13 + 3), mainColor);
    }
  }
} // Begin process of fully fashioned decreases


k.addRawOperation('x-roller-advance 250'); // Adjust roll amount/speed

k.addRawOperation('x-speed-number 150');

for (var _n14 = minNeedle; _n14 <= maxNeedle; _n14 += 4) {
  k.xfer('b' + _n14, 'f' + _n14);
  k.xfer('b' + (_n14 + 1), 'f' + (_n14 + 1));
} // Knit a row to establish the stitches following the transfer
// Carriage goes to the right


if (r % 2 === 0) {
  for (var _n15 = minNeedle; _n15 <= maxNeedle; _n15 += 1) {
    k.knit('+', 'f' + _n15, mainColor);
  }
}

var stitchCount = 180;
var newCount = stitchCount;
var shapeMaxNeedle = newCount + stitchBuffer;
var shapeMinNeedle = stitchBuffer + 1;
console.log("Begin Shaping: ");

for (var totalStitchCount = stitchCount + stitchBuffer; totalStitchCount > sectionCount + stitchBuffer & totalStitchCount > 0; totalStitchCount -= sectionCount) {
  maxNeedle = totalStitchCount;
  console.log("Section Size: " + sectionSize);
  console.log("Total Stitch Count: " + totalStitchCount);
  console.log("Starting Needle: " + minNeedle);
  console.log("Ending Needle: " + maxNeedle);
  k.addRawOperation('x-speed-number 200');
  k.addRawOperation('x-roller-advance 0');

  for (var cS = 1; cS <= sectionCount; cS += 1) {
    // xfer: Start at buffer needle + 1, go to the end, then increment by the section size
    k.rack(0);

    for (var _n16 = stitchBuffer + 2 + cS * (sectionSize - 1); _n16 <= maxNeedle + 1; _n16 += 1) {
      k.xfer('f' + _n16, 'b' + _n16);
    }

    k.rack(-1);

    for (var _n17 = stitchBuffer + 2 + cS * (sectionSize - 1); _n17 <= maxNeedle + 1; _n17 += 1) {
      k.xfer('b' + _n17, 'f' + (_n17 - 1));
    }

    k.rack(0);
  }

  for (var i = 1; i < 3; i += 1) {
    if (i % 2 === 0) {
      for (var _n18 = minNeedle; _n18 <= maxNeedle - 5; _n18 += 1) {
        k.addRawOperation('x-speed-number 400');
        k.addRawOperation('x-roller-advance 250');
        k.knit('+', 'f' + _n18, mainColor);
      }
    } else {
      for (var _n19 = maxNeedle - 5; _n19 >= minNeedle; _n19 -= 1) {
        k.addRawOperation('x-speed-number 400');
        k.addRawOperation('x-roller-advance 500');
        k.knit('-', 'f' + _n19, mainColor);
      }
    }
  }

  sectionSize -= 1;
}

maxNeedle = maxNeedle - 5;
k.pause("Shaping complete");
k.addRawOperation('x-speed-number 400');
k.addRawOperation('x-stitch-number 6');
k.addRawOperation('x-roller-advance 450'); // Begin drop function
// Ravel cord

for (var _i = 1; _i < 2; _i += 1) {
  if (_i % 2 === 0) {
    for (var _n20 = minNeedle; _n20 <= maxNeedle; _n20 += 1) {
      k.knit('+', 'f' + _n20, ravelCord);
    }
  } else {
    for (var _n21 = maxNeedle; _n21 >= minNeedle; _n21 -= 1) {
      k.knit('-', 'f' + _n21, ravelCord);
    }
  }
} // Waste Yarn 


for (var _i2 = 2; _i2 < 50; _i2 += 1) {
  if (_i2 % 2 === 0) {
    for (var _n22 = minNeedle; _n22 <= maxNeedle; _n22 += 1) {
      k.knit('+', 'f' + _n22, wasteYarn);
    }
  } else {
    for (var _n23 = maxNeedle; _n23 >= minNeedle; _n23 -= 1) {
      k.knit('-', 'f' + _n23, wasteYarn);
    }
  }
}

for (var _n24 = minNeedle; _n24 <= maxNeedle; _n24 += 1) {
  k.drop('f' + _n24);
}

k.out(wasteYarn);
k.out(ravelCord);
k.out(mainColor); // Export the final file

k.write('ribbedHat.k');