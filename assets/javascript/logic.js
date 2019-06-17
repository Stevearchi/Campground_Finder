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

campQueryParams.q = $("#location").val().trim();
campQueryParams.limit = $("limit-results").val();
//amenitiesArray.push = 
// campQueryParams.field = I'm not sure how to grab the checked boxes vs unchecked, but we'll add any checked radio buttons to an array.  We may have to add a data-value or some other attribute to capture the specific buttons

var campgroundUrl = "https://developer.nps.gov/api/v1/campgrounds?" + campQueryParams;






$('#submit').on('click', function (event){
    event.preventDefault();
    $.ajax({
        method: 'GET',
        url: campgroundUrl
    }).then(function() {
    
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