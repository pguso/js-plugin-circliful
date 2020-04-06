import Options from "../../src/base-class/options";
import {IAvailableOptions} from "../../src/interface/iavailable-options";

describe("Options", () => {
    describe("mergeOptions()", () => {
        test("all values custom set", () => {
            const expected = {
                additionalCssClasses: {
                    backgroundCircle: "circle-background-circle",
                    foregroundCircle: "circle-foreground-circle",
                    icon: "circle-icon",
                    infoText: "circle-info-text",
                    point: "circle-point",
                    svgContainer: "circle-container",
                    text: "circle-text",
                },
                animateInView: true,
                animation: true,
                animationStep: 3,
                backgroundCircleWidth: 150,
                foregroundCircleWidth: 50,
                icon: "f0d0",
                id: "circle",
                noPercentageSign: true,
                percent: 60,
                point: true,
                pointSize: 30,
                progressColors: [{color: "#000", percent: 50}],
                strokeGradient: ["#05a", "#0a5"],
                strokeLinecap: "round",
                text: "Lorem",
                textReplacesPercentage: false,
                type: "simple",
            };

            const options: IAvailableOptions = {
                id: "circle",
                type: "simple",
                percent: 60,
                strokeGradient: ["#05a", "#0a5"],
                animationStep: 3,
                foregroundCircleWidth: 50,
                backgroundCircleWidth: 150,
                additionalCssClasses: {
                    svgContainer: "circle-container",
                    foregroundCircle: "circle-foreground-circle",
                    backgroundCircle: "circle-background-circle",
                    text: "circle-text",
                    icon: "circle-icon",
                    infoText: "circle-info-text",
                    point: "circle-point",
                },
                icon: "f0d0",
                text: "Lorem",
                noPercentageSign: true,
                strokeLinecap: "round",
                point: true,
                pointSize: 30,
                animation: true,
                textReplacesPercentage: false,
                animateInView: true,
                progressColors: [{percent: 50, color: "#000"}],
            };
            const optionInstance = new Options();
            const result = optionInstance.mergeOptions(options);

            expect(result).toEqual(expected);
        });

        test("check defaults", () => {
            const expected = {
                animateInView: false,
                animation: true,
                animationStep: 1,
                backgroundCircleWidth: 15,
                foregroundCircleWidth: 5,
                noPercentageSign: false,
                percent: 75,
                point: false,
                pointSize: 60,
                strokeLinecap: "butt",
                textReplacesPercentage: false,
                type: "SimpleCircle",

            };
            const optionInstance = new Options();
            const result = optionInstance.mergeOptions({percent: 75});

            expect(result).toEqual(expected);
        });
    });
});
