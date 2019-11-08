import Events from "./events";
import {Attributes} from "./interfaces/attributes";
import {CalculationParams} from "./interfaces/calculation-params";

class SvgTagsHelper {
    /**
     * @description
     * @param element SVGElement
     * @param attributes AvailableOptions
     * @returns void
     */
    static setAttributes(element: Element, attributes: Attributes): void {
        for (let [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
    }

    /**
     * @description
     * @param element
     * @param attributes
     * @returns void
     */
    static setAttributeNamespace(element: Element, attributes: Attributes): void {
        for (let [key, value] of Object.entries(attributes)) {
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
    static polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): CalculationParams {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
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
    static describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
        const start = SvgTagsHelper.polarToCartesian(x, y, radius, endAngle);
        const end = SvgTagsHelper.polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    }

    /**
     * @description Redraws the arc (circle) border
     * @param params
     * @param callback
     */
    static animateArc(params: {arc: Element, arcParams: CalculationParams}, callback: () => {}): void {
        const {arc, arcParams} = params;
        let count = 1;
        const startAngle = arcParams.startAngle ? arcParams.startAngle : 0;
        const endAngleGrade = arcParams.endAngleGrade ? arcParams.endAngleGrade : 360;
        const interval = setInterval((arc, percent) => {
            const endAngle = endAngleGrade / 100 * count;
            SvgTagsHelper.setAttributes(arc, {
                d: SvgTagsHelper.describeArc(arcParams.x, arcParams.y, arcParams.radius, startAngle, endAngle),
            });
            //TODO: change text
            count++;

            if(count > percent) {
                clearInterval(interval);
                typeof callback === 'function' ? Events.onAnimationEnd(callback) : ''
            }
        }, 15, arc, arcParams.percent);
    }
}

export default SvgTagsHelper;
