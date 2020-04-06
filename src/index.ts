import "../styles/main.scss";
import Circle from "./base-classes/circle";
import {IAvailableOptions} from "./interfaces/iavailable-options";
/**
 * @description Gets called from html script tag
 * @param options
 * @returns void
 */
export function newCircle(options: IAvailableOptions) {
    const circle = new Circle();
    return circle.newCircle(options);
}
