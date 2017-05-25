chrome.extension.onRequest.addListener(function(request, sender) {
  switch (request.message) {
    case "checkActive":
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var tab = tabs[0];
        var pathArray = tab.url.split( '/' );
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url = protocol + '//' + host;
        alert(url);
      });
      break;
    default:

  }
});
