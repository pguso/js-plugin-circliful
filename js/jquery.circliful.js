    (function( $ ) {
 
    $.fn.circliful = function(options) {
        
        var settings = $.extend({
            // These are the defaults.
            foregroundColor: "#556b2f",
            backgroundColor: "#eee",
            width: 15,
            dimension: 200,
            size: 15, 
			percent: 50
        }, options );
         return this.each(function() {
                var dimension = '';
                var text = '';
				var info = '';
                var width = '';
                var size = 0;
				var percent = 0;
				var endPercent = 100;
				var fgcolor = '';
				var bgcolor = '';
				var icon = '';
    
                $(this).attr('class', 'circliful');
    
                if($(this).data('dimension') != undefined) {
                    dimension = $(this).data('dimension');
                } else {
                    dimension = settings.dimension;
                }
    
                if($(this).data('width') != undefined) {
                    width = $(this).data('width');
                } else {
                    width = settings.width;
                }
    
                if($(this).data('fontsize') != undefined) {
                    size = $(this).data('fontsize');
                } else {
                    size = settings.size;
                }
				
				if($(this).data('percent') != undefined) {
                    percent = $(this).data('percent') / 100;
					endPercent = $(this).data('percent');
                } else {
                    percent = settings.percent / 100;
                }
				
				if($(this).data('fgcolor') != undefined) {
                    fgcolor = $(this).data('fgcolor');
                } else {
                    fgcolor = settings.foregroundColor;
                }
				
				if($(this).data('bgcolor') != undefined) {
                    bgcolor = $(this).data('bgcolor');
                } else {
                    bgcolor = settings.backgroundColor;
                }
    
                if($(this).data('text') != undefined) {
                    text = $(this).data('text');
					
					if($(this).data('icon') != undefined) {
						icon = '<i class="fa ' + $(this).data('icon') + '"></i>';
					}
					
					 if($(this).data('type') != undefined) {
						type = $(this).data('type');
					
						if(type == 'half') {
							$(this).append('<span class="circle-text-half">' +  icon  + text + '</span>');
							$(this).find('.circle-text-half').css({'line-height': (dimension / 1.45) + 'px', 'font-size' : size + 'px' });
						} else {
							$(this).append('<span class="circle-text">' + icon + text + '</span>');
							$(this).find('.circle-text').css({'line-height': dimension + 'px', 'font-size' : size + 'px' });
						}
					} else {
						$(this).append('<span class="circle-text">' + icon + text + '</span>');
						$(this).find('.circle-text').css({'line-height': dimension + 'px', 'font-size' : size + 'px' });
					}
                } else if($(this).data('icon') != undefined) {
				
				}
				
				if($(this).data('info') != undefined) {
                    info = $(this).data('info');
					
					if($(this).data('type') != undefined) {
						type = $(this).data('type');
					
						if(type == 'half') { 
							$(this).append('<span class="circle-info-half">' + info + '</span>');
							$(this).find('.circle-info-half').css({'line-height': (dimension * 0.9) + 'px', });
						} else {
							$(this).append('<span class="circle-info">' + info + '</span>');
							$(this).find('.circle-info').css({'line-height': (dimension * 1.25) + 'px', });
						}
					} else {
						$(this).append('<span class="circle-info">' + info + '</span>');
						$(this).find('.circle-info').css({'line-height': (dimension * 1.25) + 'px', });
					}
                }
    
                $(this).width(dimension + 'px');
				
				$(this).append('<canvas id="' + $(this).attr('id') + '_canvas" width="' + dimension + '" height="' + dimension + '"></canvas>');
				
				
              var canvas = document.getElementById($(this).attr('id') + '_canvas');
              var context = canvas.getContext('2d');
              var x = canvas.width / 2;
              var y = canvas.height / 2;
			  var degrees = percent * 360.0;
			  var radians = degrees * (Math.PI / 180);
              var radius = canvas.width / 2.5;
              var startAngle = 2.3 * Math.PI;
              var endAngle = 0;
              var counterClockwise = false;
			  var curPerc = 0;
			  var circ = Math.PI * 2;
			  var quart = Math.PI / 2;
			  var type = '';
			  var fill = false;
			  
			  /** helper **/
				function writeMessage(canvas, message) {
				var context = canvas.getContext('2d');
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.font = '18pt Calibri';
				context.fillStyle = 'black';
				context.fillText(message, 10, 25);
			  }
			  function getMousePos(canvas, evt) {
				var rect = canvas.getBoundingClientRect();
				return {
				  x: evt.clientX - rect.left,
				  y: evt.clientY - rect.top
				};
			  }
console.log($(canvas));
			  canvas.addEventListener('mousemove', function(evt) {
				var mousePos = getMousePos(canvas, evt);console.log(mousePos);
				var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
				writeMessage(canvas, message);
			  }, false);
			  /** helper end **/
			  
			  if($(this).data('type') != undefined) {
                    type = $(this).data('type');
					
					if(type == 'half') {
						var startAngle = 2.0 * Math.PI;
						var endAngle = 3.13;
						var circ = Math.PI * 1.0;
						var quart = Math.PI / 0.996;
					}
                }
				
				if($(this).data('fill') != undefined) {
					fill = $(this).data('fill');
				}
    
			  //animate foreground circle
			  function animate(current) {
				context.clearRect(0, 0, canvas.width, canvas.height);
				 
				context.beginPath();
				context.arc(x, y, radius, endAngle, startAngle, false);
				context.lineWidth = width - 1;
		
				// line color
				context.strokeStyle = bgcolor;
				context.stroke();

				if(fill) {
					context.fillStyle = fill;
					context.fill();
				}
				 
				context.beginPath();
				context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
				context.lineWidth = width;
				// line color
				context.strokeStyle = fgcolor;
				context.stroke();
				curPerc++;
				 
				if (curPerc <= endPercent) {
					 requestAnimationFrame(function () {
						 animate(curPerc / 100);
					 });
				}
				
				var pointNearEnd = getCubicBezierXYatT({
					x: x,
					y: y
				}, {
					x: x,
					y: y
				}, {
					x: x,
					y: y
				}, {
					x: x,
					y: y
				}, 0.99);
				
				var dx = x - curPerc;
				var dy = y - endPercent;
				var endingAngle = Math.atan2(dy, dx);
				
				//arrow
				context.beginPath();
				context.save();
				//context.translate(curPerc, curPerc);
				//context.rotate(endPercent);
				context.moveTo(curPerc * 2, curPerc * 2);
				context.lineTo(curPerc * 0.1, curPerc);
				context.lineTo(curPerc * 0.3, curPerc * 0.3);
				context.lineTo(curPerc * 2, curPerc * 2);
				context.closePath();
				context.fillStyle = fgcolor;
				context.fill();
				context.restore();
			 }
			 
			 // helper functions
			function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
				var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
				var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
				return ({
					x: x,
					y: y
				});
			}

			// cubic helper formula at T distance
			function CubicN(T, a, b, c, d) {
				var t2 = T * T;
				var t3 = t2 * T;
				return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
			}
			 
			 animate();

        });
 
    };
 
}( jQuery ));