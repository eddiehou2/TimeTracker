var UserTimeData = {};

function checkActiveTab() {
  console.log("checkActiveTab");
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var tab = tabs[0];
    if (tab) {
      var pathArray = tab.url.split( '/' );
      var protocol = pathArray[0];
      var host = pathArray[2];
      var url = protocol + '//' + host;
      console.log("tab is not null");
      if (UserTimeData.hasOwnProperty(url)) {
        UserTimeData[url] += 15;
        console.log("Exist");
      }
      else {
        UserTimeData[url] = 15;
        console.log("Does not exist");
      }
      chrome.storage.sync.set({ "TTData": UserTimeData }, function(){
          console.log("Successfully set TTData");
      });
      for (var i in UserTimeData) {
        console.log("URL: " + i + " // Time: " + UserTimeData[i]);
      }
    }
  });
  setTimeout(checkActiveTab,10000);
}

function initSetup() {
  chrome.storage.sync.get("TTData", function(items) {
    if (items["TTData"]) {
      UserTimeData = items["TTData"];
      console.log("[INFO] Loaded previous storage data.");
    }
    else {
      console.log("[INFO] No storage items.")
    }
    checkActiveTab();
  });
}

initSetup();
