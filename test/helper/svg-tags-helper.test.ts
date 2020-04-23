import SvgTagsHelper from "../../src/helper/svg-tags-helper";

describe("SvgTagHelper", () => {
        test("polarToCartesian()", () => {
            const expected = {
                x: 501.2010330031063,
                y: 729.1250632847796,
            };
            const result = SvgTagsHelper.polarToCartesian(391.5, 391.5, 355, 162);

            expect(result).toEqual(expected);
        });

        test("describeArc()", () => {
        const expected = "M 679.4291482980439 182.3072287091088 A 355.9 355.9 0 0 0 391.5 35.60000000000002 ";
        const result = SvgTagsHelper.describeArc(391.5, 391.5, 355.90, 0, 54);

        expect(result).toEqual(expected);
    });
});
