"use strict";

var knitout = require('knitout');

var k = new knitout.writer({
  carriers: ['1', '2', '3', '4', '5', '6']
});
k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7');
var castOnStitches = 0;
var stitchesPerInch = 0;
var rowsPerInch = 0;
var minNeedle = 0;
var maxNeedle = 0; // header functions 

function buildWasterYarn(rows, stitches, yarnCarrier) {
  for (var r = 0; r <= rows; r += 1) {
    for (var n = minNeedle; n <= stitches; n += 1) {
      knitSection = k.knit('+', 'f' + n, yarnCarrier);
    }
  }
} // Cast on and insert waste yarn


k.write('sleeve.k');