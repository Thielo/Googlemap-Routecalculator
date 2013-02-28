<!DOCTYPE html>
<html>
    <head>
        <title>Googlemaps-Routenplaner</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script src="http://code.jquery.com/jquery.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/script.js"></script>
        <style type="text/css">
            html, body { height: 100%; margin: 0; padding: 0; }
            #map_canvas { height: 100%; min-height: 800px;}
        </style>
    </head>
    <body onload="initialize()">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span2">
                    <!--Sidebar content-->
                    <h3>Locations</h3>
                    <ul id="routeList">
                        <li><a href="#" data-lat="50.56" data-lng="6.57">Cologne <small>(50°56'N, 06°57E)</small></a></li>
                        <li><a href="#" data-lat="48.08" data-lng="11.31">Munic <small>(48°08'N, 11°31'E)</small></a></li>
                        <li><a href="#" data-lat="52.30" data-lng="13.25">Berlin <small>(52, 30 N, 13, 25 E)</small></a></li>
                        <li><a href="#" data-lat="53.33" data-lng="9.59">Hamburg <small>(53°33'N, 09°59'E)</small></a></li>
                        <li><a href="#" data-lat="50.07" data-lng="8.41">Frankfurt <small>(50°07'N, 08°41'E)</small></a></li>
                        <li><a href="#" data-lat="50.7756156" data-lng="6.0812364">Aachen <small>(50°45'N, 06°06'E)</small></a></li>
                    </ul>
                    <button class="btn btn-info btn-block" type="button">Calculate Route</button>
                    <div id="directions_panel">
                    </div>
                </div>
                <div class="span10" id="map_canvas">

                </div>
            </div>
        </div>
    </body>
</html>
