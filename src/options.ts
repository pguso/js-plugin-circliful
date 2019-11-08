import {AvailableOptions} from './interfaces/available-options';

class Options {
    defaultOptions: AvailableOptions = {
        height: 100,
        width: 100,
        foregroundColor: "#3498DB",
        backgroundColor: "#ccc",
        pointColor: "none",
        fillColor: 'none',
        foregroundBorderWidth: 15,
        backgroundBorderWidth: 15,
        pointSize: 28.5,
        fontColor: '#aaa',
        percent: 75,
        animation: 1,
        animationStep: 5,
        icon: 'none',
        iconSize: 30,
        iconColor: '#ccc',
        iconPosition: 'top',
        iconDecoration: true,
        target: 0,
        showPercent: 1,
        percentageTextSize: 22,
        percentageX: 100,
        percentageY: 113,
        targetPercent: 0,
        targetTextSize: 17,
        targetColor: '#2980B9',
        textColor: '#666',
        percentages: [],
        multiPercentageLegend: 0,
        textBelow: false,
        noPercentageSign: false,
        halfCircle: false,
        animateInView: false,
        decimals: 0,
        alwaysDecimals: false,
        title: 'Circle Chart',
        strokeLinecap: 'butt',
        type: 'SimpleCircle',
        id: null,
        beforePercent: 0,
        textAdditionalCss: '',
        text: '',
        textStyle: '',
        replacePercentageByText: '',
        description: '',
        progressColor: '',
        update: null,
        onAnimationEnd: null,
    };

    /**
     * @description
     * @param options
     * @returns Options['defaultOptions']
     */
    mergeOptions = (options: AvailableOptions) => {
        return Object.assign(this.defaultOptions, options);
    }
}

export default Options;
