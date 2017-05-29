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

function initCategories() {
  var categoriesUrl = chrome.runtime.getURL("categories.xml");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', categoriesUrl, true);
  xhr.send(null);
  if (xhr.status==200) {
    xmlDoc = xhr.responseXML;
    // var empid= xmlDoc.getElementsByTagName("c");
    // var total = placeMarks.length;
    // var names = xmlDoc.getElementsByTagName("Name");
    // var designation= xmlDoc.getElementsByTagName("designation");
    // var phone= xmlDoc.getElementsByTagName("phone");
  }
  else if (xmlhttp.status==404) {
    // alert("XML could not be found");
  }
}

function updateCategories() {

}

chrome.runtime.onInstalled.addListener(function(details){
    if (details.reason == "install") {
        initCategories();
    }
    else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        updateCategories();
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
