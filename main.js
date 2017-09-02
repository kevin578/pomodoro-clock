window.onload = function(){


var clocks = new Vue({

  el: '#main-clock',
  data: {
    pomodoro: 17,
    breakClock: 10,
    stopTime: 0
    
  },

  methods: {
    
    startClock: function(clock) {
      window.setTimeout(this.decreaseClock, 1000, clock);
    },

    decreaseClock: function(clock) {
      this[clock]--;
      if (this[clock] > this.stopTime) {
        this.startClock(clock);
      }

  }

  }




});



clocks.startClock('breakClock');





}









