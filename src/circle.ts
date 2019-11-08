"use strict";

import {IAvailableOptions} from "./interfaces/iavailable-options";
import Options from "./options";

class Circle {
    /**
     * @description Initializes a new circle
     * @param options
     */
    public static initCircle(options: IAvailableOptions) {
        Circle.getClassInstance(options).then((circle) => {
            circle.drawCircle();
            circle.append();
        });
    }

    /**
     * @description Get instance of circle type class
     * @param options
     * @returns {Promise<SimpleCircle.default | HalfCircle.default>}
     */
    public static getClassInstance(options: IAvailableOptions) {
        const fileName = Circle.camelCaseToDash(options.type);
        return import(/* webpackMode: "eager" */ `./circle-type/${fileName}`).then((CircleClass) => {
            const optionsManager = new Options();
            const mergedOptions = optionsManager.mergeOptions(options);
            const size = Circle.getParentSize(options.id);

            return new CircleClass.default(mergedOptions, size);
        });
    }

    /**
     * @description Transforms className ex SimpleCircle into simple-circle
     * @param className
     * @returns {string}
     */
    public static camelCaseToDash(className: string) {
        return className.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    }

    /**
     * @description Gets the size of the parent element, where the svg gets placed in
     * @param id
     * @returns {{width: number, maxSize: number, height: number}}
     */
    public static getParentSize(id: string) {
        const box = document.getElementById(id);
        const width = box.clientWidth;
        const height = box.clientHeight;

        return {
            maxSize: width > height ? height : width,
            height,
            width,
        };
    }
}

export default Circle;
