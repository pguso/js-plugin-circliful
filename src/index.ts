import "../style/main.scss";
import Circle from "./base-class/circle";
import {IAvailableOptions} from "./interface/iavailable-options";

/**
 * @description Gets called from html script tag
 * @param options
 * @returns void
 */
export function newCircle(options: IAvailableOptions) {
    const circle = new Circle();
    return circle.newCircle(options);
}

/**
 * @description Gets called from html script tag
 * @param parentId
 * @param type
 */
export function newCircleWithDataSet(parentId: string, type: string) {
    const circle = new Circle();
    return circle.newCircleWithDataSet(parentId, type);
}
