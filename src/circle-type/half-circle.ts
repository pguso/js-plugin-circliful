import {IAvailableOptions} from "../interfaces/iavailable-options";
import {IBaseCircle} from "../interfaces/ibase-circle";
import {ISize} from "../interfaces/isize";
import {ITag} from "../interfaces/itag";
import SvgTags from "../svg-tags";
import SvgTagsHelper from "../svg-tags-helper";

class HalfCircle implements IBaseCircle {
    public options: IAvailableOptions;
    public size: ISize;
    public tags: ITag[] = [];

    constructor(options: IAvailableOptions, size: ISize) {
        this.options = options;
        this.size = size;
    }

    public drawCircle = () => {
        this.drawContainer();
        this.drawBackgroundCircle();
        this.drawForegroundCircle();
        this.drawText();
    }

    public drawContainer = () => {
        const container = SvgTags.addSvg(this.options.id, {
            id: `svg-${this.options.id}`,
            viewBox: `0 0 ${this.size.width} ${this.size.height}`,
        });

        this.tags.push({
            element: container,
            parentId: this.options.id,
        });
    }

    public drawBackgroundCircle = () => {
        const maxSize = this.size.maxSize;
        const startAngle = 270;
        const endAngle = 90;
        const strokeWidth = this.options.backgroundBorderWidth;
        const x = maxSize / 2;
        const y = maxSize / 2;
        const radius = maxSize / 2.2;

        const arc = SvgTags.addArc(this.options.id, {
            "id": `arc-${this.options.id}`,
            "fill": "none",
            "d": SvgTagsHelper.describeArc(x, y, radius, startAngle, endAngle),
            "stroke": this.options.backgroundColor,
            "stroke-width": strokeWidth,
        });

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`,
        });
    }

    public drawForegroundCircle = () => {
        const maxSize = this.size.maxSize;
        const endAngle = 180 / 100 * this.options.percent;
        const strokeWidth = this.options.foregroundBorderWidth;
        const x = maxSize / 2;
        const y = maxSize / 2;
        const radius = maxSize / 2.2;

        const arc = SvgTags.addArc(this.options.id, {
            "id": `arc-${this.options.id}`,
            "fill": "none",
            "d": SvgTagsHelper.describeArc(x, y, radius, 0, endAngle),
            "stroke": this.options.foregroundColor,
            "stroke-width": strokeWidth,
            "transform": `rotate(-90, ${x}, ${y})`,
        });

        SvgTagsHelper.animateArc({
            arc,
            arcParams: {
                percent: this.options.percent,
                x,
                y,
                radius,
                endAngleGrade: 180
            },
        }, this.options.onAnimationEnd);

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`,
        });
    }

    public drawText = () => {
        const maxSize = this.size.maxSize;
        const x = maxSize / 2;
        const y = maxSize / 2;

        const text = SvgTags.addText(this.options.id, {
            id: `text-${this.options.id}`,
            x: String(x),
            y: String(y),
        });
        text.textContent = `${this.options.percent}%...`;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`,
        });
    }

    public append = () => {
        this.tags.forEach((tag) => {
            const parent = document.getElementById(tag.parentId);
            parent.appendChild(tag.element as Node);
        });
    }
}

export default HalfCircle;
