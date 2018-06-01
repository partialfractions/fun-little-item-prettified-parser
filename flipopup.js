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
	$('#itemContainer').css("display", "none");
	$('#itemParseError').css("display", "none");
	var parsedItem = convertToJSON($('#inputArea').val());
	if(parsedItem) {
		$('#itemContainer').css("display", "block");
	} else {
		$('#itemParseError').css("display", "block");
		return;
	}
	var validItem = true;
	var itemMainImg = $('#itemMainImg');
	itemMainImg.attr('src', parsedItem.image_source_url)
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

	var itemCategories = $('#itemCategories');
	for(category of parsedItem.breadcrumb_categories) {
		itemCategories.append(`<a class="ui teal tag label">${category.name}</a>`);
	}

	var itemFeatures = $('#itemFeatures table');
	if(parsedItem.features.length > 0) itemFeatures.append('<th>Features</th>');
	for(feat of parsedItem.features) {
		itemFeatures.append(`<tr class="feature table-row list"><td>${feat.feature_text}</td></tr>`);
	}

	var itemSpecs = $('#itemSpecs table');
	if(parsedItem.specs.length > 0) itemSpecs.append('<th>Specs</th>');
	for(spec of parsedItem.specs) {
		itemSpecs.append(`<tr class="spec table-row list"><td>${spec.name}</td><td>${spec.value}</td></tr>`);
	}

	
	var BuyOnlineIcon = parsedItem.buy_online ? $('#BuyOnlineTrue') : $('#BuyOnlineFalse');
	BuyOnlineIcon.css("display", "inline");
	var BuyStoreIcon = parsedItem.buy_in_store ? $('#BuyStoreTrue') : $('#BuyStoreFalse');
	BuyStoreIcon.css("display", "inline");


	var itemIdentifier = $('#itemIdentifier');
	var identifyBy = parsedItem.sku ? 'SKU' : (parsedItem.upc ? 'UPC' : 'Model #');
	itemIdentifier.text(identifyBy);

	var itemAvgRating = $('#itemAvgRating');
	itemAvgRating.text(parsedItem.review_info.average_rating);

	var itemReviews = $('#itemReviews');
	if(parsedItem.reviews.length > 0) console.log('displaying reviews');
	for(review of parsedItem.reviews) {
		itemReviews.append(`<span class="review info">${review.body}</span`);
	}
	

	if(!parsedItem.buy_online || !parsedItem.name || !parsedItem.price) validItem = false;


	var itemValidity = validItem ? $('#ValidItemIcon') : $('#InvalidItemIcon');
	itemValidity.css("display", "inline");
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

$('.ui.rating')
  .rating()
;
