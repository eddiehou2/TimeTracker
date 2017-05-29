var colors = ["#FFDAB9", "#E6E6FA", "#E0FFFF","#FFDAB9", "#E6E6FA", "#E0FFFF","#FFDAB9", "#E6E6FA", "#E0FFFF"];

function drawSection(startDeg, endDeg, centerX, centerY, radius, context, i) {
  context.save();
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.arc(centerX, centerY, radius, startDeg, endDeg, false);
  context.closePath();

  context.fillStyle = colors[i];
  context.fill();

  context.restore();
}

function drawPieChat(data) {
  var canvas = document.getElementById('chartCanvas');
  var context = canvas.getContext('2d');
  var centerX = Math.floor(canvas.width / 2);
  var centerY = Math.floor(canvas.height / 2);
  var radius = Math.floor(canvas.width / 2);
  var sum = 0;
  var degSum = 0;
  var counter = 0;

  for (var i in data) {
    sum += data[i];
  }

  for (var i in data) {
    var time = data[i];
    var deg = (time/sum) * 2 * Math.PI;
    drawSection(degSum,degSum+deg,centerX,centerY,radius,context,counter);
    counter += 1;
    degSum += deg;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var tab = tabs[0];
    var pathArray = tab.url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var url = protocol + '//' + host;
    document.getElementById('url').innerHTML = url;
  });
  var data = {"a":500,"b":250,"c":1000,"d":800,"e":15};
  drawPieChat(data);
}, false);
