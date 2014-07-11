/*==== GLOBAL VARS ===========================================================*/
var jsonObj = {
    "location_name": "Thuis",
    "street_name": "moerkerksesteenweg",
    "street_number": 9,
    "postcode": 8340,
    "city": "damme",
    "country": "belgium",
    "country_code": "BE"
};
/*==== FUNCTIONS =============================================================*/
function geocodeAddress(object) {
    var request = {
        "address": object.street_name + ' ' + object.street_number + ', ' /*+ object.postcode + ' '*/ + object.city + ', ' + object.country,
        "region": object.country_code
    };
    console.log(request.address);
//    console.log(request.region);
    var defaultLocation = {"address": "Belgium"};
    var geoCoder = new google.maps.Geocoder();
    geoCoder.geocode(request, function(results, status) {
//        console.log(results);
        // Check status
        if (status == google.maps.GeocoderStatus.OK) {
            // Check responses, not empty return first result
            if (results.length != 0) {
                var geoResult = results.shift();
            }
            // Load map & data
            initializeMap(geoResult)
        }
    });
}

function initializeMap(address) {
    // Check if a result was returned, if not use default
    if (address.hasOwnProperty('geometry')) {
//    console.log(address.geometry.location.lat());
//    console.log(address.geometry.location.lng());
        console.log(address);
        // Set map center of result
        var mapOptions = {
            center: new google.maps.LatLng(address.geometry.location.lat(), address.geometry.location.lng()),
            zoom: 15
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        // Set marker
        var marker = new google.maps.Marker({
            map: map,
            position: address.geometry.location
        });

        // Set address details in address container
        var eDivAddress = document.querySelector('#address-container');
        // Add header to address container
        var eAddressHeader = document.createElement('h3');
        eAddressHeader.innerHTML = 'Adres';
        eDivAddress.appendChild(eAddressHeader);
        // Add address to address container
        var eAddress = document.createElement('p');
        var address = jsonObj.street_name + ' ' + jsonObj.street_number;
        address += '<br>';
        address += jsonObj.postcode + ', ' + jsonObj.city;
        if (address.partial_match) {
            address += '<br>';
            address += 'partial match';
        }
        eAddress.innerHTML = address;
        eDivAddress.appendChild(eAddress);
    } else {
        // Use default.
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }
}
/*==== WINDOW ONLOAD LISTENER ================================================*/
google.maps.event.addDomListener(window, 'load', geocodeAddress(jsonObj));
