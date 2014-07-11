/*==== GLOBAL VARS ===========================================================*/
var jsonObj = {
    "location_name": "Thuis",
    "street_name": "moerkerkse steenweg",
    "street_number": 9,
    "postcode": 8340,
    "city": "damme",
    "country": "belgium",
    "country_code": "BE"
};
/*==== FUNCTIONS =============================================================*/
function getGeolocation() {
    var request = {
        "address": jsonObj.street_name + ' ' + jsonObj.street_number + ', ' + jsonObj.postcode + ' ' + jsonObj.city + ', ' + jsonObj.country,
        "region": jsonObj.country_code
    };
    console.log(request.address);
    console.log(request.region);
    var defaultLocation = {"address": "Belgium"};
    var geoCoder = new google.maps.Geocoder();
    geoCoder.geocode(request, function(results, status) {
        console.log(results);
        // Check status
        if (status == google.maps.GeocoderStatus.OK) {
            // Check responses, if multiple, use first
            if (results.length != 0) {
                // Get first result
                var firstResult = results.shift();
                console.log(firstResult);
                initialize(firstResult);
            } else {
                // Initialize with default values.
                initializeDefault();
            }
        }
    });
}

function initialize(location) {
    console.log(location.geometry.location.lat());
    console.log(location.geometry.location.lng());
    var mapOptions = {
        center: new google.maps.LatLng(location.geometry.location.lat(), location.geometry.location.lng()),
        zoom: 15
    };
    
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({
            map: map,
            position: location.geometry.location
        });
}

function initializeDefault() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
/*==== WINDOW ONLOAD LISTENER ================================================*/
google.maps.event.addDomListener(window, 'load', getGeolocation);
