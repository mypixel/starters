var mypxl = {};

(function ( mypxl, $, window, document, undefined) {

  'use strict';



  /*
   * private vars
   */
  var a = 'hello';
  var b = 'there';




  /*
   * private fn's
   */
  var speak = function(){
    return a + ' ' + b;
  };




  /*
   * public fn's
   */
  mypxl.say = function(){
    console.log( speak() );
  };





  $(function () {
    // jQuery goodness
    mypxl.say();
  });




})( mypxl, jQuery, window, document);
