"use strict";

(function ($) {

    $.fn.circliful = function (options, callback) {

        var settings = $.extend({
            // These are the defaults.
            //startDegree: 0,
            foregroundColor: "#3498DB",
            backgroundColor: "#ccc",
            fillColor: 'none',
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            fontColor: '#aaa',
            percent: 75,
            animation: 1,
            animationStep: 5,
            icon: 'none',
            iconSize: '30',
            iconColor: '#ccc',
            iconPosition: 'top',
            target: 0,
            start: 0,
            showPercent: 1,
            textSize: 22,
            textAdditionalCss: ''
        }, options);

        return this.each(function () {
            var circleContainer = $(this);
            var percent = settings.percent;
            var iconY = 83;
            var iconX = 100;
            var textY = 110;
            var textX = 100;
            var additionalCss;
            var elements;
            var icon;

            if(settings.iconPosition == 'bottom') {
                iconY = 124;
                textY = 95;
            } else if(settings.iconPosition == 'left') {
                iconX = 80;
                iconY = 110;
                textX = 117;
            } else if(settings.iconPosition == 'middle') {
                iconY = 110;
                elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="133" y1="50" x2="200" y2="50" stroke-width="2"  /></g>';
                textX = 175;
                textY = 44;
            } else if(settings.iconPosition == 'right') {
                iconX = 120;
                iconY = 110;
                textX = 80;
            }

            if (settings.icon != 'none') {
                icon = '<text text-anchor="middle" x="' + iconX + '" y="' + iconY + '" class="icon" style="font-size: ' + settings.iconSize + 'px" fill="' + settings.iconColor + '">&#x' + settings.icon + '</text>';
            }

            circleContainer
                .addClass('svg-container')
                .append(
                    $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 194 186" class="circliful">' +
                        elements +
                        '<circle cx="100" cy="100" r="57" class="border" fill="' + settings.fillColor + '" stroke="' + settings.backgroundColor + '" stroke-width="' + settings.backgroundBorderWidth + '" stroke-dasharray="360" transform="rotate(-90,100,100)" />' +
                        '<circle class="circle" cx="100" cy="100" r="57" class="border" fill="none" stroke="' + settings.foregroundColor + '" stroke-width="' + settings.foregroundBorderWidth + '" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" />' +
                        icon +
                        '<text class="timer" text-anchor="middle" x="' + textX + '" y="' + textY + '" style="font-size: ' + settings.textSize + 'px; ' + additionalCss + ';' + settings.textAdditionalCss + '" fill="' + settings.fontColor + '">0%</text>')
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

            if (settings.start > 0 && settings.target > 0) {
                percent = settings.start / (settings.target / 100);
                oneStep = settings.target / 100;
            }

            if (settings.animation == 1) {
                var timer = window.setInterval(function () {
                    if ((angle) >= (360 / 100 * percent)) {
                        window.clearInterval(timer);
                        last = 1;
                    } else {
                        angle += angleIncrement;
                        summary += oneStep;
                    }

                    if (angle / 3.6 >= percent && last == 1) {
                        angle = 3.6 * percent;
                    }

                    if (summary > settings.target && last == 1) {
                        summary = settings.target;
                    }

                    circle
                        .attr("stroke-dasharray", angle + ", 20000");

                    if (settings.showPercent == 1) {
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

                if (settings.showPercent == 1) {
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