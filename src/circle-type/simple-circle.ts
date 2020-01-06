import {BaseCircle} from "../base-classes/base-circle";
import {IAttributes} from "../interfaces/iattributes";
import {IAvailableOptions} from "../interfaces/iavailable-options";
import {ISize} from "../interfaces/isize";
import SvgTags from "../svg-tags";
import SvgTagsHelper from "../svg-tags-helper";

/**
 * Every circle gets dynamically called by the given type in the options object example: { type: 'SimpleCircle' }
 */
class SimpleCircle extends BaseCircle {
    private coordinates = {
        x: 0,
        y: 0,
    };
    private radius: number;

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
    }

    /**
     * @inheritDoc
     */
    public drawCircle = () => {
        this.drawContainer();

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
        const circle = SvgTags.addCircle({
            "id": `circle-${this.options.id}`,
            "class": "background-circle",
            "cx": String(this.coordinates.x),
            "cy": String(this.coordinates.y),
            "r": String(this.radius),
            "stroke-width": this.options.backgroundCircleWidth,
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

        const circle = SvgTags.addCircle({
            id: `point-${this.options.id}`,
            class: "point-circle",
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
        const attributes: IAttributes = {
            "id": `arc-${this.options.id}`,
            "class": "foreground-circle",
            "d": SvgTagsHelper.describeArc(this.coordinates.x, this.coordinates.y, this.radius, 0, endAngle),
            "stroke-width": this.options.foregroundCircleWidth,
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
        const text = SvgTags.addText({
            id: `text-${this.options.id}`,
            x: String(this.coordinates.x),
            y: String(this.coordinates.y),
            class: "circle-icon fa",
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
        const text = SvgTags.addText({
            id: `text-${this.options.id}`,
            x: String(this.coordinates.x),
            y: String(this.coordinates.y),
            class: "circle-text",
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
