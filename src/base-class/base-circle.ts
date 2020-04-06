import {IAvailableOptions} from "../interface/iavailable-options";
import {ISize} from "../interface/isize";
import {ITag} from "../interface/itag";
import {IViewBoxAttributes} from "../interface/iview-box-attributes";
import SvgTags from "./svg-tags";

/**
 * Base for circle type implementations
 */
export abstract class BaseCircle {
    /**
     * @description Options object second argument for initCircle method
     */
    public options: IAvailableOptions;
    /**
     * @description Size of surrounding tag for svg tag
     */
    public size: ISize;
    /**
     * @description Array of all tags that needs to be appended to the dom
     */
    public tags: ITag[] = [];

    /**
     * @description Fires scroll event if animateInView is set to true and runs checkAnimation
     */
    protected animateInView(): void {
        if (this.options.animateInView) {
            window.addEventListener("scroll", () => {
                this.checkAnimation(this.options.id);
            });
        }
    }

    /**
     * @description When circle is in view port it animates the foreground circle
     */
    protected checkAnimation(svgParentId: string) {
        const circleContainer = document.getElementById(svgParentId);
        const foregroundCircle = document.getElementById(`arc-${svgParentId}`);
        const inView = this.isElementInViewport(circleContainer);

        if (!circleContainer.classList.contains("reanimated") && inView) {
            circleContainer.classList.add("reanimated");
            setTimeout(() => this.animate(foregroundCircle as Element), 250);
        }
    }

    /**
     * @description Calculates if the circle is in viewport
     * @param circleContainer
     */
    protected isElementInViewport(circleContainer: HTMLElement) {
        const offsetTop = circleContainer.offsetTop;
        const scrollPositionTop = window.scrollY;
        const windowHeight = window.innerHeight;

        return scrollPositionTop < offsetTop && scrollPositionTop + windowHeight > offsetTop;
    }

    /**
     * @description Gets called in the circle class to draw the circle with all its child elements, the methods
     * drawContainer and append must be always called in own implementations if you dont implement own logic for them
     */
    public abstract drawCircle(): void;

    /**
     * @description
     * @param element
     */
    protected abstract animate(element: Element): void;

    /**
     * @description Draws the svg tag
     * @param additionalAttributes
     */
    public drawContainer(additionalAttributes?: object) {
        const {minX, minY, width, height} = this.getViewBoxParams();

        const container = SvgTags.addSvg({
            width: "100%",
            height: "100%",
            viewBox: `${minX} ${minY} ${width} ${height}`,
            id: `svg-${this.options.id}`,
            preserveAspectRatio: "xMinYMin meet",
            ...additionalAttributes,
        });

        this.tags.push({
            element: container,
            parentId: this.options.id,
        });
    }

    /**
     * @description Get viewBox parameters, resize the view if the border would overflow
     */
    private getViewBoxParams(): IViewBoxAttributes {
        const {foregroundCircleWidth, backgroundCircleWidth} = this.options;
        let circleWidth = backgroundCircleWidth;
        // Get thicker circle stroke width, foreground or background
        if (foregroundCircleWidth > backgroundCircleWidth) {
            circleWidth = foregroundCircleWidth;
        }

        const minX = 0;
        const minY = 0;
        let width = this.size.width;
        let height = this.size.height;
        if (foregroundCircleWidth > 5 || backgroundCircleWidth > 5) {
            width = this.size.width + (1.5 * circleWidth);
            height = this.size.height + (1.5 * circleWidth);
        }

        return {minX, minY, width, height};
    }

    /**
     * @description Appends the tags to the dom
     */
    public append() {
        this.tags.forEach((tag) => {
            const parent = document.getElementById(tag.parentId);
            parent.appendChild(tag.element as Node);
        });
    }

    /**
     * @description Initialize basic values for circle
     * @param options
     * @param size
     */
    public initialize(options: IAvailableOptions, size: ISize): void {
        this.options = options;
        this.size = size;
    }
}
