"use strict";

/* 
const { menuData } = require('./backend/models')

function getMenu(menuNameID, callback) {
    menuData.find({
        menuName: menuNameID,
        bActive: true
    }), function(err, menus){
        if(err) {
            console.log(err)
            callback(err, null)
        } else {
            console.log(menus[0])
            callback(null, menus[0])
        }
    }
}

module.exports = { getMenu }

*/
var castOnRows = 100;

function castOn(stitches, callback) {
  for (var r = 1; r <= castOnRows; r += 1) {
    if (r % 2 === 0) {
      for (var n = 0; n <= stitches; n += 1) {}
    }
  }
}