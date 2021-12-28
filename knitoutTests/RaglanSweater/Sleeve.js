const knitout = require('knitout'); 
const k = new knitout.writer({carriers: [
    '1', '2', '3', '4', '5', '6'
    ]});

k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7');

let castOnStitches = 0; 
let stitchesPerInch = 0;
let rowsPerInch = 0; 

let minNeedle = 0; 
let maxNeedle = 0;

// header functions 
function buildWasterYarn(rows, stitches, yarnCarrier) {
    for(let r = 0; r <= rows; r +=1) {
        for (let n = minNeedle; n <= stitches; n += 1) {
            knitSection = k.knit('+', 'f' + n, yarnCarrier);
        }
    }
}

// Cast on and insert waste yarn


k.write('sleeve.k');