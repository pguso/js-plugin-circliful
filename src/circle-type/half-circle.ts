import SvgTags from "../svg-tags";
import {BaseCircle} from "../interfaces/base-circle";
import SvgTagsHelper from "../svg-tags-helper";
import {AvailableOptions} from '../interfaces/available-options';
import {Size} from "../interfaces/size";
import {Tag} from "../interfaces/tag";

class HalfCircle implements BaseCircle {
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
        const startAngle = 270;
        const endAngle = 90;
        const strokeWidth = this.options.backgroundBorderWidth;
        const x = maxSize / 2;
        const y = maxSize / 2;
        const radius = maxSize / 2.2;

        const arc = SvgTags.addArc(this.options.id, {
            id: `arc-${this.options.id}`,
            fill: 'none',
            d: SvgTagsHelper.describeArc(x, y, radius, startAngle, endAngle),
            stroke: this.options.backgroundColor,
            'stroke-width': strokeWidth
        });

        this.tags.push({
            element: arc,
            parentId: `svg-${this.options.id}`
        });
    }

    drawForegroundCircle = () => {
        const endAngleGrade = 90;
        const maxSize = this.size.maxSize;
        const startAngle = 270;
        const endAngle = endAngleGrade / 100 * this.options.percent;
        const strokeWidth = this.options.foregroundBorderWidth;
        const x = maxSize / 2;
        const y = maxSize / 2;
        const radius = maxSize / 2.2;

        const arc = SvgTags.addArc(this.options.id, {
            id: `arc-${this.options.id}`,
            fill: 'green',
            d: SvgTagsHelper.describeArc(x, y, radius, startAngle, endAngle),
            stroke: this.options.foregroundColor,
            'stroke-width': strokeWidth
        });

        SvgTagsHelper.animateArc({
            arc,
            arcParams: {
                percent: this.options.percent,
                x,
                y,
                radius,
                startAngle,
                endAngleGrade
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
        text.textContent = `${this.options.percent}%...`;

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

export default HalfCircle;
