var campQueryParams = {
    "api_key": "IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ",
};

var amenitiesArray = [];

campQueryParams.q = $("#location").val().trim();
campQueryParams.limit = $("limit-results").val();
amenitiesArray.push($("#showers").prop("checked", true));
amenitiesArray.push($("#toilets").prop("checked", true));
amenitiesArray.push($("#trash").prop("checked", true));
amenitiesArray.push($("#foodStorage").prop("checked", true));
amenitiesArray.push($("#water").prop("checked", true));
amenitiesArray.push($("#firewood").prop("checked", true));



var campgroundUrl = "https://developer.nps.gov/api/v1/campgrounds?" + campQueryParams

    

$("#submit").on("click", function(event) {
    event.preventDefault();
    console.log(amenitiesArray)
    console.log($("#showers"))
})





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
