window.onload = main;

function main() {
  var deviceOrientationPromise = FULLTILT.getDeviceOrientation({'type': 'game'});
  var deviceMotionPromise = FULLTILT.getDeviceMotion({'type': 'game'});
  var deviceOrientation;
  var fps = 30;

  var display = document.getElementById('display');

  deviceOrientationPromise.then(function(controller) {
    deviceOrientation = controller.getScreenAdjustedEuler();
  })
  .catch(function(message) {
    display.innerHTML = message;
    console.error(message);
  });

  deviceMotionPromise.then(function(controller) {
    deviceMotion = controller.getScreenAdjustedAcceleration;
  })
  .catch(function(message) {
    display.innerHTML = message;
    console.error(message);
  });


  function displayPosition() {
    if (deviceOrientation && deviceMotion) {
      display.innerHTML = '<p>ALPHA: '+round(deviceOrientation.alpha, 5)+',</p><p>BETA: '+round(deviceOrientation.beta, 5)+',</p><p>GAMMA: '+round(deviceOrientation.gamma, 5)+'</p>';
    }
  }

  function round(number, places) {
    return (Math.round(number*Math.pow(10, places))/Math.pow(10, places));
  }

  function sendPosition() {
    displayPosition();

    setTimeout(function() {
      window.requestAnimationFrame(sendPosition);
    }, 1000 / fps);
  }

  sendPosition();
}

function post(url, data) {
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
}
