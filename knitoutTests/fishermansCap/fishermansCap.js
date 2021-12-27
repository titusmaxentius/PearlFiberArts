// Fisherman's Cap - split into four triangles instead of 6 for a swirl 
// Testing using Knitout for the Kniterate 

const knitout = require('knitout');
k = new knitout.Writer({carriers: [
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
let maxNeedle = 180;
let wasteRows = 101;
let ribbingRows = 50;

// Shaping Parameters: 
let sectionCount = 4;
let stitchBuffer = 0;
let sectionSize = (maxNeedle - stitchBuffer) / sectionCount;

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

// Transfer to the front bed since the rib doesn't need full needle capabilities 
for (let n = minNeedle; n <= maxNeedle; n += 1) {
    k.xfer('b' + n, 'f' + n);
}
/*
for (let n = maxNeedle; n >= minNeedle; n -= 1) {
    k.knit('-', 'f' + n, ravelCord);
}
*/
for (let n = minNeedle; n <= maxNeedle; n += 1) {
    k.knit('+', 'f' + n, ravelCord);
} 

k.in(mainColor);

for (let n = maxNeedle; n >= minNeedle; n -= 2) {
    k.knit('-', 'f' + n, mainColor);
}

for (let n = minNeedle; n <= maxNeedle; n += 2) {
    k.knit('+', 'f' + n, mainColor);
} 

for (let n = maxNeedle; n >= minNeedle; n -= 1) {
    k.knit('-', 'f' + n, mainColor);
}

for (let n = minNeedle; n <= maxNeedle; n += 2) {
    k.xfer('f' + n, 'b' + n);
} 
/*
for (let n = maxNeedle; n >= minNeedle; n -= 1) {
    k.knit('-', 'f' + n, mainColor);
    k.knit('-', 'b' + (n+1), mainColor);
}
*/
for (let r = 0; r <= ribbingRows; r += 2){
    for (let n = minNeedle; n <= maxNeedle; n += 2) {
        k.knit('+', 'b' + n, mainColor);
        k.knit('+', 'f' + (n+1), mainColor);
    } 
    for (let n = maxNeedle; n >= minNeedle; n -= 2) {
        k.knit('-', 'f' + n, mainColor);
        k.knit('-', 'b' + (n-1), mainColor);
    }
}

// Start the transfers for shaping 
for (let n = minNeedle; n <= maxNeedle; n += 2) {
    k.xfer('b' + n, 'f' + n);
}
let xferNeedle = 0;
let section = 45;
for (set = 1; set <= 44; set +=1){
    for (let sC = 1; sC < 4; sC += 1) {
        // Start shaping
        for (let n = xferNeedle; n<=maxNeedle; n += 1) {
            if (n === 184) {
                k.xfer('f' + n, 'b' + n);
            } else {
                k.xfer('f' + n, 'b' + n);
            }
        }
        xferNeedle = xferNeedle + section; 
    }
    k.rack(1);
    for (let sC = 1; sC < 4; sC += 1) {
        // Transfer back to front
        for (let n = xferNeedle; n<=maxNeedle; n += 1) {
            if (n === 184) {
                k.xfer('b' + n, 'f' + (n-1));
            } else {
                k.xfer('b' + n, 'f' + (n-1));
            }
        }
        xferNeedle = xferNeedle + section; 
    }
    k.rack(0);
    section = section - 1;
    maxNeedle = maxNeedle -4;
}
//knit transfers 

k.out(mainColor);
k.out(ravelCord);
k.out(wasteYarn);
k.write('fishermanhat.k');
