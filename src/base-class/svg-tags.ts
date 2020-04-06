import ObjectHelper from "../helper/object-helper";
import SvgTagsHelper from "../helper/svg-tags-helper";
import {IAttributes} from "../interface/iattributes";
import {IDictionary} from "../interface/idictionary";

class SvgTags {
    public static namespaceURI = "http://www.w3.org/2000/svg";

    /**
     * @description Adds a svg tag with attributes
     * @param attributes
     * @returns SVGElement
     */
    public static addSvg(attributes: IAttributes): Element {
        const svg = document.createElementNS(SvgTags.namespaceURI, "svg");
        attributes.class = "circle-container " + ObjectHelper.extractPropertyFromObject(
            attributes as IDictionary,
            "class",
        );

        SvgTagsHelper.setAttributes(svg as SVGElement, attributes);

        return svg;
    }

    /**
     * @description Adds a circle tag with attributes
     * @param attributes
     * @returns SVGCircleElement
     */
    public static addCircle(attributes: IAttributes): Element {
        const circle = document.createElementNS(SvgTags.namespaceURI, "circle");
        SvgTagsHelper.setAttributes(circle as SVGElement, attributes);

        return circle;
    }

    /**
     * @description Adds a path tag with attributes
     * @param attributes
     * @returns SVGPathElement
     */
    public static addArc(attributes: IAttributes): Element {
        const arc = document.createElementNS(SvgTags.namespaceURI, "path");
        SvgTagsHelper.setAttributes(arc as SVGElement, attributes);

        return arc;
    }

    /**
     * @description Adds a text tag with attributes
     * @param attributes
     * @returns SVGTextElement
     */
    public static addText(attributes: IAttributes): Element {
        const text = document.createElementNS(SvgTags.namespaceURI, "text");
        text.setAttributeNS(null, "text-anchor", "middle");
        SvgTagsHelper.setAttributes(text as SVGElement, attributes);

        return text;
    }

    /**
     * @description Adds defs tag to svg to draw a gradient
     * @param attributes
     */
    public static addDefs(attributes: IAttributes): Element {
        const defs = document.createElementNS(SvgTags.namespaceURI, "defs");
        const linearGradient = document.createElementNS(SvgTags.namespaceURI, "linearGradient");
        const linearGradientAttributes = {
            id: "linearGradient",
        };
        SvgTagsHelper.setAttributes(linearGradient as SVGElement, linearGradientAttributes);

        const firstStop = document.createElementNS(SvgTags.namespaceURI, "stop");
        const firstStopAttributes = {
            "offset": "0",
            "stop-color": attributes.gradientStart,
        };
        SvgTagsHelper.setAttributes(firstStop as SVGElement, firstStopAttributes);

        const secondStop = document.createElementNS(SvgTags.namespaceURI, "stop");
        const secondStopAttributes = {
            "offset": "1",
            "stop-color": attributes.gradientEnd,
        };
        SvgTagsHelper.setAttributes(secondStop as SVGElement, secondStopAttributes);

        linearGradient.appendChild(firstStop);
        linearGradient.appendChild(secondStop);
        defs.appendChild(linearGradient);

        return defs;
    }
}

export default SvgTags;
