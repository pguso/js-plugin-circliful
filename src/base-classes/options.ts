import {IAvailableOptions} from "../interfaces/iavailable-options";

class Options {
    /**
     * @description Default options if option is not set on initialisation
     */
    public defaultOptions: IAvailableOptions = {
        point: false,
        pointSize: 60,
        percent: 75,
        foregroundCircleWidth: 5,
        backgroundCircleWidth: 15,
        animation: true,
        animationStep: 1,
        noPercentageSign: false,
        animateInView: false,
        strokeLinecap: "butt",
        type: "SimpleCircle",
        textReplacesPercentage: false,
    };

    /**
     * @description Get data attributes from tag
     * @param options
     */
    private static getDataAttributes(options: IAvailableOptions): IAvailableOptions {
        const circleContainer = document.getElementById(options.id);
        const dataOptions: IAvailableOptions = {percent: options.percent};

        for (const key in circleContainer.dataset) {
            if (circleContainer.dataset.hasOwnProperty(key)) {
                const value = circleContainer.dataset[key];

                if (value === "false" || value === "true") {
                    dataOptions[key] = Boolean(value);
                } else if (Number(value)) {
                    dataOptions[key] = Number(value);
                } else {
                    dataOptions[key] = value;
                }
            }
        }

        return dataOptions;
    }

    /**
     * @description Transforms option ex no-percentage-sign into noPercentageSign
     * @param option
     * @returns {string}
     */
    public static dashToCamelCase(option: string) {
        return option.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
    }

    /**
     * @description Merge default options and custom option on initialisation
     * @param options
     * @returns Options['defaultOptions']
     */
    public mergeOptions(options: IAvailableOptions) {
        const dataOptions = Options.getDataAttributes(options);

        return {...this.defaultOptions, ...options, ...dataOptions};
    }
}

export default Options;
