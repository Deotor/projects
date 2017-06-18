function customMapStyleRed() {
    var customMapType = new google.maps.StyledMapType([
        {
            stylers: [
                {hue: '#890000'},
                {visibility: 'simplified'},
                {gamma: 0.5},
                {weight: 0.5}
            ]
        },
        {
            elementType: 'labels',
            stylers: [{visibility: 'off'}]
        },
        {
            featureType: 'water',
            stylers: [{color: '#890000'}]
        }
    ], {
        name: 'Red Style'
    });

    return customMapType;
}