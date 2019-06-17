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






