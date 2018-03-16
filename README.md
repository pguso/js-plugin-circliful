jquery-plugin-circliful
=======================

- show Infos as Circle Statistics, no images used
- based on SVG and jquery
- many options can be set
- fully responsive


How to use circliful
--------------------

Include circliful & jquery to your Site.

	<link href="css/jquery.circliful.css" rel="stylesheet" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script src="js/jquery.circliful.min.js"></script>

It's tested up to jQuery Versions:
- 1.12.4
- 2.2.4
- 3.1.0

Test it directly on JS Fiddle https://jsfiddle.net/9dajqcr1/

Add an element to your Site with a unique id and an "container" around it that controls the size of your circle statistic, here a example with bootstrap:

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
### Circle

| Option        | Description           | Type           | Default  |
| :-------------: |:-------------|:-----:|:-----:|
| foregroundColor     | color of the foreground circle (no color add value 'none') | RGB or string | #3498DB  |
| backgroundColor   | color of the background circle (no color add value 'none') |   RGB or string | #eee |
| fillColor | fill color of circle      | RGB or string | none |
| pointColor | fill color of point circle      | RGB or string | none |
| pointSize | Size of point circle      | int | 28.5 |
| foregroundBorderWidth     | width of foreground circle border | int | 15 |
| backgroundBorderWidth     | width of background circle border | int | 15 |
| animation     | if the circle should be animated initially | int | 1 |
| animationStep     | can be 1 to 100, how fast or slow the animation should be | int | 5 |
| progresColor    | change color of foreground circle as percents changed（{ 50: '#FF6C00', 60: '#FF6C00'}） | object  | null |
| halfCircle | draw half circle see example bellow | boolean | false |
| animateInView | animate circle on scroll into view | boolean | false |

### Percentage Text
| Option        | Description           | Type           | Default  |
| :-------------: |:-------------|:-----:|:-----:|
| fontColor | color of the percentage | RGB | #aaa |
| percentageY | vertical position of the percentage text | integer | 100 |
| percentageX | horizontal position of the percentage text | integer | 100 |
| percent     | can be 1 to 100 | integer | 75 |
| percentageTextSize     | font size of the percentage text | integer | 22 |
| textAdditionalCss     | additional css for the percentage text | string | '' |
| targetPercent | draws a circle around the main circle | integer | 0 |
| targetTextSize | font size of the target percentage | integer | 17 |
| targetColor | fill color of the target circle | RGB | #2980B9 |
| text | info text shown bellow the percentage in the circle | string | '' |
| textStyle | css inline style you want to add to your info text | string | '' |
| textColor | font color of the info text | RGB | #666 |
| textY | vertical position of your info text | integer | null |
| textX | horizontal position of your info text | integer | null |
| textBelow | aligns string of "text" property centered below the circle | boolean | false |
| multiPercentage | turns multiple bars on if set to 1 | integer | 1 |
| percentages | array of percent, color and title for each circle | array | [] |
| multiPercentageLegend | show a legend with title, color and percentage on the right | integer | 0 |
| noPercentageSign | to hide the percentage sign | boolean | false |
| replacePercentageByText | replace the percentage shown in the circle by text | string | null |
| decimals | number of decimal places to show | integer | 0 |
| alwaysDecimals | shows decimals while animating instead of only at the end or if less than 1 | boolean | false |
| title | title of the circle | string | Circle Chart |
|description | description of the circle | string | '' |

### Icon
| Option        | Description           | Type           | Default  |
| :-------------: |:-------------|:-----:|:-----:|
| icon     | font awesome icon, details bellow | string | none |
| iconSize     | font size of the icon | integer | 30 |
| iconColor     | color of the icon | RGB | #ccc |
| iconPosition     | position of the icon (top, bottom, left, right or middle) | string | top |
| iconDecoration     | decoration of icon percetage | boolean | true |

Data Attributes
------------------

All Options can also be set as data attributes, for example:

    <div id="test-circle" data-animation="1" data-animationStep="5" data-percent="58"></div>

Half Circle
------------------

Example:

    $("#test-circle5").circliful({
	    animationStep: 5,
	    foregroundBorderWidth: 5,
	    backgroundBorderWidth: 15,
	    percent: 80,
	    halfCircle: 1,
	});

![full](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/half_circle.PNG)

Multiple Bars
------------------

Example:

    $("#test-circle").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 7,
            backgroundBorderWidth: 7,
            textSize: 28,
            textStyle: 'font-size: 12px;',
            textColor: '#666',
            multiPercentage: 1,
            percentages: [
            	{'percent': 10, 'color': '#3180B8', 'title': 'Gryffindor' },
			{'percent': 30, 'color': '#4ADBEA', 'title': 'Ravenclaw' },
			{'percent': 50, 'color': '#49EBA8', 'title': 'Hufflepuff' },
			{'percent': 70, 'color': '#FFCA35', 'title': 'Slytherin' }
            ],
            multiPercentageLegend: 1,
	    replacePercentageByText: '',
            backgroundColor: '#eee',
            icon: 'f0d0',
            iconPosition: 'middle',
            iconColor: '#273B4E'
        });
	
<img width="450" src="https://github.com/pguso/jquery-plugin-circliful/raw/master/preview/preview5.png">

In action: https://jsfiddle.net/0c8qaqaj/41/

Use callback function
------------------
Gets fired on complete.

Example:

    $("#circli").circliful({
            animation: 1,
            animationStep: 10,
            foregroundBorderWidth: 5,
            backgroundColor: "none",
            fillColor: '#eee',
            percent: 75,
            iconColor: '#3498DB',
            icon: 'f206',
            iconSize: '40',
            iconPosition: 'middle',
            start:50,
            showPercent:1,
            target:0
        }, function(){
            alert('done !');
        });

Font Awesome Usage
------------------
Go to https://github.com/FortAwesome/Font-Awesome/blob/master/css/font-awesome.css and copy/paste the string after the slash for Example hdd icon:

    .fa-hdd-o:before {
        content: "\f0a0";
    }

copy/paste f0a0 into the parameter field { icon: 'f0a0' }

Examples
--------
![full](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/preview.png)
![full](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/preview2.png)
![full](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/preview3.png)
![full](https://raw.github.com/pguso/jquery-plugin-circliful/master/preview/preview4.png)
![full](https://cloud.githubusercontent.com/assets/8194302/16715870/ba5968ec-46c2-11e6-8d0b-4afe57da66a0.png)

Donation
--------
If you find this plugin usefull or/and use it commercially please donate as much as you like.

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D3F2MMNDHQ9KQ)
