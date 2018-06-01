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
    var parsedItem = JSON.parse(JSON.parse(text));
    console.log(parsedItem);

    displayItem(parsedItem);
  }

}

function displayItem(parsedItem) {
  
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
