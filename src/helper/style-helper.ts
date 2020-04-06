import {ICalculationParams} from "../interface/icalculation-params";
import {IProgressColor} from "../interface/iprogress-color";
import SvgTagsHelper from "./svg-tags-helper";

export class StyleHelper {
    /**
     * @description Redraws the arc (circle) border
     * @param params
     * @param callback
     */
    public static animateArc(
        params: {
            arc: Element,
            arcParams: ICalculationParams,
            animationStep: number,
            progressColors?: IProgressColor[],
        },
        callback: () => {},
    ): void {
        const {arc, arcParams, animationStep, progressColors} = params;
        const startAngle = arcParams.startAngle ? arcParams.startAngle : 0;
        const endAngleGrade = arcParams.endAngleGrade ? arcParams.endAngleGrade : 360;
        const ms = this.getMilliseconds(arcParams.ms, arcParams.endAngleGrade);
        const hasProgressColor = Array.isArray(progressColors) && progressColors.length > 0;

        let count = 1;
        const interval = setInterval((arc, percent, progressColors) => {
            const endAngle = endAngleGrade / 100 * count;
            SvgTagsHelper.setAttributes(arc, {
                d: SvgTagsHelper.describeArc(arcParams.x, arcParams.y, arcParams.radius, startAngle, endAngle),
            });

            if (hasProgressColor) {
                StyleHelper.updateCircleColor(count, arc, progressColors);
            }

            count += animationStep;

            if (count > percent) {
                clearInterval(interval);

                if (typeof callback === "function") {
                    callback();
                }
            }
        }, ms, arc, arcParams.percent, progressColors);
    }

    /**
     * @description If options.progressColors is set, colors are changed on given percentages
     * @param actualCount
     * @param arc
     * @param progressColors
     */
    public static updateCircleColor(actualCount: number, arc: Element, progressColors: IProgressColor[]) {
        const progressColor = progressColors.find((progress: IProgressColor) => progress.percent === actualCount);
        if (progressColor) {
            SvgTagsHelper.setAttributes(arc, {
                style: `stroke: ${progressColor.color}`,
            });
        }
    }

    /**
     * @param defaultMs
     * @param endAngleGrade
     */
    private static getMilliseconds(defaultMs: number, endAngleGrade: number) {
        let ms = defaultMs ? defaultMs : 50;

        if (endAngleGrade <= 180) {
            ms = ms / 3;
        }

        return ms;
    }
}
