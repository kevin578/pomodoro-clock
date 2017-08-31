window.onload = function() {
var x = 0;

function timer(start, end, variable) {

  var time = start;

  wait();

  function wait() {
    time++
    window.setTimeout(increaseTime, 1000);
  }

  function increaseTime() {
    //variable = time;
    if (time < end) wait();
  }



}

 timer(0,5,x);












}
