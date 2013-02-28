var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var clicked = 0;
var markersArray = [];
var charChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var germany = new google.maps.LatLng(51.000000, 9.000000);
  var mapOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: germany
  }
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

function calculateRoute(){
  deleteOverlays();
  var start = new google.maps.LatLng($('#routeList li.start a').data('lat'),$('#routeList li.start a').data('lng'));
  var end = new google.maps.LatLng($('#routeList li.target a').data('lat'),$('#routeList li.target a').data('lng'));
  var waypts = [];
  var checkboxArray = $('#routeList .waypoint.active');
  if(checkboxArray.length > 0){
    checkboxArray.each(function(index){
      waypts.push({location:new google.maps.LatLng($(this).find('a').data('lat'),$(this).find('a').data('lng')),stopover:true});
    });

  }


  var request = {
            origin: start,
            destination: end,

            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
          console.log(response + ' | ' + status);
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions_panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<div class="well" style="margin-top: 20px"><strong>Route: ' + charChars[i] + ' zu ' + charChars[i + 1] + '</strong><br /><strong>'+charChars[i]+':</strong> '+route.legs[i].start_address+'<br /><strong>'+charChars[i + 1]+':</strong> '+route.legs[i].end_address+'<br /><strong>Distance:</strong> '+route.legs[i].distance.text+'</div>';
            }
          }
        });
}
$('#routeList + button').hide();


$('#routeList a').click(function(){
  if(!$(this).parent().hasClass('active')){
    if($('#routeList').find('.start').length <= 0){
      $(this).parent().addClass('start active');
      $(this).parent().append('&nbsp;<i class="icon-home"></i>');
    }else if($('#routeList').find('.target').length <= 0){
      $(this).parent().addClass('target active');
      $(this).parent().append('&nbsp;<i class="icon-map-marker"></i>');
    }else{
      $(this).parent().addClass('waypoint active');
      $(this).parent().append('&nbsp;<i class="icon-plus"></i>');
    }
    if($('#routeList').find('.start').length == 1 && $('#routeList').find('.target').length == 1){
      $('#routeList + button').fadeIn();
    }
  }else{
    $(this).parent().removeClass();
    $(this).parent().find('i').remove();
    if($('#routeList').find('.start').length == 0 || $('#routeList').find('.target').length == 0){
      $('#routeList + button').fadeOut();
    }
  }
  if($('#routeList + button.aktiv').length == 1){
    $('#routeList + button.aktiv').text('Route aktualisieren');
    $('#routeList + button.aktiv').addClass('aktualisieren');
  }
  return false;
});


$('#routeList + button').click(function(){
  if(!$(this).hasClass('aktiv')){
    calculateRoute();
    $(this).addClass('aktiv');
    $(this).text('Create New Route');
  }else{
    if($(this).hasClass('aktualisieren')){
      calculateRoute();
      $(this).text('Create New Route');
    }else{
      $(this).text('Calculate Route');
      $(this).removeClass('aktiv');
      $("#routeList li").removeClass();
      $("#routeList li i").remove();
      $('#routeList + button').fadeOut();
    }
  }
});

function createmarker(){
  var parliament = new google.maps.LatLng($('#routeList li.start a').data('lat'),$('#routeList li.start a').data('lng'));
  marker = new google.maps.Marker({
      map:map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      position: parliament
  });
  markersArray.push(marker);
  google.maps.event.addListener(marker, 'click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
}
