// NPS Api query info
// potential inputs to gather from the user:
// state, park id (this can be pulled from the parks search api), keyword search, limit number to return


// darksky API
var darkskyKey = "24ad87e96d744bd3fb31284ccc8763a1"
var weatherUrl = "https://api.darksky.net/forecast/" + darkskyKey + "/[latitude],[longitude],[time]"
var campQueryParams = {
    "api_key": "IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ",
}

var amenitiesArray = []





// function for weather api ajax call
function getWeather(lat, long, date) {
latLongString =lat + "," + long + "," + date;
$.ajax({
    method: 'GET',
    url: weatherUrl
}).then(function (response){

})
}

$('#submit').on('click', function (event) {
    event.preventDefault();
    campQueryParams.q = $("#location").val().trim();
    //campQueryParams.limit = $("limit-results").val();
    var campgroundUrl = "https://developer.nps.gov/api/v1/campgrounds?" + $.param(campQueryParams);
    startDate = $('#start-date').val().trim();
    startMoment = moment(startDate, 'MM/DD/YYYY');
    endDate = $('#end-date').val().trim();
    
    $.ajax({
        method: 'GET',
        url: campgroundUrl
    }).then(function (response) {
        //loop through each campground
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].latLong)
        
        }
        getWeather(latLong.lat, latLong.long, startDate);
    });

    // clear out values
    //$('#location').val('');

});


// nathional park campground ajax call




/////  **** open cage api *** ///////////////
// var openCageKey = "690453a113264701806396693c84ed17"

// // Opencage data geocoding -> takes in a city or place name and spits out the lat and long (we need this for our weather functionality)
// // ajax call to open cage
// function openCageAjax(){
//     var openCageQueryUrl = "https://api.opencagedata.com/geocode/v1/json?q="+ openCagePlace +"&key=690453a113264701806396693c84ed17"
//     $.ajax({
//         method: 'GET',
//         url: openCageQueryUrl
//     }).then(function(response) {

//         console.log(response);
//         console.log(response.geomotry)
//     })
// }