function checkIfActiveTab() {
  var checkActiveMessage = "checkActive";
  chrome.extension.sendRequest({message: checkActiveMessage});
  setTimeout(checkIfActiveTab, 15000);
}

document.addEventListener('DOMContentLoaded', function() {
  checkIfActiveTab();
}, false);
