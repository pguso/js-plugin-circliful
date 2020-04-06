SVG style changes via CSS
===================

Change Position of Element

The first argument is the x (horizontal) coordinate and the second argument is the y (vertical) coordinate.

    transform: translate(0, 20px)

Hover Effect

    .circle-container:hover {
      .background-circle {
        fill: #ccc; //change background color
      }
    
      .foreground-circle {
        stroke: blueviolet; //change stroke color
        stroke-width: 8; // change stroke width
      }
    }

Change Circle Color
    
    .foreground-circle or .background-circle {
        stroke: blueviolet;
    }

Change background color of Point

    .point-circle {
        fill: #999;
    }
    
Change width of circle

    .foreground-circle or .background-circle {
        stroke-width: 50px;
    }
