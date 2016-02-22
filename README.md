jquery-plugin-circliful
=======================

- show Infos as Circle Statistics, no images used
- based on SVG and jquery
- many options can be set
- fully responsive


How to use circliful
--------------------

Include circliful & jquery to your Site

	<link href="css/jquery.circliful.css" rel="stylesheet" type="text/css" />
	
	<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
	<script src="js/jquery.circliful.min.js"></script>


Add an element to your Site with a unique id and an "container" arround it that controls the size of your circle statistic, here a example with bootstrap:

	<div class="row">
        <div class="col-lg-2">
            <div id="test-circle"></div>
        </div>
    </div>

Add this code at the end of your site

	<script>
	$( document ).ready(function() {
			$("#your-circle").circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            percent: 75
        });
	    });
	</script>


Options
-------------------------

| Option        | Description           | Type           | Default  |
| ------------- |:-------------:| -----:|-----:|
| foregroundColor     | color of the foreground circle (no color add value 'none') | RGB or string | #3498DB  |
| backgroundColor   | color of the background circle (no color add value 'none') |   RGB or string | #eee |
| fillColor | fill color of circle      | RGB or string | none |
| foregroundBorderWidth     | width of foreground circle border | int | 15 |
| backgroundBorderWidth     | width of background circle border | int | 15 |
| percent     | can be 1 to 100 | integer | 75 |
| animation     | if the circle should be animated initialy | int | 1 |
| animationStep     | can be 1 to 100, how fast or slow the animation should be | int | 5 |

Examples
--------
![full](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/preview.png)

