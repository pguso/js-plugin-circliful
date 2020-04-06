import Circle from "./base-classes/circle";
import {IAvailableOptions} from "./interfaces/iavailable-options";
import {IType} from "./interfaces/itype";

export class Api {
    public readonly options: IAvailableOptions;

    constructor(options: IAvailableOptions) {
        this.options = options;
    }

    public update(parameter: IType | IType[]) {
        const element = document.getElementById(`svg-${this.options.id}`);

        if (Array.isArray(parameter)) {
            parameter.forEach((p) => this.updateType(p.type, p.value));
        } else {
            this.updateType(parameter.type, parameter.value);
        }

        element.innerHTML = "";
        Circle.initializeCircleType(this.options);
    }

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
                console.log("value", value);
                // tslint:disable-next-line
                this.options.progressColors = value as any;
                break;
        }
    }

    public get(type: string): void {
        if (this.options.hasOwnProperty(type)) {
            return this.options[type];
        }
    }
}
