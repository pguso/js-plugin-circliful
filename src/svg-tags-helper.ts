import Events from "./events";
import {IAttributes} from "./interfaces/iattributes";
import {ICalculationParams} from "./interfaces/icalculation-params";

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
     * @description
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
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians)),
        };
    }

    /**
     * @description
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

    /**
     * @description Redraws the arc (circle) border
     * @param params
     * @param callback
     */
    public static animateArc(params: {arc: Element, arcParams: ICalculationParams}, callback: () => {}): void {
        const {arc, arcParams} = params;
        let count = 1;
        const startAngle = arcParams.startAngle ? arcParams.startAngle : 0;
        const endAngleGrade = arcParams.endAngleGrade ? arcParams.endAngleGrade : 360;
        const interval = setInterval((arc, percent) => {
            const endAngle = endAngleGrade / 100 * count;
            SvgTagsHelper.setAttributes(arc, {
                d: SvgTagsHelper.describeArc(arcParams.x, arcParams.y, arcParams.radius, startAngle, endAngle),
            });
            // TODO: change text
            count++;

            if (count > percent) {
                clearInterval(interval);
                // tslint:disable-next-line:no-unused-expression
                typeof callback === "function" ? Events.onAnimationEnd(callback) : "";
            }
        }, 15, arc, arcParams.percent);
    }
}

export default SvgTagsHelper;
