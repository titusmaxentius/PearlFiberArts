const knitout = require('knitout'); 
const k = new knitout.Writer({carriers: [
    '1', '2', '3', '4', '5', '6'
    ]});

k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7');

// Parameters
// Yarn feeders
let ravelCord = '1';
let wasteYarn = '2';
let mainColor = '3';
let contrast = '4';

// Stitches
let minNeedle = 1;
let maxNeedle = 100;
let wasteRows = 70;

let rowCounter = 0; 

k.in(wasteYarn);
k.in(ravelCord);

// Position carriage at the right side of the bed with the waste feeder 
for (let n = minNeedle; n <= maxNeedle; n += 1) {
    if (n === maxNeedle) {
        continue; 
    }
    if ((maxNeedle - n) % 2 === 0) {
        k.knit('+', 'b' + n, wasteYarn);
    } else {
        k.knit('+', 'f' + n, wasteYarn);
    }
}

for (let r = 0; r <= wasteRows; r += 1) {
    if (r % 2 === 0 ) {
        for (let n = maxNeedle; n >= minNeedle; n -= 1) {
            if((maxNeedle - n) % 2 === 0) {
                k.knit("-", 'f' + n, wasteYarn);
            } else {
                k.knit("-", 'b' + n, wasteYarn);
            }
        } 
    } else {
        for (let n = minNeedle; n <= maxNeedle; n += 1) {
            if((maxNeedle - n) % 2 === 0) {
                k.knit("+", 'b' + n, wasteYarn);
            } else {
                k.knit("+", 'f' + n, wasteYarn); 
            }
        }
    }
}

// Ravel Cord
    for(let n = minNeedle; n <= maxNeedle; n +=1) {
        k.knit('+', 'f' + n, ravelCord); 
    }

    // Position carriage at the left to pick up the next color
    for(let n = maxNeedle; n >= minNeedle; n -=1) {
        k.miss("-", "f" + n, ravelCord);
    }

k.in(mainColor);
// First two rows of main color knitting
    for(let n = minNeedle; n <= maxNeedle; n +=1) {
        k.knit('+', 'f' + n, mainColor); 
    }

    for(let n = maxNeedle; n >= minNeedle; n -=1) {
        k.knit("-", "f" + n, mainColor);
    }

    
// Transfers for seed stitch 
for(let n = minNeedle; n <= maxNeedle; n + 2) {
    k.xfer('f' + n, 'b' + n); 
}


k.write('seedstitch.k')