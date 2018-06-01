function convertToItem(source) {
  var text;
  if(source === 'clipboard') {
    navigator.clipboard.readText()
    .then(txt => {
      console.log('Pasted content: ', txt);
      text = txt;
    })
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
    document.execCommand('paste')
    console.log()
    console.log(text);
  } else if(source === 'typed'){
    text = $('#itemStringInput').val();
  }

  if(!text) {
    // show error
  } else {
    var parsedItem;
    try {
      parsedItem = JSON.parse(JSON.parse(text));
      console.log(parsedItem);

    } catch(err) {
      console.log(err);
    }
    displayItem(parsedItem);
  }

}

function displayItem(parsedItem) {
  console.log(parsedItem)
  if(parsedItem) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "display_parsed_item", "item": parsedItem});
    });
    $('#parseInProgress').css('display', '');
    setTimeout(function() {
      window.close();
    }, 4000);
  } else {
    $('#manualInputIcon').removeClass('italic');
    $('#manualInputIcon').addClass('exclamation');
    $('#manualInputIcon').transition('shake');
    $('#manualInputIcon').addClass('red');
    $('#itemStringInput').val('');
    $('#itemStringInput').attr('placeholder', 'That isn\'t valid JSON!');
    $('#itemStringInput').css('color', '#E03126');
    $('#itemStringInput').addClass('manual-input-div');
  }
}

function handleKeyPress(evnt) {
  var key = evnt.keyCode || evnt.which;
  if (key == 13){
     convertToItem('typed');
  }
}

var itemInput = document.getElementById('itemPasteInput');
itemInput.addEventListener('click', function() { paste(); });

var itemPaste = document.getElementById('itemStringInput');
itemPaste.addEventListener('keypress', function() { handleKeyPress(event); });
