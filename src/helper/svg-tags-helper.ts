import {IAttributes} from "../interface/iattributes";
import {ICalculationParams} from "../interface/icalculation-params";

class SvgTagsHelper {
    /**
     * @description
     * @param element SVGElement
     * @param attributes IAvailableOptions
     * @returns void
     */
    public static setAttributes(element: Element, attributes: IAttributes): void {
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
    }

    /**
     * @description
     * @param element
     * @param attributes
     * @returns void
     */
    public static setAttributeNamespace(element: Element, attributes: IAttributes): void {
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttributeNS(null, key, value);
        }
    }

    /**
     * @description For easier handling polar coordinates are used and converted to cartesian coordinates
     * @param centerX
     * @param centerY
     * @param radius
     * @param angleInDegrees
     * @returns object
     */
    public static polarToCartesian(
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number,
    ): ICalculationParams {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    }

    /**
     * @description Returns the string for the data attribute in the path tag
     * @param x
     * @param y
     * @param radius
     * @param startAngle
     * @param endAngle
     * @returns string
     */
    public static describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
        const start = SvgTagsHelper.polarToCartesian(x, y, radius, endAngle);
        const end = SvgTagsHelper.polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        ].join(" ");
    }
}

export default SvgTagsHelper;
