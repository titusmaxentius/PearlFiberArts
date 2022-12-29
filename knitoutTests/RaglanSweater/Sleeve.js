const knitout = require('knitout'); 
const k = new knitout.Writer({carriers: [
    '1', '2', '3', '4', '5', '6'
    ]});

k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7');

let castOnStitches = 0; 
let stitchesPerInch = 0;
let rowsPerInch = 0; 

let minNeedle = 0; 
let maxNeedle = 0;
let activeRowCounter = 0;

let wasteYarn = '1';

function direction(rowCount) {
    if (rowCount % 2 === 0) {
        let bedDirection = '+';
        let min = minNeedle;
        let max = maxNeedle
        let increment = 1
        return {
            bedDirection, 
            min, 
            max,
            increment
        };
    } else {
        let bedDirection = '-';
        let min = (maxNeedle * -1);
        let max = minNeedle;
        let increment = -1;
        return {
            bedDirection, 
            min, 
            max, 
            increment
        };
    }
}

// header functions 
function buildWasteYarn(rows, stitches, yarnCarrier) {
    minNeedle = 0;
    maxNeedle = stitches;

    for(let r = 0; r <= rows; r +=1) {
        let setup = direction(activeRowCounter);
        console.log(`Current parameters: \n Bed Direction: ` + setup.bedDirection + `\n Min Needle: ` + setup.min + `\n Max Needle: ` + setup.max + `\n Increment: ` + setup.increment);
        if (activeRowCounter === 0) {
            k.rack(0.5);
            for (let n = setup.min; n <= setup.max; n += setup.increment) {
                k.knit(setup.bedDirection, 'f' + n, yarnCarrier);
                k.knit(setup.bedDirection, 'b' + n, yarnCarrier);
            }
            k.rack(0);
            activeRowCounter++;
            console.log(`Last completed row: ` + activeRowCounter);
        } else {
            for (let n = setup.min; n <= setup.max; n += setup.increment) {
                k.knit(setup.bedDirection, 'f' + n, yarnCarrier);
                k.knit(setup.bedDirection, 'b' + n, yarnCarrier);
            }
            activeRowCounter++;
            console.log(`Last completed row: ` + activeRowCounter);
        }
    }
}

// Cast on and insert waste yarn
k.in(wasteYarn);
buildWasteYarn(5, 5, wasteYarn);

k.write('sleeve.k');