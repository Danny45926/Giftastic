var sportsArray = ["Soccer", "Hockey", "Football", "Baseball", "Basketball" ];

$(document).ready(function() {
    for (var i = 0; i < sportsArray.length; i++) {
        $("#sport-buttons").append("<button type='button' onclick='findGif(\"" + sportsArray[i] + "\")' class='btn btn-primary' value=' " + sportsArray[i] + "'> " + sportsArray[i] + " </button>");
    }
});

function sportButtonClicked() {
  var userInput = $('#sport-input').val();
findGif(userInput);
}

function submitButtonClicked() {
  var userInput = $('#sport-input').val();

  if (userInput) {
        $('#sport-buttons').append("<button type='button' onclick='findGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function findGif(gifName) {
  $.ajax({
      url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + '&api_key=dc6zaTOxFJmzC',
      type: 'GET',
  })
  .done(function(response) {
    displayGif(response);
  })
}

function displayGif(response) {
  $('#sports').empty();
  for (var i = 0; i < response.data.length; i++) {
    var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
    var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
      '" data-still=" ' + response.data[i].images.fixed_height_still.url +
      ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

    image = '<div class="col-md-4">' + image + "</div>";
      $('#sports').append(image);
    }

      $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}