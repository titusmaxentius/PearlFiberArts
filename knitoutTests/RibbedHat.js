// Ribbed Hat: Written in KnitoutJS 
// Testing using: 
//  Interlocked waste yarn cast on 
//  One color 2x2 rib with full fashioned decreases

// Initially Created: 22 Dec 2021

const knitout = require('knitout');
k = new knitout.Writer({carriers: [
    '1', '2', '3', '4', '5', '6'
]});

k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7');

// Machine Setup
k.addRawOperation('x-xfer-style four-pass');
k.addRawOperation('x-stitch-number 5');

// Parameters: 
    // Yarn feeders
    let ravelCord = '1';
    let wasteYarn = '2';
    let mainColor = '3';
    let contrast = '4';

    // Stitches
    let minNeedle = 1;
    let maxNeedle = 184;
    let wasteRows = 100;
    
    // Shaping Parameters: 
    let sectionCount = 6;
    let stitchBuffer = 4;
    let sectionSize = (maxNeedle - stitchBuffer) / sectionCount;

// Prepare for Cast On 
k.in(wasteYarn);
for (let n = minNeedle; n <= maxNeedle; n += 1) {
    if(n === maxNeedle) {
        continue;
    }
    if ((maxNeedle - n) % 2 === 0) {
        k.knit("+", 'b' + n, wasteYarn);
    } else {
        k.knit("+", 'f' + n, wasteYarn);
    }
}

