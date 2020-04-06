Available Options
===================

Options can be set via data attributes or config object

If you want to set the values via data attributes you need to set the values via dash not camelcase for example data-no-percentage-sign not data-noPercentageSign

#### Set via data attributes ####

    // html tag
    <div id="circle"
         data-percent="90"
         data-no-percentage-sign="true"
         data-animation="false"
         data-stroke-linecap="round">
    </div>
    
    // javascript call
    circliful.newCircleWithDataSet('circle', 'simple');
    
#### Set via config object ####

    // html tag
    <div id="circle"></div>
    
    // javascript call
    circliful.newCircle({
        percent: 80,
        id: 'circle',
        type: 'simple',
        icon: 'f179',
        text: 'TP Wins',
        noPercentageSign: true,
        backgroundCircleWidth: 35,
        foregroundCircleWidth: 20,
        progressColors: [
            {percent: 1, color: 'red'},
            {percent: 30, color: 'orange'},
            {percent: 60, color: 'green'}
        ]
    });
    
#### Available options ####

| name        | default           | type  | description
| ------------- |------------- | ----- | ----- |
| id      | / | string | id of the html tag
| type      | "SimpleCircle" | string | circle type
| additionalCssClasses      | / | object | on each element circle, text etc a custom css for styling can be set
| point      | false | boolean | a point in within the circle 
| pointSize      | 60 | number | the point size in px
| percent      | 75 | number | the percentage of the circle
| animation      | true | boolean | if set to true, the circle percentage fill will be animated
| animationStep      | 1 | number | the animation speed
| strokeGradient      | / | [string, string] | will give the foreground circle a gradient
| icon      | / | string | font awesome icon definition for example 'f179', you need to integrate the font awesome library its not packed with circliful
| text      | / | string | will be shown below the percentage text
| textReplacesPercentage      | false | boolean | if set to true the text replaces the percentage
| noPercentageSign      | / | boolean | if set to true the % sign will be removed
| animateInView      | false | boolean | animates the circle as soon as its in the viewport
| strokeLinecap      | "butt" | string | the endings of the foreground circle, can be set to "butt" or "round"
| foregroundCircleWidth      | 5 | number | width of the foreground circle
| backgroundCircleWidth     | 15 | number | width of the background circle
| progressColors      | / | IProgressColor[] | the foreground circle changes the color if it comes above the given percentage colors for example [{percent: 50, color: "green"}]
| onAnimationEnd      | / | function | event that will be triggered when animation of circle finished

