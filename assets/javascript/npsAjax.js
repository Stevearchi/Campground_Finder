// NPS Api query info
// potential inputs to gather from the user:
// state, park id (this can be pulled from the parks search api), keyword search, limit number to return

var campQueryParams = {
    "api_key": "IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ",
}

var amenitiesArray = []

campQueryParams.q = $("#location").val().trim();
campQueryParams.limit = $("limit-results").val();
amenitiesArray.push = 
// campQueryParams.field = I'm not sure how to grab the checked boxes vs unchecked, but we'll add any checked radio buttons to an array.  We may have to add a data-value or some other attribute to capture the specific buttons

var campgroundUrl = "https://developer.nps.gov/api/v1/campgrounds?" + campQueryParams


// Opencage data geocoding -> takes in a city or place name and spits out the lat and long (we need this for our weather functionality)
// we need to grab the results from response.results.geometry.lat and response.results.geometry.lng
var opencageKey = "690453a113264701806396693c84ed17"
var opencagePlace = $("location").val().trim()
var opencageQueryUrl = "https://api.opencagedata.com/geocode/v1/json?q="+ opencagePlace +"&key=690453a113264701806396693c84ed17"



// darksky API
var darkskyKey = "24ad87e96d744bd3fb31284ccc8763a1"
var weatherUrl = "https://api.darksky.net/forecast/" + darkskyKey + "/[latitude],[longitude],[time]"





