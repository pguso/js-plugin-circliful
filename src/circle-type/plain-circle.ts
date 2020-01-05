import {BaseCircle} from "../base-classes/base-circle";
import ObjectHelper from "../helpers/object-helper";
import SvgTagsHelper from "../helpers/svg-tags-helper";
import {IAvailableOptions} from "../interfaces/iavailable-options";
import {ISize} from "../interfaces/isize";
import SvgTags from "../svg-tags";

/**
 * Every circle gets dynamically called by the given type in the options object example: { type: 'PlainCircle' }
 */
class PlainCircle extends BaseCircle {
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
        this.drawContainer();
        this.drawPlainCircle();
        this.append();
    }

    /**
     * @description Draws the circle by given percentage with optional animation
     */
    public drawPlainCircle = () => {
        const endAngle = 360 / 100 * this.options.percent;
        const customCssClass = ObjectHelper.extractPropertyFromObject(
            this.additionalCssClasses,
            "foregroundCircle",
        );
        const arc = SvgTags.addArc({
            id: `arc-${this.options.id}`,
            class: `foreground-circle ${customCssClass}`,
            d: SvgTagsHelper.describeArc(this.coordinates.x, this.coordinates.y, this.radius, 0, endAngle),
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
            },
            animationStep: this.options.animationStep,
        }, this.options.onAnimationEnd);
    }
}

export default PlainCircle;
