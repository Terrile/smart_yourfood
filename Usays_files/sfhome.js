var autocomplete;
function initMap() {
  var input = /** @type {!HTMLInputElement} */(document.getElementById('pac-input'));
  var options = {	  componentRestrictions: {country: "ca"}	 };
  autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place || !place.geometry) {
      window.alert("Can not get this address's geometry. Please select an address in address list or input another correct address. If cannot find your location, please input a near address.");
      document.getElementById("pac-input").focus();
      return;
    }	
    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
	var latitude = place.geometry.location.lat();
	var longitude = place.geometry.location.lng(); 
	$.ajax({
		url: 'index.php?route=api/address/setAddress',
		type: 'get',
		data: 'lat=' + latitude + '&lng=' + longitude+ '&address=' + encodeURIComponent(address) + '&isInsert=1',
		dataType: 'json',
		success: function(data) {
			if(window.location.search.indexOf('sfrest/detail') >= 0){
				window.location.href =window.location.href; 
			}
			else if(window.location.search.indexOf('common/list') >= 0){
				var searchtype =document.getElementById('searchType').value;
				if(searchtype=="food"){
					window.location.href = "index.php?route=common/list";
				}
				else{
					window.location.href = "index.php?route=common/list&type=restaurant";
				}
			}
		}
	});		
  });
}	

function getReturnUrl(lat,lng,address){
	return 'index.php?route=common/sfhome&lat=' + lat + '&lng='+lng+ '&address=' +encodeURIComponent(address);
}
	
$(document).ready(function () {	
	
	$(document).on('click', '.buy-cart', function(){
		var foodId = $(this).parent().attr('foodid');
		var restId = $(this).parent().attr('restid');
		var cartRestId = $('#restId').attr('value');
		if(cartRestId!="0" && cartRestId != restId){
			alert("请在同一家餐厅选餐");
		}else{
			$.ajax({
				url: 'index.php?route=checkout/cart/add',
				type: 'post',
				data: 'product_id=' + foodId + '&quantity=' + 1,
				dataType: 'json',
				success: function(json) {
					var url = '/index.php?route=sfcheckout/checkout';				
					window.location.href = url;
				}
			});	
		}
	});
	
	$(document).on('click', '.food-background,.food-hover-content,.food-name,.food-desc', function(){
		var restId = $(this).parent().attr('restid');
		var foodId = $(this).parent().attr('foodid');
		var url = '/index.php?route=sfrest/detail&restaurant_id=' + restId + '&food_id=' + foodId + '#' + foodId;				
		window.location.href = url;
	});
	
	$(document).on('click', '#mapSelect', function(){
		var url = '/index.php?route=address/address&isFromHome=1&returnUrl=/index.php?route=common/sfhome';				
		window.location.href = url;
	});	
	
	$(document).on('focusout', '#pac-input', function() {
		var focusClasses = $(":focus").attr('class');
		//alert(focusClasses);
		if(focusClasses.indexOf('pac-item')<0 &&
		   focusClasses.indexOf('pac-icon')<0 &&
		   focusClasses.indexOf('pac-item-query')<0 &&
		   focusClasses.indexOf('pac-matched')<0 &&
		   focusClasses.indexOf('pac-container')<0 
			)			
		{
			google.maps.event.trigger(autocomplete, 'place_changed', {});
		}
    });
	
	$(document).on('click', '#dropdown', function(){
		$('.history-addresses').toggleClass("hide");
	});
	
	$('div:not(#dropdown,.address,.search-bar)').click( function(){
		$('.history-addresses').addClass("hide");
	});
	
	$(document).on('click', '.address', function(){
		var address = $(this).text();
		var lat = $(this).attr('lat');
		var lng = $(this).attr('lng');
		$('#pac-input').val(address);
		$.ajax({
			url: 'index.php?route=api/address/setAddress',
			type: 'get',
			data: 'lat=' + lat + '&lng=' + lng + '&address=' + encodeURIComponent(address) + '&isInsert=0',
			dataType: 'json',
			success: function(data) {
				if(window.location.search.indexOf('sfrest/detail') >= 0){
					window.location.href =window.location.href; 
				}
				else if(window.location.search.indexOf('common/list') >= 0){
					var searchtype =document.getElementById('searchType').value;
					if(searchtype=="food"){
						window.location.href = "index.php?route=common/list";
					}
					else{
						window.location.href = "index.php?route=common/list&type=restaurant";
					}
				}
			}
		});	
		$('.history-addresses').addClass("hide");
	});
	
	$('#search-button').on('click', function () {		
        var searchKeyWords = $('#serach-input').val();
        var type=$('#searchType').val();	
        var url = '/index.php?route=sffood/search&search=' +searchKeyWords + '&type=' + type;
        window.location.href = url;
    });
	$('#serach-input').keypress(function (e) {
		var key = e.which;
		if(key == 13)  // the enter key code
		{
			var searchKeyWords = $('#serach-input').val();
			var type=$('#searchType').val();
			var url = '/index.php?route=sffood/search&search=' +searchKeyWords;
			window.location.href = url;
		}
	});

	$(".click-point-first,.first-triangle-left,.first-tip").hover(
			function(){
				$(".second-tip").css("background","rgba(0, 0, 0, 0)");
				$(".second-tip-content,.second-triangle-left").css("opacity","0");
			},
			function(){
				$(".second-tip").css("background","rgba(0, 0, 0, .4)");
				$(".second-tip-content,.second-triangle-left").css("opacity","");
			}
	);
	
	$(".click-point-second,.second-triangle-left,.second-tip").hover(
			function(){
				$(".first-tip").css("background","rgba(0, 0, 0, 0)");
				$(".first-tip-content,.first-triangle-left").css("opacity","0");
			},
			function(){
				$(".first-tip").css("background","rgba(0, 0, 0, .4)");
				$(".first-tip-content,.first-triangle-left").css("opacity","");
			}
	);
	
	$(".food").hover(
			function(){
				$(this).addClass( "food-hover" );
				$(this).find(".food-background").css("margin-top","-50px");
				$(this).find(".food-hover-content").removeClass("hide");
				$(this).find(".buy-cart").removeClass("hide");
			},
			function(){
				$(this).find(".fond-hover-content").hide();
				$(this).find(".food-background").css("margin-top","28px");
				$(this).find(".food-hover-content").addClass("hide");
				$(this).find(".buy-cart").addClass("hide");
				$(this).removeClass( "food-hover" );				
			}
	);	
});