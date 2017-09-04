window.onload = function(){


//Gets bell sound
var snd = new Audio("img/bell.mp3");
snd.volume = .4;

/* This change view object has four methods to choose from: init, reset, toPom, toBreak */
var changeView = {

  toInit: function() {
      clocks.render.breakClock = false;
      clocks.render.arrows = false;
      if (window.matchMedia( "(min-width: 775px)").matches) {
        document.getElementById('pomNumbers').style.width = '500px'
        document.getElementById('breakNumbers').style.width = '500px'
    }
    else {
        document.getElementById('pomNumbers').style.width = '100%'
        document.getElementById('breakNumbers').style.width = '100%'
    }
  },

  toReset: function() {
      clocks.render.breakClock = true;
      clocks.render.pomodoro = true;
      clocks.render.arrows = true;
      if (window.matchMedia( "(min-width: 775px)").matches) {
        document.getElementById('pomNumbers').style.width = '400px'
        document.getElementById('breakNumbers').style.width = '400px'
    }
      else {
        document.getElementById('pomNumbers').style.width = '50%'
        document.getElementById('breakNumbers').style.width = '50%'
      }
  },

  toPom: function() {
        clocks.render.pomodoro = true;
        clocks.render.breakClock = false;
  },

  toBreak: function() {
        clocks.render.pomodoro = false;
        clocks.render.breakClock = true;
  }

}

//Vue object

var clocks = new Vue({

  el: '#main-clock',
  data: {
    pomodoro: 1500,
    pomInit: 0,
    breakClock: 300,
    breakInit: 0,
    isRunning: false,
    buttonText: 'Start',
    currentClock: 'pomodoro' ,
    render: {
      pomodoro: true,
      breakClock: true,
      arrows: true,
      infoScreen: true

    },
    tomatoes: []
  },

  methods: {

  /* Init clock runs when the Start/Reset button is presssed. It 
  checks if the clock is running. If it is, then it prompts it 
  to reset. If it's not runnign then it starts the clock */  

    initClock: function(clock) {

      if (this.isRunning === true) {
      this.reset();
    }
      else {

      /* sets isRunning to true and changes the label on the button 
      to reflect this new state */

      this.isRunning = true;
      this.buttonText = 'Reset'

      // takes the values from clocks and saves for when the clock resets
      this.pomInit = this.pomodoro;
      this.breakInit = this.breakClock;

      //change the view and starts the clock
      changeView.toInit();
      this.continueClock(clock);
    }

  },

    //Method that sets a timeout for 1 second then fires a callback

    continueClock: function(clock) {
      this.calculatePercentage(this.currentClock);
      window.setTimeout(this.decreaseClock, 1000, clock);      
    },


    /* Callback when timeout is completed. It checks that it is both 
    still above zero and that the Reset button hasn't been pressed
    to switch isRunning to false. If the counter is at zero, it dings
    the bell and switches to the next clock */

    decreaseClock: function(clock) {

      if (this[clock] > 0 && this.isRunning == true) {

        this[clock]--;
        this.continueClock(clock);
      }
      else if (this[clock] <= 0) {
        snd.play();
        this.nextClock();
      }
    },

    /*Two methods that change either the Pomodoro or Break clocks. They 
    also check against going below zero*/

    increaseNum: function(num) {
      if (this[num] < 10,800) {
        this[num] += 60;
      }
    },

    decreaseNum: function(num) {
      if (this[num] > 60) {
        this[num] -= 60;
      }
    },

    /* Resets clock back to original state. The only difference is that pomodoro and 
    break numbers are whatever they chose */

    reset: function() {
      this.isRunning = false;
      this.buttonText = 'Start';
      this.pomodoro = this.pomInit;
      this.breakClock = this.breakInit;
      this.calculatePercentage('pomodoro');
      this.calculatePercentage('breakClock');
      this.currentClock = 'pomodoro'


      this.tomatoes = [];

      changeView.toReset();

    },

    /* Switches between the pomodoro and break clocks. It also adds a tomoato to the bottom, so the 
    user can keep track of how many pomodoros they've gone through */

    nextClock: function() {

      if (this.currentClock == 'pomodoro') {
        this.breakClock = this.breakInit; //set break to original value
        this.pomodoro = this.pomInit;
        this.currentClock = 'breakClock'; //keep track of which clock is being use
        changeView.toBreak(); //switch the view
        this.continueClock('breakClock'); //start next clock
        
        //add the tomato
        if (this.tomatoes.length < 5) {
        this.tomatoes.push('tomatillo');
        }
        
        else {
          this.tomatoes = []; //reset the array if they went higher the 5
        }

      }

      else {
        this.breakClock = this.breakInit;
        this.pomodoro = this.pomInit;
        this.continueClock('pomodoro');
        this.currentClock = 'pomodoro';
        changeView.toPom();
      }

    },

    /* Method to convert seconds to actual time. It converst a date object 
    into a string. It first calculates how many digits it will need and where in 
    the string it will choose from. */
    
    convertToTime: function(num) {
        var start;
        var length;

        if (num > 3599) {
          start = 12;
          length = 7;
        }
        else if (num > 599 & num <= 3599) {
          start = 14;
          length = 5;
        }
        else {
          start = 15;
          length = 4;
        }
        var date = new Date(null);
        date.setSeconds(num); // specify value for SECONDS here
        var result = date.toISOString().substr(start, length);

        return result;
    },

    calculatePercentage: function(bar) {
        var targetClass = bar == 'pomodoro' ? 'pomProgress' : 'breakProgress';
        var initValue = bar == 'pomodoro' ? 'pomInit' : 'breakInit';
        var pct = Math.round( (this[initValue] - this[bar]) / this[initValue] * 100);
        document.getElementById(targetClass).style.width = pct + '%'
    }
  }, //ends methods 
 

});


}









