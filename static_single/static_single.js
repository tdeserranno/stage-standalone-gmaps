/*==== GLOBAL VARS ===========================================================*/
var jsonObj = {
    "location_name": "Thuis",
    "street_name": "Moerkerksesteenweg",
    "street_number": 9,
    "postcode": 8340,
    "city": "Damme",
    "country": "Belgium",
    "country_code": "BE"
};
/*==== WINDOW ONLOAD =========================================================*/
window.onload = function() {
    // DOM elements
    var eMapContainer = document.querySelector('#map-container');
    var eAddressContainer = document.querySelector('#address-container');
    
    // Create new image element with json object data
    var eMapStatic = document.createElement('img');
    
    // Build url
    var url = 'https://maps.googleapis.com/maps/api/staticmap?size=800x600';
    // Add marker for json object
    url += '&markers=color:gray|';
    url += jsonObj.street_name + '+';
    url += jsonObj.street_number + ',';
//    url += jsonObj.postcode + '+';
    url += jsonObj.city;
    
    // Set new element source
    eMapStatic.src = url;
    
    // Add map to DOM
    eMapContainer.appendChild(eMapStatic);
    
    // Add header to address container
    var eAddressHeader = document.createElement('h3');
    eAddressHeader.innerHTML = 'Adres';
    eAddressContainer.appendChild(eAddressHeader);
    
    // Build address data
    var eAddress = document.createElement('p');
    var address = jsonObj.street_name + ' ' + jsonObj.street_number;
    address += '<br>';
    address += jsonObj.postcode + ', ' + jsonObj.city;
    eAddress.innerHTML = address;
    
    // Add address text to DOM
    eAddressContainer.appendChild(eAddress);
}