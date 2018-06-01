// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      console.log('clicked');
      // add a new element to the DOM
      var p = document.createElement("p");
      p.textContent = "This paragraph was added by a page script.";
      p.setAttribute("id", "page-script-para");
      document.body.appendChild(p);    }
  }
);
