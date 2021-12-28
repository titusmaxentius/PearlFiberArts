"use strict";

var knitout = require('knitout');

var k = new knitout.Writer({
  carriers: ['1', '2', '3', '4', '5', '6']
});
k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7');
var castOnStitches = 0;
var stitchesPerInch = 0;
var rowsPerInch = 0;
var minNeedle = 0;
var maxNeedle = 0;
var activeRowCounter = 0;
var wasteYarn = '1';

function direction(rowCount) {
  if (rowCount % 2 === 0) {
    var bedDirection = '+';
    var min = minNeedle;
    var max = maxNeedle;
    var increment = 1;
    return {
      bedDirection: bedDirection,
      min: min,
      max: max,
      increment: increment
    };
  } else {
    var _bedDirection = '-';

    var _min = maxNeedle * -1;

    var _max = minNeedle;

    var _increment = -1;

    return {
      bedDirection: _bedDirection,
      min: _min,
      max: _max,
      increment: _increment
    };
  }
} // header functions 


function buildWasteYarn(rows, stitches, yarnCarrier) {
  minNeedle = 0;
  maxNeedle = stitches;

  for (var r = 0; r <= rows; r += 1) {
    var setup = direction(activeRowCounter);
    console.log("Current parameters: \n Bed Direction: " + setup.bedDirection + "\n Min Needle: " + setup.min + "\n Max Needle: " + setup.max + "\n Increment: " + setup.increment);

    if (activeRowCounter === 0) {
      k.rack(0.5);

      for (var n = setup.min; n <= setup.max; n += setup.increment) {
        k.knit(setup.bedDirection, 'f' + n, yarnCarrier);
        k.knit(setup.bedDirection, 'b' + n, yarnCarrier);
      }

      k.rack(0);
      activeRowCounter++;
      console.log("Last completed row: " + activeRowCounter);
    } else {
      for (var _n = setup.min; _n <= setup.max; _n += setup.increment) {
        k.knit(setup.bedDirection, 'f' + _n, yarnCarrier);
        k.knit(setup.bedDirection, 'b' + _n, yarnCarrier);
      }

      activeRowCounter++;
      console.log("Last completed row: " + activeRowCounter);
    }
  }
} // Cast on and insert waste yarn


k["in"](wasteYarn);
buildWasteYarn(5, 5, wasteYarn);
k.write('sleeve.k');