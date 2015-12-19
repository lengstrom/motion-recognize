window.onload = main;

function main() {
  var deviceOrientationPromise = FULLTILT.getDeviceOrientation({'type': 'game'});
  var deviceMotionPromise = FULLTILT.getDeviceMotion({'type': 'game'});
  var deviceOrientation;
  var deviceAcceleration;
  var deviceRotationRate;
  var fps = 10;

  var display = document.getElementById('display');

  deviceOrientationPromise.then(function(controller) {
    deviceOrientation = controller.getScreenAdjustedEuler();
  })
  .catch(function(message) {
    display.innerHTML = message;
    console.error(message);
  });

  deviceMotionPromise.then(function(controller) {
    deviceAcceleration = controller.getScreenAdjustedAcceleration();
    deviceRotationRate = controller.getScreenAdjustedRotationRate();
  })
  .catch(function(message) {
    display.innerHTML = message;
    console.error(message);
  });


  function displayPosition() {
    if (deviceOrientation) {
      display.innerHTML = '<p>ALPHA: '+round(deviceOrientation.alpha, 5)+',</p><p>BETA: '+round(deviceOrientation.beta, 5)+',</p><p>GAMMA: '+round(deviceOrientation.gamma, 5)+'</p>';
      // console.log(deviceOrientation, deviceAcceleration, deviceRotationRate);
    }
  }

  function round(number, places) {
    return (Math.round(number*Math.pow(10, places))/Math.pow(10, places));
  }

  function sendPosition() {
    displayPosition();
    var obj = {
      orientation: deviceOrientation,
      acceleration: deviceAcceleration,
      rotationRate: deviceRotationRate
    };
    var data = JSON.stringify(obj);
    console.log(data);
    post('/', data);

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
