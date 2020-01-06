import {IAvailableOptions} from "./interfaces/iavailable-options";

class Options {
    public defaultOptions: IAvailableOptions = {
        point: false,
        pointSize: 60,
        percent: 75,
        foregroundCircleWidth: 5,
        backgroundCircleWidth: 15,
        animation: 1,
        animationStep: 1,
        noPercentageSign: false,
        halfCircle: false,
        animateInView: false,
        title: "Circle Chart",
        strokeLinecap: "butt",
        type: "SimpleCircle",
        text: "",
        replacePercentageByText: "",
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
