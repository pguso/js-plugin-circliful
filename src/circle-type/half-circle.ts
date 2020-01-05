import {BaseCircle} from "../base-classes/base-circle";
import ObjectHelper from "../helpers/object-helper";
import SvgTagsHelper from "../helpers/svg-tags-helper";
import {IAvailableOptions} from "../interfaces/iavailable-options";
import {ISize} from "../interfaces/isize";
import SvgTags from "../svg-tags";

/**
 * Every circle gets dynamically called by the given type in the options object example: { type: 'HalfCircle' }
 */
class HalfCircle extends BaseCircle {
    private coordinates = {
        x: 0,
        y: 0,
    };
    private radius: number;
    private additionalCssClasses: IAvailableOptions["additionalCssClasses"] = {};

    /**
     * @inheritDoc
     */
    constructor(options: IAvailableOptions, size: ISize) {
        super(options, size);

        const maxSize = this.size.maxSize;
        this.coordinates = {
            x: maxSize / 2,
            y: maxSize / 2,
        };
        this.radius = maxSize / 2.2;

        if (this.options.additionalCssClasses) {
            this.additionalCssClasses = this.options.additionalCssClasses;
        }
    }

    /**
     * @inheritDoc
     */
    public drawCircle = () => {
        const additionalContainerAttributes = {
            class: ObjectHelper.extractPropertyFromObject(this.additionalCssClasses, "svgContainer"),
        };
        this.drawContainer(additionalContainerAttributes);
        this.drawBackgroundCircle();
        this.drawForegroundCircle();
        this.drawText();
        this.append();
    }

    /**
     * @description Draws the background cricle
     */
    public drawBackgroundCircle = () => {
        const startAngle = 270;
        const endAngle = 90;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "backgroundCircle",
        );
        const arc = SvgTags.addArc({
            id: `arc-${this.options.id}`,
            d: SvgTagsHelper.describeArc(this.coordinates.x, this.coordinates.y, this.radius, startAngle, endAngle),
            class: `background-circle ${customCssClass}`,
        });

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Draws the foreground circle by given percentage with optional animation
     */
    public drawForegroundCircle = () => {
        const endAngle = 180 / 100 * this.options.percent;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "foregroundCircle",
        );
        const arc = SvgTags.addArc({
            id: `arc-${this.options.id}`,
            class: `foreground-circle ${customCssClass}`,
            d: SvgTagsHelper.describeArc(this.coordinates.x, this.coordinates.y, this.radius, 0, endAngle),
            transform: `rotate(-90, ${this.coordinates.x}, ${this.coordinates.y})`,
        });

        if (this.options.animation) {
            this.animate(arc);
        }

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Animates circle counter clock wise
     * @param arc
     */
    private animate(arc: Element) {
        SvgTagsHelper.animateArc({
            arc,
            arcParams: {
                percent: this.options.percent,
                x: this.coordinates.x,
                y: this.coordinates.y,
                radius: this.radius,
                endAngleGrade: 180,
            },
            animationStep: this.options.animationStep,
        }, this.options.onAnimationEnd);
    }

    /**
     * @description Draws the text shown inside of the circle
     */
    public drawText = () => {
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "text",
        );
        const text = SvgTags.addText({
            id: `text-${this.options.id}`,
            x: String(this.coordinates.x),
            y: String(this.coordinates.y),
            class: `circle-text ${customCssClass}`,
        });
        text.textContent = `${this.options.percent}%...`;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }
}

export default HalfCircle;
