import {IAttributes} from "./interfaces/iattributes";
import SvgTagsHelper from "./svg-tags-helper";

class SvgTags {
    public static namespaceURI = "http://www.w3.org/2000/svg";

    /**
     * @description Adds a svg tag with attributes
     * @param parentId
     * @param attributes
     * @returns SVGElement
     */
    public static addSvg(parentId: string, attributes: IAttributes): Element {
        const svg = document.createElementNS(SvgTags.namespaceURI, "svg");
        attributes = {
            ...attributes,
            class: "circle-container",
        };

        SvgTagsHelper.setAttributes(svg as SVGElement, attributes);

        return svg;
    }

    /**
     * @description Adds a circle tag with attributes
     * @param parentId
     * @param attributes
     * @returns SVGCircleElement
     */
    public static addCircle(parentId: string, attributes: IAttributes): Element {
        const circle = document.createElementNS(SvgTags.namespaceURI, "circle");
        SvgTagsHelper.setAttributes(circle as SVGElement, attributes);

        return circle;
    }

    /**
     * @description Adds a path tag with attributes
     * @param parentId
     * @param attributes
     * @returns SVGPathElement
     */
    public static addArc(parentId: string, attributes: IAttributes): Element {
        const arc = document.createElementNS(SvgTags.namespaceURI, "path");
        SvgTagsHelper.setAttributes(arc as SVGElement, attributes);

        return arc;
    }

    /**
     * @description Adds a text tag with attributes
     * @param parentId
     * @param attributes
     * @returns SVGTextElement
     */
    public static addText(parentId: string, attributes: IAttributes): Element {
        const text = document.createElementNS(SvgTags.namespaceURI, "text");
        text.setAttributeNS(null, "text-anchor", "middle");
        SvgTagsHelper.setAttributes(text as SVGElement, attributes);

        return text;
    }
}

export default SvgTags;
