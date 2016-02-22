"use strict";

(function ($) {

    $.fn.circliful = function (options, callback) {

        var settings = $.extend({
            // These are the defaults.
            //startDegree: 0,
            foregroundColor: "#3498DB",
            backgroundColor: "#eee",
            fillColor: 'none',
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            fontSize: 15,
            percent: 75,
            animation: 1,
            animationStep: 5,
            iconSize: '20px',
            iconColor: '#999',
            target: 0,
            start: 0,
            showPercent: 1
        }, options);

        return this.each(function () {
            var circleContainer = $(this);
            var percent = settings.percent;

            circleContainer
                .addClass('svg-container')
                .append(
                    $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 194 186" class="circliful">' +
                        '<circle cx="100" cy="100" r="57" class="border" fill="' + settings.fillColor + '" stroke="' + settings.backgroundColor + '" stroke-width="' + settings.backgroundBorderWidth + '" stroke-dasharray="360" transform="rotate(-90,100,100)" />' +
                        '<circle class="circle" cx="100" cy="100" r="57" class="border" fill="none" stroke="' + settings.foregroundColor + '" stroke-width="' + settings.foregroundBorderWidth + '" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" />' +
                        '<text class="timer" text-anchor="middle" x="100" y="110" style="font-size: 36px;" >0%</text>')
                );

            var circle = circleContainer.find('.circle');
            var myTimer = circleContainer.find('.timer');
            var interval = 30;
            var angle = 0;
            var angleIncrement = settings.animationStep;
            var last = 0;
            var summary = 0;
            var oneStep = 0;
            var count = 1;

            if(settings.start > 0 && settings.target > 0) {
                percent = settings.start / (settings.target / 100);
                oneStep = settings.target / 100;
            }

            if(settings.animation == 1) {
                var timer = window.setInterval(function () {console.log(count++)
                    if ((angle) >= (360 / 100 * percent)) {
                        window.clearInterval(timer);
                        last = 1;
                    } else {
                        angle += angleIncrement;
                        summary += oneStep;
                    }

                    if(angle / 3.6 >= percent && last == 1) {
                        angle = 3.6 * percent;
                    }

                    if(summary > settings.target && last == 1) {
                        summary = settings.target;
                    }

                    circle
                        .attr("stroke-dasharray", angle + ", 20000");

                    if(settings.showPercent == 1) {
                        myTimer
                            .text(parseInt(angle / 360 * 100) + '%');
                    } else {
                        myTimer
                            .text(summary);
                    }

                }.bind(circle), interval);
            } else {
                circle
                    .attr("stroke-dasharray", (360 / 100 * percent) + ", 20000");

                if(settings.showPercent == 1) {
                    myTimer
                        .text(percent + '%');
                } else {
                    myTimer
                        .text(settings.target);
                }
            }
        });
    }

}(jQuery));