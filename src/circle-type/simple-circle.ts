import {BaseCircle} from "../base-classes/base-circle";
import ObjectHelper from "../helpers/object-helper";
import SvgTagsHelper from "../helpers/svg-tags-helper";
import {IAttributes} from "../interfaces/iattributes";
import {IAvailableOptions} from "../interfaces/iavailable-options";
import {ISize} from "../interfaces/isize";
import SvgTags from "../svg-tags";

/**
 * Every circle gets dynamically called by the given type in the options object example: { type: 'SimpleCircle' }
 */
class SimpleCircle extends BaseCircle {
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

        if (this.options.strokeGradient) {
            this.drawLinearGradient();
        }

        this.drawBackgroundCircle();
        this.drawForegroundCircle();

        if (this.options.point) {
            this.drawPoint();
        }

        if (this.options.icon) {
            this.drawIcon();
        }

        this.drawText();
        this.append();
    }

    /**
     * @description
     */
    public drawBackgroundCircle = () => {
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "backgroundCircle",
        );

        const circle = SvgTags.addCircle({
            id: `circle-${this.options.id}`,
            class: `background-circle ${customCssClass}`,
            cx: String(this.coordinates.x),
            cy: String(this.coordinates.y),
            r: String(this.radius),
        });

        this.tags.push({
            element: circle,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Draws a point into the circle, behind the text
     */
    public drawPoint = () => {
        const pointSize = this.radius / 100 * this.options.pointSize;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "point",
        );
        const circle = SvgTags.addCircle({
            id: `point-${this.options.id}`,
            class: `point-circle ${customCssClass}`,
            cx: String(this.coordinates.x),
            cy: String(this.coordinates.y),
            r: String(pointSize),
        });

        this.tags.push({
            element: circle,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description
     */
    public drawForegroundCircle = () => {
        const endAngle = 360 / 100 * this.options.percent;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "foregroundCircle",
        );
        const attributes: IAttributes = {
            id: `arc-${this.options.id}`,
            class: `foreground-circle ${customCssClass}`,
            d: SvgTagsHelper.describeArc(this.coordinates.x, this.coordinates.y, this.radius, 0, endAngle),
        };

        if (this.options.strokeGradient) {
            attributes.stroke = "url(#linearGradient)";
            attributes.class = "foreground-circle-without-stroke-color";
        }

        const arc = SvgTags.addArc(attributes);

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
            },
            animationStep: this.options.animationStep,
        }, this.options.onAnimationEnd);
    }

    /**
     * @description
     */
    public drawIcon = () => {
        const icon = this.options.icon;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "icon",
        );
        const text = SvgTags.addText({
            id: `text-${this.options.id}`,
            x: String(this.coordinates.x),
            y: String(this.coordinates.y),
            class: `circle-icon fa ${customCssClass}`,
        });

        text.innerHTML = `&#x${icon};`;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description
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

        text.textContent = `${this.options.percent}%`;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Draws a linear gradient into the foreground stroke
     */
    private drawLinearGradient = () => {
        const attributes: IAttributes = {};

        attributes.gradientStart = this.options.strokeGradient[0];
        attributes.gradientEnd = this.options.strokeGradient[1];

        const defs = SvgTags.addDefs(attributes);
        this.tags.push({
            element: defs,
            parentId: `svg-${this.options.id}`,
        });
    }
}

export default SimpleCircle;
