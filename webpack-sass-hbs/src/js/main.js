//main.js
//


require('../templates/index.html');

// once this is a certain size dont do this - just link as per normal in header
var css = require('../build/main.bundle.css');

// IIFE
(function(){

    var bob = function(){
        console.log('hi there');
    }

    bob();


})()