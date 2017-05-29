// 5DA5DA (blue) || FAA43A (orange) || 60BD68 (green) || 4D4D4D (gray) || F17CB0 (pink) || B2912F (brown) || B276B2 (purple) || DECF3F (yellow) || F15854 (red)
var colors = ["#5DA5DA","#FAA43A","#60BD68","#4D4D4D","#F17CB0","#B2912F","#B276B2","#DECF3F","#F15854"];
var UserTimeData = {};

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
    if (counter >= colors.length - 1) {
      counter = 0;
    }
    else {
      counter += 1;
    }
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

  chrome.storage.sync.get("TTData", function(items) {
    if (items["TTData"]) {
      UserTimeData = items["TTData"];
      console.log("[INFO] Loaded previous storage data.");
    }
    else {
      console.log("[INFO] No storage items.")
    }
    drawPieChat(UserTimeData);
  });

}, false);