// --- Waste yarn interlock knitting, from CMU ---
for (let r = 0; r <= wasteRows; r += 1) {
    if (r % 2 === 0) {
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

// --- Switch to circular for 10 rows to solidify cast on ---
for (let r = 1; r <= 10; r += 1) {
    if (r % 2 === 0) {
        for (let n = maxNeedle; n >= minNeedle; n -= 1) {
            k.knit("-", 'b' + n, wasteYarn);
        }
    } else {
        for (let n = minNeedle; n <= maxNeedle; n += 1) {
            k.knit("+", 'f' + n, wasteYarn);
        }
    }
}

for (let n = minNeedle; n <= maxNeedle; n += 1) {
    k.drop('b' + n);
}

k.in(ravelCord);
k.addRawOperation('x-stitch-number 5');
for (let r = 1; r <= 1; r += 1) {
    if (r % 2 === 0) {
        for (let n = maxNeedle; n >= minNeedle; n -= 1) {
            k.knit("-", 'f' + n, ravelCord);
        }
    } else {
        for (let n = minNeedle; n <= maxNeedle; n += 1) {
            k.knit("+", 'f' + n, ravelCord);
        }
    }
}

k.in(mainColor);
k.rack(0.25);
k.addRawOperation('x-speed-number 300');
k.addRawOperation('x-stitch-number A');
k.addRawOperation('x-roller-advance 500');

for (let n = maxNeedle; n >= minNeedle; n -= 1) {
    k.knit("-", 'b' + n, mainColor);
    k.knit("-", 'f' + n, mainColor);
}

k.rack(0);

k.comment("Cast on complete");

// Transfer from single bed to 2x2 ribbing
// Start by slowing down the machine and adjusting the roll amount
k.addRawOperation('x-speed-number 100');
k.addRawOperation('x-roller-advance 150');

for (let n = minNeedle; n <= maxNeedle; n += 4) {
    k.xfer('f'+ n, 'b' + n);
    k.xfer('f' + (n+1), 'b' + (n+1));
    k.xfer('b' + (n+2), 'f' + (n+2));
    k.xfer('b' + (n+3), 'f' + (n+3));
}

for (let n = minNeedle; n <= (maxNeedle-3); n += 4) {
    k.knit('+', 'b' + n, mainColor);
    k.knit('+', 'b' + (n + 1), mainColor);
    k.knit('+', 'f' + (n + 2), mainColor);
    k.knit('+', 'f' + (n + 3), mainColor);
}

// Speed up the process and get back to normal rolling
k.addRawOperation('x-speed-number 400');
k.addRawOperation('x-roller-advance 500');

// knit ribbed band - parameterize this later
let r = 0;
for (let r = 1; r <= 100; r +=1) {
    if (r % 2 === 0) {
        for (let n = maxNeedle; n >= (minNeedle); n -= 4) {
            k.knit("-", 'f' + n, mainColor);
            k.knit("-", 'f' + (n - 1), mainColor);
            k.knit("-", 'b' + (n - 2), mainColor);
            k.knit("-", 'b' + (n - 3), mainColor);
        }
    } else {
        for (let n = minNeedle; n <= (maxNeedle); n += 4) {
            k.knit("+", 'b' + n, mainColor);
            k.knit("+", 'b' + (n + 1), mainColor);
            k.knit("+", 'f' + (n + 2), mainColor);
            k.knit("+", 'f' + (n + 3), mainColor);
        }
    }
}


// Begin process of fully fashioned decreases
k.addRawOperation('x-roller-advance 250'); // Adjust roll amount/speed
k.addRawOperation('x-speed-number 150');
for (let n = minNeedle; n <= maxNeedle; n += 4) {
    k.xfer('b' + n, 'f' + n);
    k.xfer('b' + (n + 1), 'f' + (n + 1));
}

// Knit a row to establish the stitches following the transfer
// Carriage goes to the right
if (r % 2 === 0) {
    for (let n = minNeedle; n <= maxNeedle; n += 1) {
        k.knit('+', 'f' + n, mainColor);
    }
}

let stitchCount = 180;
let newCount = stitchCount;
let shapeMaxNeedle = newCount + stitchBuffer;
let shapeMinNeedle = (stitchBuffer + 1);

console.log(`Begin Shaping: `);
for (let totalStitchCount = (stitchCount + stitchBuffer); totalStitchCount > (sectionCount + stitchBuffer) & totalStitchCount >0; totalStitchCount -= sectionCount) {
    maxNeedle = totalStitchCount;
    console.log(`Section Size: ` + sectionSize);
    console.log(`Total Stitch Count: ` + totalStitchCount)
    console.log(`Starting Needle: ` + minNeedle);
    console.log(`Ending Needle: ` + maxNeedle);
    k.addRawOperation('x-speed-number 150');
    k.addRawOperation('x-roller-advance 0');
    for (let cS = 1; cS <= (sectionCount); cS += 1) {
        
        // xfer: Start at buffer needle + 1, go to the end, then increment by the section size
        k.rack(0);
        for (let n = ((stitchBuffer + 2) + (cS * (sectionSize - 1))); n <= maxNeedle; n +=1 ) {
            k.xfer('f' + n, 'b' + n);    
        }
            k.rack(-1);
        for (let n = ((stitchBuffer + 2) + (cS * (sectionSize-1))); n <= maxNeedle; n +=1 ) {
            k.xfer('b' + n, 'f' + (n-1));    
        }

        k.rack(0);
    }
    
    for (let i = 1; i < 3; i += 1) {
        if (i % 2 === 0) {
            for (let n = minNeedle; n <= (maxNeedle - 5); n += 1) {
                k.addRawOperation('x-speed-number 400');
                k.addRawOperation('x-roller-advance 250');
                k.knit('+', 'f' + n, mainColor);
            }
        } else {
            for (let n = (maxNeedle - 5); n >= minNeedle; n -= 1) {
                k.addRawOperation('x-speed-number 400');
                k.addRawOperation('x-roller-advance 500');
                k.knit('-', 'f' + n, mainColor);
            }
        }
    }

    sectionSize -= 1;
}
maxNeedle = (maxNeedle - 5)
k.comment("Shaping complete");

k.addRawOperation('x-speed-number 400');
k.addRawOperation('x-stitch-number 6');
k.addRawOperation('x-roller-advance 450');

// Begin drop function
// Ravel cord
    for (let i = 1; i < 2; i += 1) {
        if (i % 2 === 0) {
            for (let n = minNeedle; n <= maxNeedle; n += 1) {
                k.knit('+', 'f' + n, ravelCord);
            }
        } else {
            for (let n = maxNeedle; n >= minNeedle; n -= 1) {
                k.knit('-', 'f' + n, ravelCord);
            }
        }
    }
    // Waste Yarn 
    for (let i = 2; i < 50; i += 1) {
        if (i % 2 === 0) {
            for (let n = minNeedle; n <= maxNeedle; n += 1) {
                k.knit('+', 'f' + n, wasteYarn);
            }
        } else {
            for (let n = maxNeedle; n >= minNeedle; n -= 1) {
                k.knit('-', 'f' + n, wasteYarn);
            }
        }
    }

for (let n = minNeedle; n <= maxNeedle; n += 1) {
    k.drop('f' + n);
}

k.out(mainColor);
k.out(ravelCord);
k.out(wasteYarn);
// Export the final file
k.write('ribbedHat.k');