/*==== GLOBAL VARS ===========================================================*/
var jsonObj = {
        "location_name": "VDAB Opleidingscentrum Oostende",
        "street_name": "Archimedesstraat",
        "street_number": 4,
        "postcode": 8400,
        "city": "Oostende",
        "country": "Belgium",
        "country_code": "BE",
        "lat": 51.2124155,
        "lng": 2.9382742
    };
/*==== FUNCTIONS =============================================================*/
function initialize(object) {
    // Initialize map
    var mapOptions = {
        center: new google.maps.LatLng(object.lat, object.lng),
        zoom: 17
    };
    console.log(mapOptions.center);
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    // Add marker
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(object.lat, object.lng)
    });
    
    
    // Build infowindow content
    var eContent = document.createElement('div');
    
    // Add logo to content div
    var eLogo = document.createElement('img');
    eLogo.src = 'VDAB_200.png';
    eContent.appendChild(eLogo);
    
    // Add text and link to content div
    var eText = document.createElement('p');
    var htmlString = object.location_name + '<br>';
    htmlString += object.street_name + ' ' + object.street_number + '<br>';
    htmlString += object.postcode + ', ' + object.city + '<br>';
    eText.innerHTML = htmlString;
    var eLink = document.createElement('a');
    eLink.href = 'http://www.vdab.be'
    eLink.target = '_blank';
    eLink.innerHTML = 'VDAB website';
    eContent.appendChild(eText);
    eContent.appendChild(eLink);
    
    // Create Infowindow
    var infowindow = new google.maps.InfoWindow({
        content: eContent
    });
    
    // Add event listener on marker to open infowindow
    google.maps.event.addListener(marker, 'click', function() {
       infowindow.open(map, marker);
    });
    
}


/*==== WINDOW ONLOAD LISTENER ================================================*/
google.maps.event.addDomListener(window, 'load', initialize(jsonObj));
