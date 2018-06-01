var displayedBefore = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.message === "display_error_msg") {
      console.log('displaying error');


    } else if(request.message === 'display_parsed_item') {
      if(displayedBefore) $('#outerParsedItemContainer').detach();
      console.log('displaying item');
      console.log(request.item);
      $.get(chrome.extension.getURL('/resultCard.html'), function(data) {
        $($.parseHTML(data)).appendTo('body');
      });
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
      $("head").append(s);
      var x = document.createElement("script");
      x.type = "text/javascript";
      x.src = "https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/semantic.min.js";
      $("head").append(x);

      setTimeout(function () {
          populateItems(request.item);
          $('<script>$(".ui.accordion").accordion({exclusive: false});</' + 'script>').appendTo(document.body);
          $('<script>$(".rating").rating("disable");</' + 'script>').appendTo(document.body);
          $('<script>$("#outerParsedItemContainer").transition("drop in");</' + 'script>').appendTo(document.body);
      }, 5000);
      displayedBefore = true;
    }
  }
);

function populateItems(info) {
  console.log(info);
  var disabledReason;
  $('#itemMainImg').get(0).onerror = function(){
		console.log("Could not load main image from url");
    disableItem('Missing Image');
  }

  if(info.image_source_url) {
    $('#itemMainImg').attr('src', info.image_source_url);
  } else {
    disabledReason = 'Missing Image';
  }

  if(info.name) {
    $('#itemName').text(info.name);
    $('#itemName').attr('href', info.url);
  } else {
    disabledReason = 'Missing Name';
  }

  if(info.brand) {
    $('#itemBrand').text(info.brand);
  } else {
    $('#itemBrand').text('No Brand Available');
    $('#itemBrand').css('color', 'red');
  }

  $('#itemBuyOnline').addClass(info.buy_online ? 'green' : 'red');
  $('#itemBuyStore').addClass(info.buy_in_store ? 'green' : 'red');
  if(!info.buy_online) disabledReason = 'Not Available Online';

  if(info.review_info.average_rating !== null) {
    $('#itemAvgReview').attr('data-rating', Math.round(info.review_info.average_rating));
    $('#itemAvgReview').attr('data-tooltip', info.review_info.average_rating + ' / 5');
  } else {
    $('#itemAvgReview').attr('data-rating', 0);
    $('#itemAvgReview').attr('data-tooltip', 'No Ratings Available');
  }

  if(info.original_price && info.price) {
    $('#itemPriceLower').text('$' + info.price);
    $('#itemPriceLower').css('display', 'inline');
    $('#itemPrice').text(info.original_price);
  } else if (info.price) {
    $('#itemPrice').text(info.price);
    $('#itemPrice').attr('data-tooltip', 'Current Price');
  } else {
    $('#itemPrice').css('color', 'red');
    $('#itemPrice').text('???');
    disabledReason = 'Missing Price';
  }

  if(info.description) {
    $('#itemDesc').text(info.description);
  } else {
    $('#itemDesc').css('color', 'red');
    $('#itemDesc').text('No Description Available');
    disabledReason = 'Missing Description';
  }

  if(info.features.length) {
    for(feat of info.features) {
  		$('#itemFeatures').append(`<p>${feat.feature_text}</p>`);
  	}
  } else {
    $('#itemFeatures').append('No Features Available');
  }

  if(info.specs.length) {
    $('#itemSpecs').append('<table id="itemSpecTable" class="ui very basic table"><tbody></tbody></table>');
    for(spec of info.specs) {
  		$('#itemSpecTable').append(`<tr><td><b>${spec.name}<b></td><td>${spec.value}</td></tr>`);
  	}
  } else {
    $('#itemSpecs').css('color', 'red');
    $('#itemSpecs').append('No Specs Available');
  }

  if(info.reviews.length) {
    for(review of info.reviews) {
  		$('#itemReviews').append(`<div class="ui message">
        <div class="header" data-tooltip="${review.author}" data-position="">
          ${review.title}
        </div>
        <p>${review.body}</p>
      </div>`);
  	}
  } else {
    $('#itemReviews').css('color', 'red');
    $('#itemReviews').append('No Reviews Available');
  }

  if(info.breadcrumb_categories.length) {
    $('#itemCategories').append(`<span class="section">${info.breadcrumb_categories[0].name}</span>`);
    for(cat of info.breadcrumb_categories.slice(1)) {
      $('#itemCategories').append('<i class="right angle icon divider" style="color: white;"></i>');
  		$('#itemCategories').append(`<span class="section">${cat.name}</span>`);
  	}
  } else {
    $('#itemCategories').css('color', 'red');
    $('#itemCategories').append('<span class="section">No Breadcrumb Categories</span>');
  }

  disableItem(disabledReason);

}

function disableItem(reason) {
  $('#itemStatusLabel').remove();
  $('#mainContent').prepend('<div id="itemStatusLabel" class="ui ribbon label" style="margin-bottom: 10px"></div>');

  if(reason) {
    console.log('item is disabled')
    $('#itemStatusLabel').append(`<i class="times icon"></i>${reason}`);
  } else {
    console.log('item is enabled')
    $('#itemStatusLabel').append('<i class="check icon"></i> Enabled');
  }
  $('#itemStatusLabel').addClass(reason ? 'red' : 'green');
}
