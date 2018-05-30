const itemFields = [
	['itemMerchantName', 'merchant_name'],
	['itemMerchantID', 'merchant_name'],
	['itemCurPrice', 'price'],
	['itemOrigPrice', 'original_price'],
	['itemSKU', 'sku'],
	['itemUPC', 'upc'],
	['itemBrand', 'brand'],
	['itemSize', 'size'],
	['itemColor', 'colour']
]


function liveOutput() {
	var parsedItem = convertToJSON($('#inputArea').val());
	var validItem = true;
	var itemMainImg = $('#itemMainImg');
	itemMainImg.get(0).src = parsedItem.image_source_url;
	itemMainImg.get(0).onerror = function(){
  		console.log("file with "+parsedItem.image_source_url+" invalid");
  		validItem = false;
    }
	var itemName = $('#itemName');
	itemName.text(parsedItem.name);

	var itemID = $('#itemID');
	
	var itemURL = $('#itemURL');
	itemURL.attr('href', parsedItem.url);

	var itemValidity = $('#itemValidity');
	itemValidity.text((validItem ? 'valid' : 'invalid'));

	var itemIdentifier = $('#itemIdentifier');
	var identifyBy = parsedItem.sku ? 'SKU' : (parsedItem.upc ? 'UPC' : 'Model #');
	itemIdentifier.text(identifyBy);

	for(field in itemFields) {
		var curItemField = $(`#${field[0]}`);
		curItemField.text(parsedItem[field[1]]);
	}

	var itemMerchantName = $('#itemMerchantName');

	var itemMerchantID = $('#itemMerchantID');

	var itemCurPrice = $('#itemCurPrice');

	var itemOrigPrice = $('#itemOrigPrice');

	var itemSKU = $('#itemSKU');

	var itemUPC = $('#itemUPC');

	var itemBrand = $('#itemBrand');

	var itemSize = $('#itemSize');

	var itemColor = $('#itemColor');


}

function convertToJSON(text) {
	console.log(`parsing item with raw:
	${text}`);
	return JSON.parse(JSON.parse(text)); // TODO: parse more than standard JSON syntax later
}
