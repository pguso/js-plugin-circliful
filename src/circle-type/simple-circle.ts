import {IAvailableOptions} from "../interfaces/iavailable-options";
import {IBaseCircle} from "../interfaces/ibase-circle";
import {ISize} from "../interfaces/isize";
import {ITag} from "../interfaces/itag";
import SvgTags from "../svg-tags";
import SvgTagsHelper from "../svg-tags-helper";

class SimpleCircle implements IBaseCircle {
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
            width: this.size.width,
            height: this.size.height,
            id: `svg-${this.options.id}`,
        });

        this.tags.push({
            element: container,
            parentId: this.options.id,
        });
    }

    public drawBackgroundCircle = () => {
        const maxSize = this.size.maxSize;
        const cx = maxSize / 2;
        const cy = maxSize / 2;
        const radius = maxSize / 2.2;
        const circle = SvgTags.addCircle(this.options.id, {
            "id": `circle-${this.options.id}`,
            "cx": String(cx),
            "cy": String(cy),
            "r": String(radius),
            "fill": this.options.fillColor,
            "stroke-width": this.options.backgroundBorderWidth,
            "stroke": this.options.backgroundColor,
        });

        this.tags.push({
            element: circle,
            parentId: `svg-${this.options.id}`,
        });
    }

    public drawForegroundCircle = () => {
        const maxSize = this.size.maxSize;
        const endAngle = 360 / 100 * this.options.percent;
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
        });

        SvgTagsHelper.animateArc({
            arc,
            arcParams: {
                percent: this.options.percent,
                x,
                y,
                radius,
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
        text.textContent = `${this.options.percent}%`;

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

export default SimpleCircle;
