window.onload = function(){

var snd = new Audio("img/bell.mp3"); // buffers automatically when created
snd.volume = .4;

var clocks = new Vue({

  el: '#main-clock',
  data: {
    pomodoro: 3,
    pomInit: 0,
    breakClock: 10,
    breakInit: 0,
    stopTime: 0,
    stopped: true,
    message: 'Start',
    currentClock: 'pomodoro' ,
    render: {
      pomodoro: true,
      breakClock: true,
      arrows: true,

    },
    classes: {
      pomodoro: 'col-md-3',
      breakClock: 'col-md-3',
      breakRunning: true 
    },
    tomatoes: []
  },

  methods: {

    
    initClock: function(clock) {

      if (this.stopped === false) {
      this.reset();
    }
      else {
      this.stopped = false;
      this.message = 'Reset'
      this.pomInit = this.pomodoro;
      this.breakInit = this.breakClock;
      this.render.breakClock = false;
      this.render.arrows = false;
      this.classes.pomodoro = 'col-4';
      this.classes.breakClock = 'col-4';
      this.continueClock(clock);

    }

    },

    continueClock: function(clock) {
      window.setTimeout(this.decreaseClock, 1000, clock);      
    },

    decreaseClock: function(clock) {

      if (this[clock] > this.stopTime && this.stopped == false) {
       
        this[clock]--;
        this.continueClock(clock);
      }
      else if (this[clock] <= this.stopTime) {
        snd.play();
        this.nextClock();
      }
    },

    increaseNum: function(num) {
        this[num]++
    },

    decreaseNum: function(num) {
        this[num]--
    },

    reset: function() {
      this.stopped = true;
      this.message = 'Start';
      this.pomodoro = this.pomInit;
      this.breakClock = this.breakInit;
      this.render.pomodoro = true;
      this.render.breakClock = true;
      this.render.arrows = true;
      this.tomatoes = [];
      this.classes.pomodoro = 'col-3';
      this.classes.breakClock = 'col-3';

    },

    nextClock: function() {

      if (this.currentClock == 'pomodoro') {
        this.breakClock = this.breakInit;
        this.continueClock('breakClock');
        this.currentClock = 'breakClock'
        this.render.pomodoro = false;
        this.render.breakClock = true;
        
        if (this.tomatoes.length < 5) {
        this.tomatoes.push('tomatillo');
        }
        else {
          this.tomatoes = [];
        }

      }

      else {
        this.pomodoro = this.pomInit;
        this.continueClock('pomodoro');
        this.currentClock = 'pomodoro';
        this.render.pomodoro = true;
        this.render.breakClock = false;
      }



    }


  }




});





}









