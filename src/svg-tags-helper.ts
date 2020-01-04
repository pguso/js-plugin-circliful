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
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians)),
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

    /**
     * @description Redraws the arc (circle) border
     * @param params
     * @param callback
     */
    public static animateArc(
        params: { arc: Element, arcParams: ICalculationParams, animationStep: number },
        callback: () => {},
    ): void {
        const {arc, arcParams, animationStep} = params;
        let count = 1;
        const startAngle = arcParams.startAngle ? arcParams.startAngle : 0;
        const endAngleGrade = arcParams.endAngleGrade ? arcParams.endAngleGrade : 360;
        const ms = this.getMilliseconds(arcParams.ms, arcParams.endAngleGrade);
        const interval = setInterval((arc, percent) => {
            const endAngle = endAngleGrade / 100 * count;
            SvgTagsHelper.setAttributes(arc, {
                d: SvgTagsHelper.describeArc(arcParams.x, arcParams.y, arcParams.radius, startAngle, endAngle),
            });

            if (animationStep > 1) {
                count += animationStep;
            } else {
                count++;
            }

            if (count > percent) {
                clearInterval(interval);
                // tslint:disable-next-line:no-unused-expression
                typeof callback === "function" ? Events.onAnimationEnd(callback) : "";
            }
        }, ms, arc, arcParams.percent);
    }

    private static getMilliseconds(defaultMs: number, endAngleGrade: number) {
        let ms = defaultMs ? defaultMs : 50;

        if (endAngleGrade <= 180) {
            ms = ms / 3;
        }

        return ms;
    }
}

export default SvgTagsHelper;
