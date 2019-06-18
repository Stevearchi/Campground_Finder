var amenitiesArray = [];
$("#display-campsites").hide();
$(".custom-control-input").on("click", function() {
  console.log($(this).attr("data-check"));
  if ($(this).attr("data-check") === "false") {
    $(this).attr("data-check", "true");
  } else {
    $(this).attr("data-check", "false");
  }
});
var parkCode;
var parkLatLong;


$("#submit").on("click", function(event) {
  event.preventDefault();
  console.log('in on submit');
  
  // var amenitiesArray = [];
  if ($("#showers").attr("data-check") === "true") {
    amenitiesArray.push($("#showers").attr("id"));
  }
  if ($("#toilets").attr("data-check") === "true") {
    amenitiesArray.push($("#toilets").attr("id"));
  }
  if ($("#trash").attr("data-check") === "true") {
    amenitiesArray.push($("#trash").attr("id"));
  }
  if ($("#foodStorage").attr("data-check") === "true") {
    amenitiesArray.push($("#foodStorage").attr("id"));
  }
  if ($("#water").attr("data-check") === "true") {
    amenitiesArray.push($("#water").attr("id"));
  }
  if ($("#firewood").attr("data-check") === "true") {
    amenitiesArray.push($("#firewood").attr("id"));
  }



  var parkName = $("#location")
    .val()
    .trim();

  var parkUrl =
    "https://developer.nps.gov/api/v1/parks?api_key=IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ&q=" +
    parkName;
  $.ajax({
    url: parkUrl,
    method: "GET"
  }).then(function(response) {
    var parkResults = response.data[0];
    parkCode = parkResults.parkCode;
    parkLatLong = parkResults.latLong;
    campground();
  })
  
})

function campground() {
  console.log('in campground');
  
  var campgroundUrl =
    "https://developer.nps.gov/api/v1/campgrounds?api_key=IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ&parkCode=" +
    parkCode;

  $.ajax({
    url: campgroundUrl,
    method: "GET"
  }).then(function(response) {
    var campResults = response.data;
    console.log(campResults);
    
    console.log(campResults.length);
    for (var i = 0; i < campResults.length; i++) {
      $("#display-campsites").show();
      var campgroundName = campResults[i].name;
      var campgroundDescription = campResults[i].description;
      var campgroundInfoUrl = campResults[i].regulationsurl;
      var campgroundDirections = campResults[i].directionsUrl;
      if (campground)
      var informationButton = $("<a href=" + campgroundInfoUrl + " target='_blank'> Information </a>").addClass("btn btn-primary");
      var directionsButton = $("<a href=" + campgroundDirections + " target='_blank'> Directions </a>").addClass("btn btn-primary");
      var campsite = $("<div>").addClass("ajaxResponse col-md-12 border-bottom border-primary");
      campsite.append("<h2>" + campgroundName + "</h2>")
      campsite.append("<p>"  + campgroundDescription + "</p>");
      campsite.append(directionsButton, informationButton);
      $("#append-here").append(campsite);
    }
    // append these divs to soon to be created row
  });
}

$("#reset").on("click", function() {
  $("#append-here").empty();
  $("input").val("");
  $("#display-campsites").hide();
  
});
