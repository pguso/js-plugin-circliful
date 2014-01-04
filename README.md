jquery-plugin-circliful
=======================

- show Infos as Circle Statistics, no images used
- based on html5 canvas and jquery
- many options can be set as data attributes


How to use circliful
--------------------

Include circliful & jquery to your Site

	<link href="css/jquery.circlify.css" rel="stylesheet" type="text/css" />
	
	<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
	<script src="js/jquery.circliful.min.js"></script>


Add an element to your Site with a unique id an the data attributes that you need, for Example:

	<div id="myStat" data-dimension="250" data-text="35%" data-info="New Clients" data-width="30" data-fontsize="38" data-percent="35" data-fgcolor="#61a9dc" data-bgcolor="#eee" data-fill="#ddd"></div>

Add this code at the end of your site

	<script>
	$( document ).ready(function() {
			$('#myStat').circliful();
	    });
	</script>


Data Options (Attributes)
-------------------------

you can set the options easily as data attributes for Example: data-dimension="250"

* dimension / is the height and width of the element / default is 200px on 200px
* text / will be deisplayed inside of the circle over the info element
* info / will be deisplayed inside of the circle bellow the text element (can be empty if you dont want to show info text)
* width / is the size of circle / default is 15px
* fontsize / is the font size for the text element / default is 15px
* percent / can be 1 to 100
* fgcolor / is the foreground color of the circle / default is #556b2f
* bgcolor / is the background color of the cicle / default is #eee
* fill / is the background color of the whole circle (can be empty if you dont want to set a background to the whole circle)
* type / full or half circle for example data-type="half" if not set the circle will be a full circle / default full circle


Examples
--------

##### Circle
![full](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/full-cicle.PNG)

##### Filled Circle
![filled](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/full-cicle-filled.PNG)

##### Half Circle Filled
![half](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/half-cicle.PNG)

