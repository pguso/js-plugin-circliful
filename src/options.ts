import {IAvailableOptions} from "./interfaces/iavailable-options";

class Options {
    public defaultOptions: IAvailableOptions = {
        point: false,
        pointSize: 60,
        percent: 75,
        animation: 1,
        animationStep: 1,
        icon: "",
        targetPercent: 0,
        targetTextSize: 17,
        targetColor: "#2980B9",
        noPercentageSign: false,
        halfCircle: false,
        animateInView: false,
        title: "Circle Chart",
        strokeLinecap: "butt",
        type: "SimpleCircle",
        text: "",
        replacePercentageByText: "",
        progressColor: "",
        update: null,
        onAnimationEnd: null,
    };

    /**
     * @description
     * @param options
     * @returns Options['defaultOptions']
     */
    public mergeOptions = (options: IAvailableOptions) => {
        return {...this.defaultOptions, ...options};
    }
}

export default Options;
