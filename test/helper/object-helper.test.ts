import ObjectHelper from "../../src/helper/object-helper";

describe("ObjectHelper", () => {
    describe("extractPropertyFromObject()", () => {
        test("extract number", () => {
            const expected = 55;
            const object = {percent: expected};
            const result = ObjectHelper.extractPropertyFromObject(object, "percent");

            expect(result).toBe(expected);
        });

        test("extract string", () => {
            const expected = "simple";
            const object = {type: expected};
            const result = ObjectHelper.extractPropertyFromObject(object, "type");

            expect(result).toBe(expected);
        });

        test("extract boolean", () => {
            const expected = true;
            const object = {animation: expected};
            const result = ObjectHelper.extractPropertyFromObject(object, "animation");

            expect(result).toBe(expected);
        });

        test("extract object", () => {
            const expected = {
                svgContainer: "svg-container",
                backgroundCircle: "background-circle",
                foregroundCircle: "foreground-circle",
                text: "circle-percentage-text",
                icon: "circle-icon",
                point: "circle-point",
                infoText: "circle-info-text",
            };
            const object = {additionalCssClasses: expected};
            const result = ObjectHelper.extractPropertyFromObject(object, "additionalCssClasses");

            expect(result).toBe(expected);
        });

        test("extract array", () => {
            const expected = ["orange", "green"];
            const object = {strokeGradient: expected};
            const result = ObjectHelper.extractPropertyFromObject(object, "strokeGradient");

            expect(result).toBe(expected);
        });
    });
});
