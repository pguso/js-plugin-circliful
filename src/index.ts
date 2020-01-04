import Circle from "./circle";
import {IAvailableOptions} from "./interfaces/iavailable-options";

/**
 * @description Gets called from html script tag
 * @param options
 * @returns void
 */
export function initCircle(options: IAvailableOptions) {
    return Circle.initCircle(options);
}
