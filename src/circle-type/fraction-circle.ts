import {BaseCircle} from "../base-class/base-circle";
import SvgTags from "../base-class/svg-tags";
import SvgTagsHelper from "../helper/svg-tags-helper";
import {IAvailableOptions} from "../interface/iavailable-options";
import {ISize} from "../interface/isize";

/**
 * Every circle gets dynamically called by the given type in the options object example: { type: 'PlainCircle' }
 */
class FractionCircle extends BaseCircle {
    private coordinates = {
        x: 0,
        y: 0,
    };
    private fractionAngle: number;
    private rotateDegree: number;
    protected radius: number;
    protected additionalCssClasses: IAvailableOptions["additionalCssClasses"] = {};

    private static isOdd(count: number) {
        return count % 2;
    }

    /**
     * @inheritDoc
     */
    public initialize(options: IAvailableOptions, size: ISize) {
        super.initialize(options, size);

        const maxSize = this.size.maxSize;
        this.coordinates = {
            x: maxSize / 2,
            y: maxSize / 2,
        };
        this.radius = maxSize / 2.2;

        if (this.options.additionalCssClasses) {
            this.additionalCssClasses = this.options.additionalCssClasses;
        }

        this.animateInView();
    }

    /**
     * @inheritDoc
     */
    public drawCircle() {
        this.drawContainer();
        this.drawFraction();
        this.append();
    }

    /**
     * @description Draws the arc parts by given fraction count
     */
    public drawFraction() {
        this.fractionAngle = 360 / this.options.fractionCount;

        for (let i = 0; i < this.options.fractionCount; i++) {
            this.rotateDegree = this.fractionAngle * i;

            let fillColor = this.options.fillColor;
            if (this.options.fractionColors && this.options.fractionColors.length >= 2) {
                const color = this.options.fractionColors;
                fillColor = FractionCircle.isOdd(i) ? color[0] : color[1];
            }

            if (i >= this.options.fractionFilledCount) {
                fillColor = "none";
            }

            this.drawArc(fillColor);
        }

    }

    private drawArc(fillColor: string): void {
        const arc = SvgTags.addArc({
            "id": `arc-${this.options.id}`,
            "class": `fraction`,
            "d": SvgTagsHelper.describeArc(
                this.coordinates.x,
                this.coordinates.y,
                this.radius,
                0,
                this.fractionAngle,
            ) + this.getLineToCenter(),
            "stroke-width": this.options.foregroundCircleWidth,
            "fill": fillColor,
            "stroke": this.options.strokeColor,
            "transform": `rotate(${this.rotateDegree}, ${this.coordinates.x}, ${this.coordinates.y})`,
        });

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`,
        });
    }

    public getLineToCenter(): string {
        const pathEndCoordinates = SvgTagsHelper.calculatePathEndCoordinates(
            this.coordinates.x,
            this.coordinates.y,
            this.radius,
            this.fractionAngle,
        );

        return ` L ${this.coordinates.y} ${this.coordinates.x} M ${pathEndCoordinates.x} ${pathEndCoordinates.y} L ${this.coordinates.y} ${this.coordinates.x}`;
    }

    public animate(element: Element): void {
    }
}

export default FractionCircle;
