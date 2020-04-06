Available Options
===================

Create your own circle types 

#### Create new class with your logic in /circle-type folder

    // extend the abstact class and implement nessessary methods
     class CustomCircle extends BaseCircle {}
 
#### Add your new class to the circle factory 

    case "custom":
        circleClass = new CustomCircle();
        break;

#### Initialize your new circle 
    
    circliful.newCircle({
        percent: 50,
        id: 'circle',
        type: 'custom' // same as in the case above
    });
