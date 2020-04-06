import {Api} from "../api";
import {IAvailableOptions} from "../interface/iavailable-options";
import {CircleFactory} from "./circle-factory";
import Options from "./options";

class Circle {
    /**
     * @description Gets the size of the parent element, where the svg gets placed in
     * @param id
     * @returns {{width: number, maxSize: number, height: number}}
     */
    private static getParentSize(id: string) {
        const box = document.getElementById(id);
        const width = box.clientWidth > 0 ? box.clientWidth : 200;
        const height = box.clientHeight > 0 ? box.clientHeight : 200;

        return {
            maxSize: width > height ? height : width,
            height,
            width,
        };
    }

    /**
     * @description Initializes the circle by given type
     * @param options
     * @param checkDataAttributes
     */
    public static initializeCircleType(options: IAvailableOptions, checkDataAttributes = false) {
        const size = Circle.getParentSize(options.id);
        const circle = CircleFactory.create(options.type);
        const optionsManager = new Options();
        const mergedOptions = optionsManager.mergeOptions(options, checkDataAttributes);

        circle.initialize(mergedOptions, size);
        circle.drawCircle();

        return circle;
    }

    /**
     * @description Creates a new circle
     * @param options
     */
    public newCircle(options: IAvailableOptions): Api {
        Circle.initializeCircleType(options);

        return new Api(options);
    }

    /**
     * @description Creates a new circle with attributes set as data attributes on tag
     * @param parentId
     * @param type
     */
    public newCircleWithDataSet(parentId: string, type: string): Api {
        const options: IAvailableOptions = {
            id: parentId,
            type,
            percent: 1,
        };

        Circle.initializeCircleType(options, true);

        return new Api(options);
    }
}

export default Circle;
