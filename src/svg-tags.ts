import SvgTagsHelper from "./svg-tags-helper";
import {Attributes} from './interfaces/attributes';

class SvgTags {
    static namespaceURI = 'http://www.w3.org/2000/svg';

    /**
     * @description
     * @param parentId
     * @param attributes
     * @returns SVGElement
     */
    static addSvg(parentId: string, attributes: Attributes): Element {
        const svg = document.createElementNS(SvgTags.namespaceURI, 'svg');

        SvgTagsHelper.setAttributes(svg as SVGElement, attributes);

        return svg;
    }

    /**
     * @description
     * @param parentId
     * @param attributes
     * @returns SVGCircleElement
     */
    static addCircle(parentId: string, attributes: Attributes): Element {
        const circle = document.createElementNS(SvgTags.namespaceURI, 'circle');
        SvgTagsHelper.setAttributes(circle as SVGElement, attributes);

        return circle;
    }

    /**
     * @description
     * @param parentId
     * @param attributes
     * @returns SVGPathElement
     */
    static addArc(parentId: string, attributes: Attributes): Element {
        const arc = document.createElementNS(SvgTags.namespaceURI, 'path');
        SvgTagsHelper.setAttributes(arc as SVGElement, attributes);

        return arc;
    }

    /**
     * @description
     * @param parentId
     * @param attributes
     * @returns SVGTextElement
     */
    static addText(parentId: string, attributes: Attributes): Element {
        const text = document.createElementNS(SvgTags.namespaceURI, 'text');
        text.setAttributeNS(null, 'text-anchor', 'middle');
        SvgTagsHelper.setAttributes(text as SVGElement, attributes);

        return text;
    }
}

export default SvgTags;
