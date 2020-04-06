import {BaseCircle} from "../base-class/base-circle";
import SvgTags from "../base-class/svg-tags";
import ObjectHelper from "../helper/object-helper";
import {StyleHelper} from "../helper/style-helper";
import SvgTagsHelper from "../helper/svg-tags-helper";
import {IAttributes} from "../interface/iattributes";
import {IAvailableOptions} from "../interface/iavailable-options";
import {ISize} from "../interface/isize";

/**
 * Every circle gets dynamically called by the given type in the options object
 * example: { type: 'SimpleCircle' }
 */
class SimpleCircle extends BaseCircle {
    protected coordinates = {
        x: 0,
        y: 0,
    };
    protected radius: number;
    protected additionalCssClasses: IAvailableOptions["additionalCssClasses"] = {};

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

        if (!this.options.textReplacesPercentage && this.options.text) {
            this.drawInfoText();
        }

        this.append();
    }

    /**
     * @description Draws background circle
     */
    public drawBackgroundCircle() {
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "backgroundCircle",
        );

        const circle = SvgTags.addCircle({
            "id": `circle-${this.options.id}`,
            "class": `background-circle ${customCssClass}`,
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
    public drawPoint() {
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
     * @description Draws foreground circle
     */
    public drawForegroundCircle() {
        const endAngle = 360 / 100 * this.options.percent;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "foregroundCircle",
        );
        const attributes: IAttributes = {
            "id": `arc-${this.options.id}`,
            "class": `foreground-circle ${customCssClass}`,
            "d": SvgTagsHelper.describeArc(this.coordinates.x, this.coordinates.y, this.radius, 0, endAngle),
            "stroke-width": this.options.foregroundCircleWidth,
            "stroke-linecap": this.options.strokeLinecap,
        };

        if (this.options.strokeGradient) {
            attributes.stroke = "url(#linearGradient)";
            attributes.class = `foreground-circle-without-stroke-color ${customCssClass}`;
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
     * @param updatedPercent
     */
    public animate(arc: Element, updatedPercent?: number) {
        StyleHelper.animateArc({
            arc,
            arcParams: {
                percent: updatedPercent ? updatedPercent : this.options.percent,
                x: this.coordinates.x,
                y: this.coordinates.y,
                radius: this.radius,
            },
            animationStep: this.options.animationStep,
            progressColors: this.options.progressColors,
        }, this.options.onAnimationEnd);
    }

    /**
     * @description Draws font awesome icon
     */
    public drawIcon() {
        const icon = this.options.icon;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "icon",
        );
        const text = SvgTags.addText({
            id: `text-${this.options.id}`,
            x: String(this.coordinates.x),
            y: String(this.coordinates.y - 25),
            class: `circle-icon fa ${customCssClass}`,
        });

        text.innerHTML = `&#x${icon};`;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Draws percentage
     */
    public drawText() {
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

        const percentageSign = this.options.noPercentageSign ? "" : "%";
        let content = `${this.options.percent}${percentageSign}`;
        if (this.options.textReplacesPercentage && this.options.text) {
            content = this.options.text;
        }
        text.textContent = content;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Draws info text below percentage
     */
    public drawInfoText() {
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "infoText",
        );
        const text = SvgTags.addText({
            id: `text-${this.options.id}`,
            x: String(this.coordinates.x),
            y: String(this.coordinates.y + 20),
            class: `circle-info-text ${customCssClass}`,
        });

        text.textContent = this.options.text;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }

    /**
     * @description Draws a linear gradient into the foreground stroke
     */
    private drawLinearGradient() {
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
