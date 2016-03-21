/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        deviceReady();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var deviceReady = function() {
	var el_loc = document.getElementById('location');
	navigator.geolocation.getCurrentPosition(function(position) {
	    alert(position.coords.latitude);
		el_loc.textContent =  'Latitude: '          + position.coords.latitude          + '\n' +
						  'Longitude: '         + position.coords.longitude         + '\n' +
						  'Altitude: '          + position.coords.altitude          + '\n' +
						  'Accuracy: '          + position.coords.accuracy          + '\n' +
						  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
						  'Heading: '           + position.coords.heading           + '\n' +
						  'Speed: '             + position.coords.speed             + '\n' +
						  'Timestamp: '         + position.timestamp                + '\n';

		el_dist = document.getElementById('distance');
		
		el_dist.textContent = Math.round(getDistance(
			{lat: position.coords.latitude, lng: position.coords.longitude},
			{lat: 51.6889006, lng: 5.2848906}
		));
	});
	
	//navigator.compass.getCurrentHeading(function(heading) {
	    //alert('Heading: ' + heading.magneticHeading);
	    //alert('gvd tifus zooi');
	//}, function(error) {
	    //alert('CompassError: ' + error.code);
	//});
}

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

var rad = function(x) {
  return x * Math.PI / 180;
};




