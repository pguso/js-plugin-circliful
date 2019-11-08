// TODO: define some events
// TODO: possibility to add own events?

import {EventEmitter} from "events";

class Events {
    /**
     * @description
     * @param callback
     * @returns void
     */
    public static onAnimationEnd(callback: () => {}) {
        const eventEmitter = new EventEmitter();
        eventEmitter.on("event", () => {
            callback();
        });
        eventEmitter.emit("event");
    }
}

export default Events;

/*import events from 'events';
const circleEvents = new events.EventEmitter();

circleEvents.on('start', (circle) => {
    console.log(circle);
    console.log('start');
});

circleEvents.on('loading', (circle) => {
    console.log(circle);
    console.log('loading');
});

circleEvents.on('animationInProgress', (circle) => {
    console.log(circle);
    console.log('animationInProgress');
});

circleEvents.on('end', (circle) => {
    console.log(circle);
    console.log('end');
});
*/
