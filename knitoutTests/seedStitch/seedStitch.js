
//import the knitout writer code and instantiate it as an object
const knitout = require('knitout');
k = new knitout.Writer({carriers:['1', '2', '3', '4', '5', '6']});

// add some headers relevant to this job
k.addHeader('Machine','Kniterate');
k.addHeader('Gauge','7');

k.addRawOperation('x-xfer-style four-pass');
//k.addRawOperation('x-stitch-number 6');

k.addRawOperation('x-speed-number 200');
k.addRawOperation('x-stitch-number 6');
k.addRawOperation('x-roller-advance 400');

// Parameters
// Yarn feeders
let ravelCord = '1';
let wasteYarn = '2';
let wasteBack = '3';
let mainColor = '4';
let contrast = '5';

// Stitches
let minNeedle = 1;
let maxNeedle = 50;
let wasteRows = 101;
//let ribbingRows = 50;

//let rowCounter = 0;

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

// Knit the waste yarn, interlock, cast on

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

// Transfer to the front bed to then knit the ravel cord
k.addRawOperation('x-speed-number 100');
k.addRawOperation('x-roller-advance 150');

for (let n = minNeedle; n <= maxNeedle; n +=1) {
    k.xfer('b' + n, 'f' + n);
}

for (let n = minNeedle; n <= maxNeedle; n += 1) {
    k.knit('+', 'f' + n, ravelCord);
} 

k.in(mainColor);
// Rack the beds so that they don't collide, and then knit a full-needle rib, before switching to circular to complete the cast on
k.rack(0.25);

for (let n = minNeedle; n <= maxNeedle; n += 1) {
    k.knit('+', 'f' + n, mainColor);
    k.knit('+', 'b' + n, mainColor);
    
}
k.rack(0);

k.addRawOperation('x-speed-number 150');
k.addRawOperation('x-roller-advance 500');

for (let r = 1; r <= 2; r+=1) {
    if (r % 2=== 0) {
        for (let n = maxNeedle; n >= minNeedle; n -= 1 ) {
            k.knit('-', 'b' + n, mainColor);
        }
    } else {
        for (let n = minNeedle; n <= maxNeedle; n += 1) {
            k.knit('+', 'f' + n, mainColor);
        }
    }
}

// xfer to the front bed, again
k.addRawOperation('x-speed-number 100');
k.addRawOperation('x-roller-advance 150');
for (let n = minNeedle; n <= maxNeedle; n+=1) {
    k.xfer('b' + n, 'f'+n); 
}

k.addRawOperation('x-speed-number 150');
k.addRawOperation('x-roller-advance 500');
// knit a single row of main color
for (let n = maxNeedle; n >= minNeedle; n-=1) {
    k.knit('-', 'f'+n, mainColor);
}

// setup the needle bed for a 1:1 split
k.addRawOperation('x-speed-number 100');
k.addRawOperation('x-roller-advance 150');
/*
for (let n = minNeedle; n <= maxNeedle; n += 2 ) {
    k.xfer('f' + n, 'b' + n)
}
*/

for (let sequence = 1; sequence <= 100; sequence +=1) {
    if (sequence % 2 === 0 ) {
        k.addRawOperation('x-speed-number 100');
        k.addRawOperation('x-roller-advance 150');
        for (let n = minNeedle; n <= maxNeedle; n += 1) {
            if (n % 2 === 0) {
                k.xfer('b' + n, 'f' + n);
            } else {
                k.xfer('f' + n, 'b' + n);
            }
        }
        k.addRawOperation('x-speed-number 150');
        k.addRawOperation('x-roller-advance 500');
        for (let r = 0; r < 2; r += 1) {
            if (r % 2 === 0) {
                for (let n = minNeedle; n <= maxNeedle; n += 1){
                    if (n % 2 === 0) {
                        k.knit('+', 'f' + n, mainColor);
                    } else {
                        k.knit('+', 'b' + n, mainColor);
                    }
                }    
            } else {
                for (let n = maxNeedle; n >= minNeedle; n -= 1){
                    if (n % 2 === 0) {
                        k.knit('-', 'f' + n, mainColor);
                    } else {
                        k.knit('-', 'b' + n, mainColor);
                    }
                }
            }
        }
    } else {
        k.addRawOperation('x-speed-number 100');
        k.addRawOperation('x-roller-advance 150');
        for (let n = minNeedle; n <= maxNeedle; n += 1) {
            if (n % 2 === 0) {
                k.xfer('f' + n, 'b' + n);
            } else {
                k.xfer('b' + n, 'f' + n);
            }
        }
        
        k.addRawOperation('x-speed-number 150');
        k.addRawOperation('x-roller-advance 500');
        for (let r = 0; r < 2; r += 1) {
            if (r % 2 === 0) {
                for (let n = minNeedle; n <= maxNeedle; n += 1){
                    if (n % 2 === 0) {
                        k.knit('+', 'b' + n, mainColor);
                    } else {
                        k.knit('+', 'f' + n, mainColor);
                    }
                }    
            } else {
                for (let n = maxNeedle; n >= minNeedle; n -= 1){
                    if (n % 2 === 0) {
                        k.knit('-', 'b' + n, mainColor);
                    } else {
                        k.knit('-', 'f' + n, mainColor);
                    }
                }
            }
        }
    }
}

k.out(wasteYarn);
k.out(ravelCord);
k.out(mainColor);

k.write('seedStitch.k');

