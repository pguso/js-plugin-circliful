import SvgTags from "../svg-tags";
import {BaseCircle} from "../interfaces/base-circle";
import SvgTagsHelper from "../svg-tags-helper";
import {AvailableOptions} from '../interfaces/available-options';
import {Size} from "../interfaces/size";
import {Tag} from "../interfaces/tag";

class SimpleCircle implements BaseCircle {
    options: AvailableOptions;
    size: Size;
    tags: Tag[] = [];

    constructor(options: AvailableOptions, size: Size) {
        this.options = options;
        this.size = size;
    }

    drawCircle = () => {
        this.drawContainer();
        this.drawBackgroundCircle();
        this.drawForegroundCircle();
        this.drawText();
    }

    drawContainer = () => {
        const container = SvgTags.addSvg(this.options.id, {
            width: this.size.width,
            height: this.size.height,
            id: `svg-${this.options.id}`
        });

        this.tags.push({
            element: container,
            parentId: this.options.id
        });
    }

    drawBackgroundCircle = () => {
        const maxSize = this.size.maxSize;
        const cx = maxSize / 2;
        const cy = maxSize / 2;
        const radius = maxSize / 2.2;
        const circle = SvgTags.addCircle(this.options.id, {
            id: `circle-${this.options.id}`,
            cx: String(cx),
            cy: String(cy),
            r: String(radius),
            fill: this.options.fillColor,
            'stroke-width': this.options.backgroundBorderWidth,
            stroke: this.options.backgroundColor
        });

        this.tags.push({
            element: circle,
            parentId: `svg-${this.options.id}`
        });
    }

    drawForegroundCircle = () => {
        const maxSize = this.size.maxSize;
        const endAngle = 360 / 100 * this.options.percent;
        const strokeWidth = this.options.foregroundBorderWidth;
        const x = maxSize / 2;
        const y = maxSize / 2;
        const radius = maxSize / 2.2;

        const arc = SvgTags.addArc(this.options.id, {
            id: `arc-${this.options.id}`,
            fill: 'none',
            d: SvgTagsHelper.describeArc(x, y, radius, 0, endAngle),
            stroke: this.options.foregroundColor,
            'stroke-width': strokeWidth
        });

        SvgTagsHelper.animateArc({
            arc,
            arcParams: {
                percent: this.options.percent,
                x,
                y,
                radius
            }
        }, this.options.onAnimationEnd);

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`
        });
    }

    drawText = () => {
        const maxSize = this.size.maxSize;
        const x = maxSize / 2;
        const y = maxSize / 2;

        const text = SvgTags.addText(this.options.id, {
            id: `text-${this.options.id}`,
            x: String(x),
            y: String(y)
        });
        text.textContent = `${this.options.percent}%`;

        this.tags.push({
            element: text,
            parentId: `svg-${this.options.id}`
        });
    }

    append = () => {
        this.tags.forEach(tag => {
            const parent = document.getElementById(tag.parentId);
            parent.appendChild(tag.element as Node);
        });
    }
}

export default SimpleCircle;
