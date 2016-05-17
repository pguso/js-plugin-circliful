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


Add an element to your Site with a unique id and an "container" around it that controls the size of your circle statistic, here a example with bootstrap:

	<div class="row">
        <div class="col-lg-2">
            <div id="test-circle"></div>
        </div>
    </div>

Add this code at the end of your site

	<script>
	$( document ).ready(function() {
			$("#test-circle").circliful({
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
| startPoint | start point for half circle, only for half circle | integer | 180 |
| foregroundColor     | color of the foreground circle (no color add value 'none') | RGB or string | #3498DB  |
| backgroundColor   | color of the background circle (no color add value 'none') |   RGB or string | #eee |
| fillColor | fill color of circle      | RGB or string | none |
| pointColor | fill color of point circle      | RGB or string | none |
| pointSize | Size of point circle      | int | 28.5 |
| foregroundBorderWidth     | width of foreground circle border | int | 15 |
| backgroundBorderWidth     | width of background circle border | int | 15 |
| fontColor | color of the percentage | RGB | #aaa |
| percent     | can be 1 to 100 | integer | 75 |
| animation     | if the circle should be animated initialy | int | 1 |
| animationStep     | can be 1 to 100, how fast or slow the animation should be | int | 5 |
| icon     | font awesome icon, details bellow | string | none |
| iconSize     | font size of the icon | integer | 30 |
| iconColor     | color of the icon | RGB | #ccc |
| iconPosition     | position of the icon (top, bottom, left, right or middle) | string | top |
| percentageTextSize     | font size of the percentage text | integer | 22 |
| textAdditionalCss     | additonal css for the percentage text | string | '' |
| targetPercent | draws a circle around the main circle | integer | 0 |
| targetTextSize | font size of the target percentage | integer | 17 |
| targetColor | fill color of the target circle | RGB | #2980B9 |
| text | info text shown bellow the percentage in the circle | string | '' |
| textStyle | css inline style you wanna add to your info text | string | '' |
| textColor | font color of the info text | RGB | #666 |

Font Awesome Usage
------------------
Go to https://github.com/FortAwesome/Font-Awesome/blob/master/css/font-awesome.css and copy/paste the string after the slash for Example hdd icon:

    .fa-hdd-o:before {
        content: "\f0a0";
    }

copy/paste f0a0 into the parameter field { icon: 'f0a0' }

Examples
--------
![full](https://raw.github.com/giovannimanzoni/jquery-plugin-circliful/master/preview/previewHalf.png)
![full](https://raw.github.com/giovannimanzoni/jquery-plugin-circliful/master/preview/preview.png)
![full](https://raw.github.com/giovannimanzoni/jquery-plugin-circliful/master/preview/preview2.png)
![full](https://raw.github.com/giovannimanzoni/jquery-plugin-circliful/master/preview/preview3.png)
![full](https://raw.github.com/giovannimanzoni/jquery-plugin-circliful/master/preview/preview4.png)

Donation
--------
If you find this plugin usefull or/and use it commercially please donate as much as you like.

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D3F2MMNDHQ9KQ)


