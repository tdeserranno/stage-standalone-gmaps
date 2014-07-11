//==== GLOBAL VARS =============================================================
var jsonArr = [
    {
        "location_name": "Thuis",
        "street_name": "Moerkerksesteenweg",
        "street_number": 9,
        "postcode": 8340,
        "city": "Damme",
        "country": "Belgium",
        "country_code": "BE"
    },
    {
        "location_name": "The AIM",
        "street_name": "Brugstraat",
        "street_number": 93,
        "postcode": 9880,
        "city": "Aalter",
        "country": "Belgium",
        "country_code": "BE"
    },
    {
        "location_name": "VDAB",
        "street_name": "Archimedesstraat",
        "street_number": 4,
        "postcode": 8400,
        "city": "Oostende",
        "country": "Belgium",
        "country_code": "BE"
    }
];
var url = 'https://maps.googleapis.com/maps/api/staticmap?size=800x600';
var aAddress = new Array();
//==== FUNCTIONS ===============================================================
function processAddress(element, index, array) {
    // Add address data to url string
    url += '&markers=color:gray|';
    url += 'label:' + (index + 1) + '|';
    url += element.street_name + '+';
    url += element.street_number + ',';
//    url += element.postcode + '+';
    url += element.city;

    // Create new DOM element and add to aAddress array
    var eAddress = document.createElement('p');
    var address = 'label: ' + (index + 1);
    address += '<br>';
    address += element.street_name + ' ' + element.street_number;
    address += '<br>';
    address += element.postcode + ', ' + element.city;
    eAddress.innerHTML = address;
    aAddress.push(eAddress);
}
//==== WINDOW ONLOAD ===========================================================
window.onload = function() {
    // DOM elements
    var eMapContainer = document.querySelector('#map-container');
    var eAddressContainer = document.querySelector('#address-container');

    // Create new image element with json object data
    var eMapStatic = document.createElement('img');

    // Add marker and address for each json object
    jsonArr.forEach(processAddress);

    // Set new element source and add map to DOM
    eMapStatic.src = url;
    eMapContainer.appendChild(eMapStatic);

    // Add header to address container
    var eAddressHeader = document.createElement('h3');
    eAddressHeader.innerHTML = 'Adressen';
    eAddressContainer.appendChild(eAddressHeader);

    // Add each address to address container
    aAddress.forEach(function(element, index, array) {
        eAddressContainer.appendChild(element);
    });
};
