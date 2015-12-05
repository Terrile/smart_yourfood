	function initMap() {
	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 49.2827291, lng: -123.12073750000002 },
	    zoom: 13
	  });
	  var input = /** @type {!HTMLInputElement} */(
	      document.getElementById('pac-input'));

	  var contact = document.getElementById('contact_input');
      var phone = document.getElementById('phone_input');
	  var types = document.getElementById('type-selector');
      if (typeof(contact) != 'undefined' && contact != null)
      {
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(contact);
      }
      if (typeof(phone) != 'undefined' && phone != null)
      {
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(phone);
      }
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
	  var options = {
			  componentRestrictions: {country: "ca"}
			 };
	  var autocomplete = new google.maps.places.Autocomplete(input, options);
	  autocomplete.bindTo('bounds', map);
	
	  var infowindow = new google.maps.InfoWindow();
	  var marker = new google.maps.Marker({
	    map: map,
	    anchorPoint: new google.maps.Point(0, -29)
	 });
	
	  autocomplete.addListener('place_changed', function() {
	    infowindow.close();
	    marker.setVisible(false);
	    var place = autocomplete.getPlace();
	    if (!place.geometry) {
	      window.alert("Autocomplete's returned place contains no geometry");
	      return;
	    }
	
	    // If the place has a geometry, then present it on a map.
	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);  // Why 17? Because it looks good.
	    }
	    marker.setIcon(/** @type {google.maps.Icon} */({
	      url: place.icon,
	      size: new google.maps.Size(71, 71),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(17, 34),
	      scaledSize: new google.maps.Size(35, 35)
	    }));
	    marker.setPosition(place.geometry.location);
	    marker.setVisible(true);
	
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
        if (typeof(phone) != 'undefined' && phone != null&&typeof(contact) != 'undefined' && contact != null)
        {
            var phone_num = phone.value;
            console.log(phone_num);
            var contanct_name = contact.value;
            console.log(contanct_name);
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br><a id=selectAddress class=select_address href='+getReturnUrl(latitude,longitude,address,contanct_name,phone_num)+' >确定</a>' );
        }
	    else{
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br><a id=selectAddress class=select_address href='+getReturnUrl(latitude,longitude,address)+' >确定</a>' );
        }
	    infowindow.open(map, marker);
	  });
	
	  // Autocomplete.
	  function setupClickListener(id, types) {
	    var radioButton = document.getElementById(id);
	    radioButton.addEventListener('click', function() {
	      autocomplete.setTypes(types);
	    });
	  }	
	  setupClickListener('changetype-all', []);
	  setupClickListener('changetype-address', ['address']);
	  setupClickListener('changetype-establishment', ['establishment']);
	  setupClickListener('changetype-geocode', ['geocode']);
	}
	
	function getReturnUrl(lat,lng,address){
		var returnUrl = document.getElementById("returnUrl").value;
		if(returnUrl.indexOf("route") > 0){
			return returnUrl +'&lat=' + lat + '&lng='+lng + '&address=' +encodeURIComponent(address);
		} 
		return 'index.php?route=sffood/list&lat=' + lat + '&lng='+lng+ '&address=' +encodeURIComponent(address);
	}

    function getReturnUrl(lat,lng,address,contact_name, phone_num){
        var returnUrl = document.getElementById("returnUrl").value;
        if(returnUrl.indexOf("route") > 0){
            return returnUrl +'&lat=' + lat + '&lng='+lng + '&address=' +encodeURIComponent(address)+'&phone='+encodeURIComponent(phone_num)+'&contact='+encodeURIComponent(contact_name);
        }
        return 'index.php?route=sffood/list&lat=' + lat + '&lng='+lng+ '&address=' +encodeURIComponent(address)+'&phone='+encodeURIComponent(phone_num)+'&contact='+encodeURIComponent(contact_name);
    }
