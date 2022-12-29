/*  Raglan Sweater - based on one that I made using 4/14 yarn from JaggerSpun on the 
    PASSAP E6000. Updated to using Knitout, and using updated measurements, for the 
    Kniterate using the same yarn.

    TO DO: 
        - Parameterize size information 
        - Create template for sweater sizes so that they can be loaded dynamically 
        - Draft full scope of pattern
*/

const knitout = require('knitout');
k = new knitout.Writer({carriers: [
    '1', '2', '3', '4', '5', '6'
]});

k.addHeader('Machine', 'Kniterate');
k.addHeader('Gauge', '7');

// Yarn Carriers 
let wasteYarn = '1';
let ravelCord = '2';
let mainYarn = '3';

// Waste Yarn Parameters
let wasteStitches = 100;
let wasteRows = 100;
