import Circle from "./base-class/circle";
import ObjectHelper from "./helper/object-helper";
import {IAvailableOptions} from "./interface/iavailable-options";
import {IType} from "./interface/itype";

export class Api {
    public readonly options: IAvailableOptions;

    constructor(options: IAvailableOptions) {
        this.options = options;
    }

    /**
     * @description Update options and rerender circle
     * @param parameter
     */
    public update(parameter: IType | IType[]) {
        const element = document.getElementById(`svg-${this.options.id}`);
        element.remove();

        if (Array.isArray(parameter)) {
            parameter.forEach((p) => this.updateType(p.type, p.value));
        } else {
            this.updateType(parameter.type, parameter.value);
        }

        Circle.initializeCircleType(this.options);
    }

    /**
     * @description Update options by given type
     * @param type
     * @param value
     */
    private updateType(type: string, value: IType["value"]): void {
        switch (type) {
            case "percent":
                this.options.percent = Number(value);
                break;
            case "point":
                this.options.point = Boolean(value);
                break;
            case "animation":
                this.options.animation = Boolean(value);
                break;
            case "pointSize":
                this.options.pointSize = Number(value);
                break;
            case "animationStep":
                this.options.animationStep = Number(value);
                break;
            case "strokeGradient":
                // tslint:disable-next-line
                this.options.strokeGradient = value as any;
                break;
            case "icon":
                this.options.icon = String(value);
                break;
            case "text":
                this.options.text = String(value);
                break;
            case "textReplacesPercentage":
                this.options.textReplacesPercentage = Boolean(value);
                break;
            case "foregroundCircleWidth":
                this.options.foregroundCircleWidth = Number(value);
                break;
            case "backgroundCircleWidth":
                this.options.backgroundCircleWidth = Number(value);
                break;
            case "additionalCssClasses":
                // tslint:disable-next-line
                this.options.additionalCssClasses = value as any;
                break;
            case "progressColors":
                // tslint:disable-next-line
                this.options.progressColors = value as any;
                break;
        }
    }

    /**
     * @description Get property from object
     * @param type
     */
    public get(type: string) {
        return ObjectHelper.extractPropertyFromObject(this.options, type);
    }
}
