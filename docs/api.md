API
===================

#### Update circle values elsewhere in your javascript code at any time

    // save the new instance into a variable
    const circle = circliful.newCircle({
        percent: 50,
        id: 'circle3',
        type: 'half',
    });

    // update multiple values at once
    circle.update([
        {type: 'percent', value: 30},
        {type: 'animation', value: false}
    ]);
    
    // or
    
    // update single value
    circle.update({type: 'percent', value: 30});
    
You can update the following values over the update function

- percent
- point
- animation
- pointSize
- animationStep
- strokeGradient
- strokeGradient
- icon
- text
- textReplacesPercentage
- foregroundCircleWidth
- backgroundCircleWidth
- additionalCssClasses
- progressColors

#### Get values of your circle 

You can get all available [Options](./options.md)

    circle.get('percent');
