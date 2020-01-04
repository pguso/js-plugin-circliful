import Circle from "./circle";
import {IAvailableOptions} from "./interfaces/iavailable-options";
import "./style/basic.scss";

/**
 * @description Gets called from html script tag
 * @param options
 * @returns void
 */
export function initCircle(options: IAvailableOptions) {
    return Circle.initCircle(options);
}
