"use strict";

let switchState = false;
let strictMode = false;
let sequence = [];
let step = 0;

$(document).ready(function () {

  // click switch button
  $('.switch').click(function () {
    console.log('switch clicked!');
    switchState = !switchState;

    if (switchState) {
      $(this).find('div').removeClass('switch-btn-off');
      $('.count-show').removeClass('count-hide');

    } else {
      $(this).find('div').addClass('switch-btn-off');
      $('.count-show').text('--');
      $('.count-show').addClass('count-hide');

      $('.strict-light').css('background-color', '');

      switchState = false;
      strictMode = false;
      sequence = [];
      step = 0;
      enableBtn(false);
    }

  });

  // click `START` button
  $(".start-btn").click(function () {
    if (!switchState)
      return;

    sequence = [];
    step = 0;
    generateNextStep();

  });

  // click `STRICT` button
  $('.strict-btn').click(function () {
    if (!switchState)
      return;

    if (!strictMode) {
      $('.strict-light').css('background-color', 'red');
    } else {
      $('.strict-light').css('background-color', '');
    }

    strictMode = !strictMode;
  });


  function enableBtn(enable = true) {
    let val = (enable === true ? 'auto' : 'none');

    //                if (!enable) {
    ////                    [0,1,2,3].forEach(v => revertBackgroundColor(v));
    //                    for (let i = 0; i < 4; i++) {
    //                        revertBackgroundColor(i);
    //                    }
    //                }

    $('.b-green').css('pointer-events', val);
    $('.b-red').css('pointer-events', val);
    $('.b-yellow').css('pointer-events', val);
    $('.b-blue').css('pointer-events', val);


  }

  function getPlayDuration(step) {
    let durations = [1250, 1000, 750, 500];
    if (step < 4)
      return durations[0];
    if (step < 8)
      return durations[1];
    if (step < 12)
      return durations[2];
    return durations[3];
  }

  function play() {
    console.log('play: ', JSON.stringify(sequence));
    $('.count-show').text(sequence.length);
    enableBtn(false);
    let duration = getPlayDuration(sequence.length);
    let rest = 300;
    for (let i = 0; i < sequence.length; i++) {
      // play time
      let pt = 1 + (duration + rest) * i;
      // rest time
      let rt = 1 + (i + 1) * duration + i * rest;

      if (!switchState) {
        break;
      }

      if (sequence[i] == 0) {
        setTimeout(function () {
          $('.b-green').css('background-color', '#13ff7c');
          playSound(0);
        }, pt);
        setTimeout(function () {
          $('.b-green').css('background-color', '');
        }, rt);
      } else if (sequence[i] == 1) {
        setTimeout(function () {
          $('.b-red').css('background-color', '#ff4c4c');
          playSound(1);
        }, pt);
        setTimeout(function () {
          $('.b-red').css('background-color', '');
        }, rt);
      } else if (sequence[i] == 2) {
        setTimeout(function () {
          $('.b-yellow').css('background-color', '#fed93f');
          playSound(2);
        }, pt);
        setTimeout(function () {
          $('.b-yellow').css('background-color', '');
        }, rt);
      } else if (sequence[i] == 3) {
        setTimeout(function () {
          $('.b-blue').css('background-color', '#1c8cff');
          playSound(3);
        }, pt);
        setTimeout(function () {
          $('.b-blue').css('background-color', '');
        }, rt);
      }


    }

    setTimeout(function () {
      enableBtn();
    }, 1 + sequence.length * duration + sequence.length * rest);
  }

  function playSound(num) {
    let soundLink = `https://s3.amazonaws.com/freecodecamp/simonSound${num + 1}.mp3`;
    let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', soundLink);
    audioElement.play();
  }


  function lightenBackgroundColor(num) {
    switch (num) {
      case 0:
        $('.b-green').css('background-color', '#13ff7c');
        break;
      case 1:
        $('.b-red').css('background-color', '#ff4c4c');
        break;
      case 2:
        $('.b-yellow').css('background-color', '#fed93f');
        break;
      case 3:
        $('.b-blue').css('background-color', '#1c8cff');
        break;
    }
  }

  function revertBackgroundColor(num) {
    switch (num) {
      case 0:
        $('.b-green').css('background-color', '');
        break;
      case 1:
        $('.b-red').css('background-color', '');
        break;
      case 2:
        $('.b-yellow').css('background-color', '');
        break;
      case 3:
        $('.b-blue').css('background-color', '');
        break;
    }
  }

  function generateNextStep() {
    sequence.push(Math.floor(Math.random() * 4));
    console.log('generateNextStep: ', JSON.stringify(sequence));
    setTimeout(function () {
      play();
    }, 1000);
  }

  function btnDown(num) {
    if (step >= sequence.length) {
      enableBtn(false);
      return;
    }

    playSound(num);
    lightenBackgroundColor(num);

    // wrong input
    if (sequence[step] !== num) {
      step = 0;
      $('.count-show').text('!!');


      if (strictMode) {
        sequence = [];
        generateNextStep();
        return;
      }

      setTimeout(function () {
        play();
      }, 1000);

    } else {
      ++step;

      if (step === 20) {
        $('.count-show').text('WIN');
        sequence = [];
        step = 0;
        generateNextStep();
        return;
      }

      if (step === sequence.length) {
        step = 0;
        setTimeout(function () {
          generateNextStep();
        }, 500);
      }
    }





  }

  function btnUp(num) {
    revertBackgroundColor(num);
  }


  // green button
  $('.b-green').mousedown(function () {
    btnDown(0);

  });

  $('.b-green').mouseup(function () {
    btnUp(0);
  });

  // red button
  $('.b-red').mousedown(function () {
    btnDown(1);
  });

  $('.b-red').mouseup(function () {
    btnUp(1);
  });

  // yellow button
  $('.b-yellow').mousedown(function () {
    btnDown(2);
  });

  $('.b-yellow').mouseup(function () {
    btnUp(2);
  });

  // blue button
  $('.b-blue').mousedown(function () {
    btnDown(3);
  });

  $('.b-blue').mouseup(function () {
    btnUp(3);
  });



});