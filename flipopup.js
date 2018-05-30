const itemFields = [
	['itemName', 'name'],
	['itemMerchantName', 'merchant_name'],
	['itemMerchantID', 'merchant_name'],
	['itemCurPrice', 'price'],
	['itemOrigPrice', 'original_price'],
	['itemSKU', 'sku'],
	['itemUPC', 'upc'],
	['itemBrand', 'brand'],
	['itemSize', 'size'],
	['itemColor', 'colour'],
	['itemDesc', 'description']
]


function liveOutput() {
	var parsedItem = convertToJSON($('#inputArea').val());
	if(parsedItem) {
		$('#itemContainer').css("display", "block");
	} else {
		$('#itemParseError').css("display", "block");
		return;
	}
	var validItem = true;
	var itemMainImg = $('#itemMainImg');
	itemMainImg.get(0).src = parsedItem.image_source_url;
	itemMainImg.get(0).onerror = function(){
  		console.log("Could not load main image from url: " + parsedItem.image_source_url);
  		validItem = false;
    }
	var itemID = $('#itemID');
	
	var itemURL = $('#itemURL');
	itemURL.attr('href', parsedItem.url);

	for(field of itemFields) {
		var curItemField = $('#'+field[0]);
		curItemField.text(parsedItem[field[1]]);
	}

	var itemValidity = validItem ? $('#ValidItemIcon') : $('#InvalidItemIcon');
	itemValidity.css("display", "inline");

	var BuyOnlineIcon = parsedItem.buy_online ? $('#BuyOnlineTrue') : $('#BuyOnlineFalse');
	BuyOnlineIcon.css("display", "inline");
	var BuyStoreIcon = parsedItem.buy_in_store ? $('#BuyStoreTrue') : $('#BuyStoreFalse');
	BuyStoreIcon.css("display", "inline");


	var itemIdentifier = $('#itemIdentifier');
	var identifyBy = parsedItem.sku ? 'SKU' : (parsedItem.upc ? 'UPC' : 'Model #');
	itemIdentifier.text(identifyBy);


}

function convertToJSON(text) {
	console.log(`parsing item with raw:
	${text}`);
	var parsed;
	try {
		parsed = JSON.parse(JSON.parse(text));
	} catch(err) {
		console.log('COULD NOT PARSE ITEM INFO D:');
		
	}
	return parsed; // TODO: parse more than standard JSON syntax later
}
