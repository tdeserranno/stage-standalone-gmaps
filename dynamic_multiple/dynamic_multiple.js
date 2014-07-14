/*
 * Dynamic Google Map with multiple markers.
 *  
 * Using existing coordinates, not geocoding on the fly due to problems with
 * asynchronous geocoder requests.
 */

//==== GLOBAL VARS =============================================================
var aJSON = [
    {
        "location_name": "Thuis",
        "street_name": "Moerkerkesteenweg",
        "street_number": 9,
        "postcode": 8340,
        "city": "Damme",
        "country": "Belgium",
        "country_code": "BE",
        "lat": 51.2269094,
        "lng": 3.293043,
    },
    {
        "location_name": "The AIM",
        "street_name": "Brugstraat",
        "street_number": 93,
        "postcode": 9880,
        "city": "Aalter",
        "country": "Belgium",
        "country_code": "BE",
        "lat": 51.0983738,
        "lng": 3.4414382,
    },
    {
        "location_name": "VDAB",
        "street_name": "Archimedesstraat",
        "street_number": 4,
        "postcode": 8400,
        "city": "Oostende",
        "country": "Belgium",
        "country_code": "BE",
        "lat": 51.2124155,
        "lng": 2.9382742,
    }
];
//==== FUNCTIONS ===============================================================
function initializeMap() {
    // Build latlng array
    var aLatLng = new Array();
    aJSON.forEach(function(element, index, array) {
        var latlng = new google.maps.LatLng(element.lat, element.lng);
        aLatLng.push(latlng);
    });

    var mapOptions = {
        center: aLatLng[0],
        zoom: 15
    };
    console.log(mapOptions);
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

// Set address details in address container
    var eDivAddress = document.querySelector('#address-container');
    // Add header to address container
    var eAddressHeader = document.createElement('h3');
    eAddressHeader.innerHTML = 'Adres';
    eDivAddress.appendChild(eAddressHeader);

    aJSON.forEach(function(element, index, array) {
        // Create LatLng
        var myLatlng = new google.maps.LatLng(element.lat, element.lng);

        // Set marker
        var marker = new google.maps.Marker({
            map: map,
            position: myLatlng,
            title: element.location_name
        });



        // Add address to address container
        var eAddress = document.createElement('p');
        var sAddress = element.location_name;
        sAddress += '<br>';
        sAddress += element.street_name + ' ' + element.street_number;
        sAddress += '<br>';
        sAddress += element.postcode + ', ' + element.city;
        eAddress.innerHTML = sAddress;
        eDivAddress.appendChild(eAddress);
    });

    // Determine map bounds and center
    var latlngbounds = new google.maps.LatLngBounds();
    aLatLng.forEach(function(element, index, array) {
        latlngbounds.extend(element);
    });
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}
//==== WINDOW ONLOAD LISTENER ==================================================
google.maps.event.addDomListener(window, 'load', initializeMap);
