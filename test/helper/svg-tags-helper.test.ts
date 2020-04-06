import SvgTagsHelper from "../../src/helper/svg-tags-helper";

describe("SvgTagHelper", () => {
        test("polarToCartesian()", () => {
            const expected = {
                x: 501.5,
                y: 729.5,
            };
            const result = SvgTagsHelper.polarToCartesian(391.5, 391.5, 355, 162);

            expect(result).toEqual(expected);
        });

        test("describeArc()", () => {
        const expected = "M 679.5 182.5 A 355.9 355.9 0 0 0 391.5 35.5";
        const result = SvgTagsHelper.describeArc(391.5, 391.5, 355.90, 0, 54);

        expect(result).toEqual(expected);
    });
});
